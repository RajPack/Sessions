export function printOnScreen(val) {
    var elem = document.createElement('div');
    elem.classList = 'printedVal';
    elem.innerText = val;
    document.querySelector('.print-area').append(elem);
}

export function clearScreen() {
    document.querySelector('.print-area').innerHTML = "";
}
window.clearScreen = clearScreen;




export const executionQueue = [];
export function executeWhenReady(fn) {
    executionQueue.push(fn);
}