import { useState } from "react";
import { Button } from "./ui/button";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const toggleSign = () => {
    setDisplay(String(-1 * parseFloat(display)));
  };

  const calculatePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-800 text-white">
        <div className="text-right text-4xl font-light truncate h-12 mb-1">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 p-4">
        <Button
          onClick={clearDisplay}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          AC
        </Button>
        <Button
          onClick={toggleSign}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          +/-
        </Button>
        <Button
          onClick={calculatePercentage}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          %
        </Button>
        <Button
          onClick={() => performOperation("/")}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          ÷
        </Button>

        <Button
          onClick={() => inputDigit("7")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          7
        </Button>
        <Button
          onClick={() => inputDigit("8")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          8
        </Button>
        <Button
          onClick={() => inputDigit("9")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          9
        </Button>
        <Button
          onClick={() => performOperation("*")}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          ×
        </Button>

        <Button
          onClick={() => inputDigit("4")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          4
        </Button>
        <Button
          onClick={() => inputDigit("5")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          5
        </Button>
        <Button
          onClick={() => inputDigit("6")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          6
        </Button>
        <Button
          onClick={() => performOperation("-")}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          -
        </Button>

        <Button
          onClick={() => inputDigit("1")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          1
        </Button>
        <Button
          onClick={() => inputDigit("2")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          2
        </Button>
        <Button
          onClick={() => inputDigit("3")}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          3
        </Button>
        <Button
          onClick={() => performOperation("+")}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          +
        </Button>

        <Button
          onClick={() => inputDigit("0")}
          className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
}