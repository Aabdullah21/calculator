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