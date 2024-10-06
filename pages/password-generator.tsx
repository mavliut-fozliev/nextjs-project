import { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/PasswordGenerator.module.scss";
import { InputLine } from "../src/components/InputLine";
import { Checkbox } from "../src/components/Checkbox";
import { Button } from "../src/components/Button";
import CopyIcon from "../assets/copy-icon.svg";

type Config = {
  useUpperCase: boolean;
  useLowerCase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  avoidRepetition: boolean;
};

type ConfigValues = Record<keyof Config, string>;

const PasswordGenerator: NextPage = () => {
  const [passwordLength, setPasswordLength] = useState<number>(0);

  const [config, setConfig] = useState<Config>({
    useUpperCase: false,
    useLowerCase: false,
    useNumbers: false,
    useSymbols: false,
    avoidRepetition: false,
  });

  const [passwords, setPasswords] = useState<string[]>([]);

  const onChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const max = 20;
    const newValue = value > max ? max : value;

    setPasswordLength(newValue);
  };

  const onChangeConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.checked });
  };

  const generatePassword = () => {
    const chars: ConfigValues = {
      useUpperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      useLowerCase: "abcdefghijklmnopqrstuvwxyz",
      useNumbers: "0123456789",
      useSymbols: "%*)?@#$~",
      avoidRepetition: "",
    };

    const availableChars = Object.keys(config).reduce((acc, key) => {
      if (config[key as keyof Config]) {
        return acc + chars[key as keyof Config];
      }
      return acc;
    }, "");

    const getRandomChar = (chars: string) => {
      return chars[Math.floor(Math.random() * chars.length)];
    };

    const generatePassword = () => {
      let password = "";
      let prevChar = "";
      for (let i = 0; i < passwordLength; i++) {
        let char = getRandomChar(availableChars);
        if (config.avoidRepetition && char === prevChar) {
          i--;
          continue;
        }
        password += char;
        prevChar = char;
      }
      return password;
    };

    const newPasswords = [...passwords, generatePassword()];

    setPasswords(newPasswords);
  };

  const disableButton = !passwordLength || (!config.useUpperCase && !config.useLowerCase && !config.useNumbers && !config.useSymbols);

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    alert("Пароль скопирован в буфер обмена");
  };

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <h1 className={styles.label}>Генератор паролей</h1>
        <div className={styles.main}>
          <div>
            <div className={styles.generator}>
              <label className={styles.boxLabel}>Длина пароля</label>
              <InputLine value={passwordLength} onChange={onChangeLength} placeholder="Введите число" type="number" />
              <div className={styles.config}>
                <Checkbox value={config.useUpperCase} onChange={onChangeConfig} name="useUpperCase" label="Использовать прописные буквы" />
                <Checkbox value={config.useLowerCase} onChange={onChangeConfig} name="useLowerCase" label="Использовать строчные буквы" />
                <Checkbox value={config.useNumbers} onChange={onChangeConfig} name="useNumbers" label="Использовать цифры" />
                <Checkbox value={config.useSymbols} onChange={onChangeConfig} name="useSymbols" label="Использовать символы: %, *, ), ?, @, #, $, ~" />
                <Checkbox value={config.avoidRepetition} onChange={onChangeConfig} name="avoidRepetition" label="Избегать повторения символов" />
              </div>
            </div>
            <div className={styles.generateButton}>
              <Button onClick={generatePassword} disabled={disableButton}>
                Сгенерировать пароли
              </Button>
            </div>
          </div>
          <div className={styles.history}>
            <label className={styles.boxLabel}>Результаты</label>
            <div className={styles.results}>
              {passwords.map((password, index) => (
                <div key={index.toString()} className={styles.result}>
                  <p>{password}</p>
                  <div onClick={() => copyPassword(password)} className={styles.copyButton}>
                    <CopyIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
