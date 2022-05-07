const screen = document.querySelector(".screen");
const previous = document.querySelector(".previous");
const buttons = document.querySelector(".buttons");
const screenMode = document.querySelector(".screen__mode");
const btn = document.querySelectorAll(".btn");
const screenContainer = document.querySelector(".main__container")

screenMode.addEventListener("click", ()=> {
    buttons.classList.toggle("buttons--lm");
    btn.forEach(button => {
        button.classList.toggle("btn--lm");
    });
    screenContainer.classList.toggle("screen__container--lm");
})

buttons.addEventListener("click", (e)=> {
    const button = e.target;
    const buttonData = button.dataset;
    if (buttonData.number) {
        calculator.writeNumber(buttonData.number);
    } else if (buttonData.operator) {
        calculator.writeOperator(buttonData.operator);
    } else if (buttonData.equals) {
        calculator.calculate();
    } else if (buttonData.clearall) {
        calculator.clearAll();
    } else if (buttonData.clear) {
        calculator.clear();
    }
});

const calculator = {
    number1: "",
    number2: "",
    operator: undefined,
    result: "",
   
    writeNumber(button) {
        if (button === ".") {
            if (screen.textContent.indexOf(".") !== -1) return
        };
        
        this.number = button;
        screen.textContent += button; 
    },

    writeOperator(operator) {
        
        if (screen.textContent === "" && previous.textContent === "") return; 
        
        if (this.operator !== undefined) {
            this.calculate();
            if (this.operator !== undefined) {
                this.operator = operator;
                
                let sliceOperator = previous.textContent.slice(0, -1);
                previous.textContent = (sliceOperator += operator);
                
                return this.operator;
            }
        }
        
        this.operator = operator;
        previous.textContent = screen.textContent;
        previous.textContent += operator;
        screen.textContent = "";

        return this.operator
    },   

    set number(number) {
        if (this.operator !== undefined) return this.number2 += number;
        else return this.number1 += number;       
    },

    get hasOperator() {
        if (previous.textContent.indexOf("+") !== -1) return true;
        else if (previous.textContent.indexOf("-") !== -1) return true;
        else if (previous.textContent.indexOf("x") !== -1) return true;
        else return false;
    },

    clearAll() {
        screen.textContent = "";
        previous.textContent = "";
        this.number1 = "";
        this.number2 = "";
        this.operator = undefined;
    },

    clear() {
        let deleteLast = screen.textContent.slice(0,-1);
        screen.textContent = deleteLast;
    },

    calculate() {
        // console.log( `number1: ${this.number1}`)
        // console.log( `number2: ${this.number2}`)
        // console.log( `operator: ${this.operator}`)

        if (this.number1 === "" || this.number2 === "") return;

        this.number1 = parseFloat(this.number1);
        this.number2 = parseFloat(this.number2);

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
            case "÷":
                this.result = this.number1 / this.number2;
                break;
            default:
                break;
        }
        // previous.textContent = `${this.number1}${this.operator}${this.number2}=`

        previous.textContent = "";
        screen.textContent = this.result;
        this.number1 = this.result;
        this.number2 = "";
        this.operator = undefined;
    },
};