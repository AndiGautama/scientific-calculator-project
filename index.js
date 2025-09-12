let display;
let displayBox;
let modeIndicator;
let isRadian = false;
let isDegree = true;

document.addEventListener('DOMContentLoaded', function() {
    display = document.getElementById('display');
    displayBox = document.getElementById('display-box');

    modeIndicator = document.getElementById('mode-indicator');

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
