let display;
let displayBox;
let modeIndicator;
let isRadian = false;
let isDegree = true;

var expression = '';

var prevAnswer = 0;
function setPrevAnswer(answer){
    prevAnswer = answer;
}

function getInputDisplay(){
    const input = document.getElementById('display');
    return input;
}

function getPrevAnswer(){
    if (expression === '' || expression === '0'){
        getInputDisplay().value = prevAnswer;
        expression = prevAnswer;
    }else{
        getInputDisplay().value += '*'+prevAnswer;
        expression += '*'+prevAnswer;
    }
}

function loadKeyboardEvent(){
    getInputDisplay().addEventListener('keydown', function(e){
        expression = getInputDisplay().value;
        if(e.key === 'Enter'){
            calculate();
        }
        if(e.ctrlKey){
            switch (e.key){
                case 'Backspace':
                    clearExpression();
                default:

            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadKeyboardEvent();
    loadHistory();
    plot('0');
    modeIndicator = document.getElementById('mode-indicator');

    getInputDisplay().addEventListener('input', function(e){
        expression = getInputDisplay().value;
        let temp = getInputDisplay().value;
        console.log(temp);
        
        const maps = {
            'fact': 'factorial(',
            'abs': 'Math.abs(',
            'sin': 'Math.sin(',
            'cos': 'Math.cos(',
            'tan': 'Math.tan(',
            'log': 'Math.log10(',
            'ln': 'Math.log(',
            'sq': 'Math.sqrt(',
            'pi': 'Math.PI',
            '%': '/100',
            'e': 'Math.E',
            '\\^': '**',
        };  

        for (const key in maps){
            const regex = new RegExp(`(?<!Math\\.)\\b${key}\\b`, 'gi');
            console.log(regex);
            temp = temp.replace(regex, maps[key]);
            console.log(temp);
        }

        getInputDisplay().value = temp;
        expression = temp;
    })
});

function toggleMode(elementId) {
    if (elementId === 'radBtn') {
        isRadian = true;
        isDegree = false;
        modeIndicator.textContent = 'RAD';
    } else {
        isDegree = true;
        isRadian = false;
        modeIndicator.textContent = 'DEG';
    }
}

function toRadians(degrees){
    return isDegree ? degrees * (Math.PI/180) : degrees;
}

function appendExpression(value){
    expression += value;
    getInputDisplay().value = expression;
}

function clearExpression(){
    if (getInputDisplay().value === ''){
        expression = '';
        history.length = 0;
        localStorage.removeItem('historyData');
        const toDeleted = document.querySelectorAll('div.history-list-item');
        toDeleted.forEach(elem =>{
            elem.remove();
        });
    }
    expression = '';
    getInputDisplay().value = '';
}

function backspaceExpression(){
    expression = expression.slice(0, -1);
    getInputDisplay().value = getInputDisplay().value.slice(0, -1);
}

function calculate(){
    expression = getInputDisplay().value;
    let expr = expression;

    if (isDegree && !expr.includes('x')) {
        expr = expr.replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(toRadians($1))");
        expr = expr.replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(toRadians($1))");
        expr = expr.replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(toRadians($1))");
    }

    if (expr.includes('x')){
        let temp = expr.replace(/\*\*/g, '^');
        temp = temp.replace(/Math\./g, '');
        try{
            plot(temp);
            console.log(temp);
        }catch{
            alert('Invalid function expression!');
            return;
        }
        appendHistory(expr);
    } else{
        try{
            // untuk mencegah floating point error
            const answer = parseFloat(eval(expr)).toFixed(12) * 1;
            if (Number.isNaN(answer)){
                alert('Invalid expression!');
                return;
            }
            const exprAndAns = expr+'='+answer;
            appendHistory(exprAndAns);
            
            setPrevAnswer(answer);
            expression = answer.toString();
            getInputDisplay().value = answer;
        }catch{
            alert('Invalid expression!');
            return;
        }
    }
}

function factorial(value){
    let answer = 1;
    for (i = value; i >= 1; i--){
        answer *= i;
    }
    return answer; 
}
