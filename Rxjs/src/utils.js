export function printOnScreen(val) {
    var elem = document.createElement('div');
    elem.classList = 'printedVal';
    elem.innerText = val;
    document.querySelector('.print-area').append(elem);
}

export function clearScreen(e) {
    e.stopPropagation();
    document.querySelector('.print-area').innerHTML = "";
}
window.clearScreen = clearScreen;




export const executionQueue = [];
export function executeWhenReady(fn) {
    if(!fn) {
        return;
    }
    executionQueue.push(fn);
}
