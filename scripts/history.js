const history = [];

function appendHistory(expression){
    history.push(expression);
    if (history.length > 5) history.shift();

    updateHistory();
}

function updateHistory(){
    const list = document.getElementById('history-list');
    list.innerHTML = "";

    history.forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('title', 'Copy to input box');
        div.textContent = item;
        div.classList.add('history-list-item');

        div.addEventListener('click', () => {
            expression = item.replaceAll(' ', '').split("=")[0];
            getInputDisplay().value = expression;
        });

        list.appendChild(div);
    });

    const arrString = JSON.stringify(history);
    if (localStorage.getItem('historyData') === null){
        localStorage.setItem('historyData', '[]');
    }

    localStorage.setItem('historyData', arrString);
}

function loadHistory(){
    if (localStorage.getItem('historyData') === null){
        localStorage.setItem('historyData', '[]');
    }
    const parsed = JSON.parse(localStorage.getItem('historyData'));
    history.length = 0;

    parsed.forEach(item =>{
        history.push(item);
        updateHistory();
    });
}