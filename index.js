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

document.addEventListener('DOMContentLoaded', function() {
    modeIndicator = document.getElementById('mode-indicator');

    const input = getInputDisplay();
    input.addEventListener('input', function(e){
        expression = input.value;
    })
    input.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            calculate();
        }
    })

    const radBtn = document.getElementById('radBtn');
    const degBtn = document.getElementById('degBtn');

    if (radBtn) radBtn.addEventListener('click', () => toggleMode('radBtn'));
    if (degBtn) degBtn.addEventListener('click', () => toggleMode('degBtn'));
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
    expression = '';
    getInputDisplay().value = '';
}

function backspaceExpression(){
    expression = expression.slice(0, -1);
    getInputDisplay().value = getInputDisplay().value.slice(0, -1);
}

function calculate(){
    let expr = expression;
     if (isDegree) {
        expr = expr.replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(toRadians($1))");
        expr = expr.replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(toRadians($1))");
        expr = expr.replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(toRadians($1))");
    }
    // untuk mencegah floating point error
    const answer = parseFloat(eval(expr)).toFixed(12) * 1;
    const exprAndAns = expr+'='+answer;
    appendHistory(exprAndAns);
    
    setPrevAnswer(answer);
    expression = answer;
    getInputDisplay().value = answer;
}

function factorial(value){
    let answer = 1;
    for (i = value; i >= 1; i--){
        answer *= i;
    }
    return answer; 
}