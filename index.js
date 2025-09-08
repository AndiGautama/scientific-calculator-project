let display = document.getElementById('display');
let displayBox = document.getElementById('display-box');

let isRadian = false;
let isDegree = true;

function toggleRadian(){
    isRadian = true;
    isDegree = false;
}

function toggleDegree(){
    isRadian = false;
    isDegree = true;
}
