const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.number) {
        appendNumber(button.dataset.number);
    } else if (button.dataset.operator) {
        setOperator(button.dataset.operator);
    } else if (button.dataset.equals) {
        evaluate();
    } else if (button.dataset.clear) {
        clear();
    } else if (button.dataset.decimal) {
        addDecimal();
    }
}));

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    if (display.textContent.length < 12) {
        display.textContent += number;
    }
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

function setOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === '/' && display.textContent === '0') {
        alert("Cannot divide by zero!");
        clear();
        return;
    }
    secondNumber = display.textContent;
    display.textContent = roundResult(operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)));
    currentOperator = null;
}

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

function addDecimal() {
    if (shouldResetDisplay) resetDisplay();
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? 'Error: Division by zero' : a / b;
}
