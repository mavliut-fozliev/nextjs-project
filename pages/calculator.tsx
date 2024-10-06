import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Calculator.module.scss";

const Calculator: NextPage = () => {
  const [firstInput, setFirstInput] = useState<number>(0);
  const [secondInput, setSecondInput] = useState<number>(0);
  const [operation, setOperation] = useState<"÷" | "×" | "-" | "+" | "">("");
  const [result, setResult] = useState<number>(0);

  const firstInputRef = useRef(firstInput);
  const secondInputRef = useRef(secondInput);
  const operationRef = useRef(operation);

  useEffect(() => {
    firstInputRef.current = firstInput;
    secondInputRef.current = secondInput;
    operationRef.current = operation;
  }, [firstInput, secondInput, operation]);

  const correctNumber = (num: number) => {
    let newNum = Math.round(num * 100000) / 100000;
    newNum = newNum > 999999999 ? 999999999 : newNum;
    return newNum;
  };

  const handleNumber = (num: number) => {
    if (!operationRef.current) {
      setFirstInput((prev) => correctNumber(prev < 0 ? prev * 10 - num : prev * 10 + num));
    } else {
      setSecondInput((prev) => correctNumber(prev < 0 ? prev * 10 - num : prev * 10 + num));
    }
  };

  const handleOperation = (op: "÷" | "×" | "-" | "+") => {
    if (secondInputRef.current) {
      handleResult();
    }
    setOperation(op);
  };

  const handleResult = () => {
    let result = 0;
    switch (operationRef.current) {
      case "÷":
        result = firstInputRef.current / secondInputRef.current;
        break;
      case "×":
        result = firstInputRef.current * secondInputRef.current;
        break;
      case "-":
        result = firstInputRef.current - secondInputRef.current;
        break;
      case "+":
        result = firstInputRef.current + secondInputRef.current;
        break;
    }
    setResult(correctNumber(result));
    setFirstInput(correctNumber(result));
    setSecondInput(0);
    setOperation("");
  };

  const handleClear = () => {
    setFirstInput(0);
    setSecondInput(0);
    setOperation("");
    setResult(0);
  };

  const handlePlusMinus = () => {
    if (!operationRef.current) {
      setFirstInput((prev) => -prev);
    } else {
      setSecondInput((prev) => -prev);
    }
  };

  const handlePercent = () => {
    if (!operationRef.current) {
      setFirstInput((prev) => prev / 100);
    } else {
      setSecondInput((prev) => prev / 100);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if (key >= "0" && key <= "9") {
      handleNumber(Number(key));
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleOperation(key as "÷" | "×" | "-" | "+");
    } else if (key === "=" || key === "Enter") {
      handleResult();
    } else if (key === "Backspace") {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.info}>
        <h1>Калькулятор</h1>
        <p>
          Очень Простой калькулятор обычный - только стандартные функции калькулятора: сложение, вычитание, умножение и деление. Простой калькулятор работает на
          смартфонах и ПК даже без интернета, не требует установки, быстро загружается и работает онлайн.
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.display}>
          <div className={styles.output}>{result}</div>
          <div className={styles.input}>
            {firstInput}
            <span className={styles.operation}>{operation}</span>
            {secondInput ? secondInput : ""}
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttonGray} onClick={handleClear}>
            C
          </div>
          <div className={styles.buttonGray} onClick={handlePlusMinus}>
            +/-
          </div>
          <div className={styles.buttonGray} onClick={handlePercent}>
            %
          </div>
          <div className={styles.buttonOrange} onClick={() => handleOperation("÷")}>
            ÷
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(7)}>
            7
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(8)}>
            8
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(9)}>
            9
          </div>
          <div className={styles.buttonOrange} onClick={() => handleOperation("×")}>
            ×
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(4)}>
            4
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(5)}>
            5
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(6)}>
            6
          </div>
          <div className={styles.buttonOrange} onClick={() => handleOperation("-")}>
            -
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(1)}>
            1
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(2)}>
            2
          </div>
          <div className={styles.buttonDarkGray} onClick={() => handleNumber(3)}>
            3
          </div>
          <div className={styles.buttonOrange} onClick={() => handleOperation("+")}>
            +
          </div>
          <div className={styles.buttonDarkGray} style={{ gridColumn: "span 2" }} onClick={() => handleNumber(0)}>
            0
          </div>
          <div className={styles.buttonDarkGray}>.</div>
          <div className={styles.buttonOrange} onClick={handleResult}>
            =
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
