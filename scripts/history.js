const history = [];

function appendHistory(expression){
    history.push(expression);
    if (history.length > 7) history.shift();
    console.log(history.length);
    console.log(history[0]);
    console.log(history[1]);
    console.log(history[2]);
    console.log(history[3]);
    console.log(history[4]);
    console.log(history[5]);

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
            expression = item.split("=")[0];
            getInputDisplay().value = expression;
        });

        list.appendChild(div);
    });
}