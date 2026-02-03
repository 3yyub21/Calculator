class Calculator {
    constructor() {
        this.display = document.querySelector('.input');
        this.numberButtons = document.querySelectorAll('.btn-number');
        this.functionButtons = document.querySelectorAll('.btn-function');
        this.operatorButtons = document.querySelectorAll('.btn-operator'); 
        this.equalsButton = document.querySelector('#btn-equals');

        this.previousOperand = '';
        this.operation = undefined;
        this.init();
    }

    init() {
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.textContent);
            });
        });

        this.functionButtons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.textContent === "AC"){
                    this.clear();
                }

                else if(button.textContent === "+/-"){
                    this.changeSign();
                }

                else if(button.textContent === "%"){
                    this.percent();
                }
            });
        });

        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent === '=') return; 
                this.chooseOperation(button.textContent);
            });
        });

        if (this.equalsButton) {
            this.equalsButton.addEventListener('click', () => {
                this.compute();
            });
        }
    }

    appendNumber(number) {
        if (this.display.value === '0' && number !== ',') {
            this.display.value = number;
        } else {
            this.display.value += number;
        }
    }

    changeSign() {
        let fullText = this.display.value;
        let partBeforeNumber = "";
        let currentNumberText = "";
        
        if (this.operation) {
            const opIndex = fullText.lastIndexOf(this.operation);
            partBeforeNumber = fullText.slice(0, opIndex + 1);
            currentNumberText = fullText.slice(opIndex + 1);
        } 
        else {
            partBeforeNumber = "";
            currentNumberText = fullText;
        }

        if (currentNumberText === "" || currentNumberText === "0") return;

        if (currentNumberText.startsWith("(-") && currentNumberText.endsWith(")")) {
            currentNumberText = currentNumberText.slice(2, -1);
        } else {
            currentNumberText = `(-${currentNumberText})`;
        }

        this.display.value = partBeforeNumber + currentNumberText;
    }

    percent() {
        const current = parseFloat(this.display.value);
        
        if (isNaN(current)) return;

        if (this.previousOperand !== '') {
            const prev = parseFloat(this.previousOperand);
            const result = (prev * current) / 100;
            this.display.value = result;
        } 
        
        else {
            this.display.value = current / 100;
        }
    }

    chooseOperation(operation) {
        if (this.display.value === '') return;
        
        if (this.operation !== undefined) {
             this.compute(); 
        }

        this.previousOperand = this.display.value; 
        this.operation = operation;          
        this.display.value += operation; 
    }

    compute() {
        let computation;
        let cleanPrev = this.previousOperand.replace('(-', '-').replace(')', '');
        const prev = parseFloat(cleanPrev);

        let currentTextRaw;
        if (this.operation) {
             const opIndex = this.display.value.lastIndexOf(this.operation);
             currentTextRaw = this.display.value.slice(opIndex + 1);
        } else {
             currentTextRaw = this.display.value;
        }

        let cleanCurrent = currentTextRaw.replace('(-', '-').replace(')', '');
        const current = parseFloat(cleanCurrent);

        if (isNaN(prev) || isNaN(current)) return;
        
        if (this.operation === '+') {
            computation = prev + current;
        } else if (this.operation === '-') {
            computation = prev - current;
        } else if (this.operation === '×') {
            computation = prev * current;
        } else if (this.operation === '÷') {
            computation = prev / current;
        }

        this.display.value = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    clear() {
        this.display.value = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }
}

const calculator = new Calculator();