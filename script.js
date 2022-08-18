let counter = 0;

const numbers = document.querySelectorAll('.num');
numbers.forEach(function (num) {
    num.addEventListener('click', (e) => insertNumber(e.target));
});

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', deleteDigit);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearCalculator);

const dotButton = document.querySelector('.dot');
dotButton.addEventListener('click', addDot);

const functionButtons = document.querySelectorAll('.operation');
functionButtons.forEach((button) => {
    button.addEventListener('click', (event) => dealWithOperations(event.target));
})

const equals = document.querySelector('.equal');
equals.addEventListener('click', () => clickedEqual());


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

function clickedEqual() {
    const result = document.querySelector('.result');
    const currComputing = document.querySelector('.current-computing');
    if (!currComputing.textContent.includes('=') && currComputing.textContent != '') {
        result.classList.add('clicked');
        result.classList.add('equ');
        currComputing.textContent += ` ${result.textContent} =`;
        const arr = currComputing.textContent.split(' ');
        result.textContent = operate(arr[0], arr[1], arr[2]);
        if (result.textContent == '') clearCalculator();
    }
}

function operate(num1, operator, num2) {
    if (operator == '÷' && num2 == 0) {
        alert('Cannot divide by zero');
        return '';
    } else {

        switch (operator) {
            case '+': return (+num1 * 10000 + +num2 * 10000) / 10000; break;
            case '-': return (+num1 * 10000 - +num2 * 10000) / 10000; break;
            case '×': return (+num1 * +num2); break;
            case '÷': return (+num1 / +num2); break;
        }
    }

}

window.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace' || e.key == 'Delete') deleteDigit();
    if (e.key == 'Escape') clearCalculator();
    if (e.key == '.') addDot();
    numbers.forEach((num) => {
        if (num.textContent == e.key) insertNumber(num);
    })
    functionButtons.forEach((operation) => {
        if (operation.textContent == e.key) dealWithOperations(operation);
        if (operation.textContent == '÷' && e.key == '/') dealWithOperations(operation);
        if (operation.textContent == '×' && e.key == '*') dealWithOperations(operation);
    })
    if (e.key == '=' || e.key == 'Enter') clickedEqual();
});

