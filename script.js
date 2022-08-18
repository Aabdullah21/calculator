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