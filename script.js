const currentScreen = document.querySelector(".screen");
const previousScreen = document.querySelector(".previous");
const buttons = document.querySelector(".buttons");
const screenMode = document.querySelector(".screen__switch");

screenMode.addEventListener("click", ()=> {
    document.body.classList.toggle("active");
})

buttons.addEventListener("click", (e)=> {
    const button = e.target;
    const buttonData = button.dataset;
    if (buttonData.number) {
        calculator.appendNumber(buttonData.number);
        calculator.updateScreen();
    } else if (buttonData.operator) {
        calculator.chooseOperator(buttonData.operator);
        calculator.updateScreen();
    } else if (buttonData.equals) {
        calculator.calculate();
        calculator.updateScreen();
    } else if (buttonData.clearall) {
        calculator.clearAll();
        calculator.updateScreen();
    } else if (buttonData.clear) {
        calculator.clear();
        calculator.updateScreen();
    } else if (buttonData.switch) {
        calculator.switch();
        calculator.updateScreen();
    };
});

const calculator = {
    currentNumber: "",
    previousNumber: "",
    result: "",
    operator: undefined,
   
    appendNumber(button) {
        if (button === "." && this.currentNumber.toString().includes(".")) return;
        this.currentNumber += button;        
    },
    
    chooseOperator(operator) {
        if (this.currentNumber === "" && this.previousNumber === "") return;
        if (this.currentNumber === "" && this.previousNumber !== "") return this.operator = operator;
        if (this.operator !== undefined) this.calculate();

        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = "";
    },   

    getDisplayNumber(number) {
        let numberString = number.toString();
        if (numberString.indexOf(".") === -1) return numberString.replace(/(\d)(?=(\d{3})+\b)/g,'$1,');
       
        const integerDigits = numberString.split(".")[0];
        const decimalDigits = numberString.split(".")[1];
        let integerDisplay
        integerDisplay = integerDigits.replace(/(\d)(?=(\d{3})+\b)/g,'$1,');
        if (decimalDigits !== null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    },

    updateScreen() {
        currentScreen.textContent = this.getDisplayNumber(this.currentNumber);

        if (this.operator !== undefined) {
            previousScreen.textContent = `${this.getDisplayNumber(this.previousNumber)}${this.operator}`;
        } else previousScreen.textContent = "";

        (this.currentNumber.toString().length > 11)
        ? currentScreen.style.fontSize = "3rem"
        : currentScreen.style.fontSize = "3.5rem";
    },

    clearAll() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operator = undefined;
    },

    clear() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);  
    },

    switch() {
        this.currentNumber = this.currentNumber * -1;
    },

    calculate() {
        if (this.currentNumber === "" || this.previousNumber === "") return;

        this.currentNumber = parseFloat(this.currentNumber);
        this.previousNumber = parseFloat(this.previousNumber);

        switch (this.operator) {
            case "+":
                this.result = this.previousNumber + this.currentNumber;
                break;
            case "-":
                this.result = this.previousNumber - this.currentNumber;
                break;
            case "x":
                this.result = this.previousNumber * this.currentNumber;
                break;
            case "÷":
                this.result = this.previousNumber / this.currentNumber;
                break;
            default:
                break;
        };
       
        let resultString = this.result.toString();
        if (resultString.indexOf(".") !== -1) {
            let decimalPoint = resultString.indexOf(".");
            let decimals = resultString.slice(decimalPoint);
            if (decimals.length > 10) {
                let decimalsNumber = Number(decimals);
                let decimalsRoundedString = decimalsNumber.toFixed(9);
                let decimalsRounded = Number(decimalsRoundedString); 
                
                this.result = parseInt(this.result) + decimalsRounded;
            };
        };
                
        this.currentNumber = this.result;
        this.previousNumber = "";
        this.operator = undefined;
    },

    renderNumber() {
        if (this.currentNumber.toString().length > 12 ) {
            currentScreen.style.fontSize = "3.5rem";
        }
    },
};