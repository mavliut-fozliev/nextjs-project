import { NextComponentType } from "next";
import React, { useState } from "react";
import styles from "../../styles/components/UserInputForm.module.scss";
import { InputLine } from "./InputLine";
import { Button } from "./Button";
import { useStore } from "../../store/useStore";
import { useRouter } from "next/router";
import { Routes } from "../../consts";

export const UserInputForm: NextComponentType = () => {
  const router = useRouter();

  const store = useStore();
  const [name, setName] = useState<string>("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const saveName = () => {
    store.setName(name);
  };

  const onClickOpenCalculator = () => {
    saveName();
    router.push(Routes.calculator);
  };

  const onClickOpenGenerator = () => {
    saveName();
    router.push(Routes.passwordGenerator);
  };

  return (
    <div className={styles.box}>
      <div className={styles.boxInput}>
        <label className={styles.label}>Начать</label>
        <InputLine value={name} onChange={onChangeName} placeholder="Как вас зовут?" label="Ваше имя" />
      </div>
      <div className={styles.separator}></div>
      <div className={styles.boxButtons}>
        <Button onClick={onClickOpenCalculator} disabled={!name}>
          Открыть калькулятор
        </Button>
        <Button onClick={onClickOpenGenerator} disabled={!name}>
          Открыть генератор
        </Button>
      </div>
    </div>
  );
};
