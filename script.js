let operand1 = "";
let operand2 = "";
let operator = "";

let display = document.querySelector(".display");
let keyboard = document.addEventListener("keydown", keyPresses, false)

function keyPresses(event) {
    let key = event.key;

    let allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    if (allowedKeys.includes(key)) {
        updateOperand(key);
    } else if (key == "Backspace") {
        backspace();
    } else if (key == ".") {
        addDecimalPoint();
    } else if (key == "Enter" || key == "=") {
        equal();
    } else if (key == "+") {
        saveOperation("add");
    } else if (key == "-") {
        saveOperation("subtract");
    } else if (key == "/") {
        saveOperation("divide");
    } else if (key == "x" || key == "*") {
        saveOperation("multiply")
    }
}

function updateOperand(number) {
    if (operand1.length <= 17) {
        operand1 += number.toString();
        updateDisplay(operand1)
    }
}

function updateDisplay (number) {
    clearDisplay()
    let div = document.createElement("div");
    div.id = "displayNumber";
    div.textContent = number;
    display.appendChild(div);
}

function addDecimalPoint () {
    if (operand1.includes(".") == false) {
        updateOperand(".");
    }
}

function togglePosNeg () {
    if (operand1.includes("-")) {
        operand1 = operand1.replace("-", "");
    } else if (operand1) {
        operand1 = "-" + operand1;
    } 

    updateDisplay(operand1);
}

function saveOperation (operation) {
    if (operator) {
        operate();
        operator = operation;
    } else {
        operator = operation;
        saveOperandToMemory(operand1);
    }
}

function saveOperandToMemory(operand) {
    operand2 = operand;
    operand1 = "";
}

function operate() {
    if (operator == "add") {
        updateDisplay(add(operand1, operand2));
    } else if (operator == "subtract") {
        updateDisplay(subtract(operand1, operand2))
    } else if (operator == "multiply") {
        updateDisplay(multiply(operand1, operand2));
    } else {
        updateDisplay(divide(operand1, operand2));
    }
}

function equal() {
    operate();
    clearMemory();
}

function allClear () {
    clearMemory();
    clearDisplay();
}

function clearMemory () {
    operator = "";
    operand1 = "";
    operand2 = "";
}

function clearDisplay() {
    let clear = document.getElementById("displayNumber");

    if (clear) {    
        clear.remove();
    }
}

function backspace() {
    operand1 = operand1.slice(0, -1);
    updateDisplay(operand1);
}

function add(num1, num2) {
    saveOperandToMemory("" + (Number(num1) + Number(num2)));
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    saveOperandToMemory(num2 - num1)
    return num2 - num1;
}

function multiply(num1, num2) {
    saveOperandToMemory(num1 * num2);
    return num1 * num2;
}

function divide(num1, num2) {
    saveOperandToMemory(num2 / num1);

    if (num1 == 0) {
        return "Error: Divided by 0"
    }
    return num2 / num1;
}