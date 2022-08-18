function insertNumber(numberButton) {

    const result = document.querySelector('.result');
    if (counter < 17) {
        if (result.getAttribute('class').includes('equ')) {
            clearCalculator();
            result.classList.remove('equ');
        }
        if (result.textContent === '0') result.textContent = '';
        if (result.getAttribute('class').includes('clicked')) {
            counter++;
            result.textContent = numberButton.textContent;
            result.classList.remove('clicked');
        } else {
            counter++;
            result.textContent += numberButton.textContent;
        }
    }
}

function deleteDigit() {

    const result = document.querySelector('.result');
    if (result.getAttribute('class').includes('equ')) {
        const currComputing = document.querySelector('.current-computing');
        currComputing.textContent = '';
        result.classList.remove('equ');
    } else {
        result.textContent = result.textContent.slice(0, -1);
        if (result.textContent == '') result.textContent = 0;
    }
}

function clearCalculator() {
    const result = document.querySelector('.result');
    const currComputing = document.querySelector('.current-computing');
    result.classList.remove('clicked');
    result.classList.remove('equ');
    result.textContent = 0;
    currComputing.textContent = '';
}

function addDot() {
    const result = document.querySelector('.result');
    if (result.getAttribute('class').includes('equ')) clearCalculator();
    if (!result.textContent.includes('.')) result.textContent += '.';
}

function dealWithOperations(operationButton) {
    const currComputing = document.querySelector('.current-computing');
    const result = document.querySelector('.result');
    if (currComputing.textContent != '' && result.getAttribute('class').includes('clicked') == false) {
        const toBeCalculated = `${currComputing.textContent} ${result.textContent}`.split(' ');
        result.textContent = operate(toBeCalculated[0], toBeCalculated[1], toBeCalculated[2]);

    }
    counter = 0;
    result.classList.add('clicked');
    result.classList.remove('equ');
    currComputing.textContent = `${result.textContent} ${operationButton.textContent}`;
    if (result.textContent == '') clearCalculator();
}