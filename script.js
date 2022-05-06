const screen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e)=> {
    const button = e.target;
    const buttonData = button.dataset;
    if (buttonData.operator) {
        calculator.writeOperator(buttonData.operator);
    } else if (buttonData.equals) {
        calculator.calculate();
    } else if (buttonData.clear) {
        calculator.clearAll();
    } else if (buttonData.number) {
        calculator.writeNumber(buttonData.number);
    }
});

const calculator = {
    number1: "",
    number2: "",
    operator: undefined,
    result: "",
   
    writeNumber(button) {
        screen.textContent += button; 
        this.number = button;
    },

    writeOperator(operator) {
        if (screen.textContent === "") return; 

        if (this.hasOperator) {
            this.calculate();

            if (this.hasOperator) {
                this.operator = operator;

                let slice = screen.textContent.slice(0, -1);
                screen.textContent= (slice += operator);
                
                return this.number1, this.operator;
            }
        }

        this.operator = operator;
        screen.textContent += operator

        return this.operator
    },   

    set number(number) {
        if (this.hasOperator) return this.number2 += number;
        else return this.number1 += number;       
    },

    get hasOperator() {
        if (screen.textContent.indexOf("+") !== -1) return true;
        else if (screen.textContent.indexOf("-") !== -1) return true;
        else if (screen.textContent.indexOf("x") !== -1) return true;
        else return false;
    },

    clearAll() {
        screen.textContent = "";
        this.number1 = "";
        this.number2 = "";
        this.operator = "";
    },

    calculate() {
        // console.log( `number1: ${this.number1}`)
        // console.log( `number2: ${this.number2}`)
        // console.log( `operator: ${this.operator}`)

        if (this.number1 === "" || this.number2 === "") return;
        
        this.number1 = parseInt(this.number1);
        this.number2 = parseInt(this.number2);

        switch (this.operator) {
            case "+":
                this.result = this.number1 + this.number2;
                break;
            case "-":
                this.result = this.number1 - this.number2;
                break;
            case "x":
                this.result = this.number1 * this.number2;
                break;
                
            default:
                break;
        }
        screen.textContent = this.result;
        this.number1 = this.result;
        this.number2 = "";
        this.operator = "";
    },
};