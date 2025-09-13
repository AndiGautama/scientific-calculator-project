let history = [];
history.length = 5; // batasi jadi 5 

function appendHistory(expression){
    let totalElements = 0;
    for (i in history){
        totalElements++;
    }
    if (totalElements < history.length) history.push(expression);
    else if (totalElements === history.length){
        history.shift();
        history.push(expression);
    }
}