import { NextComponentType } from "next";
import React from "react";
import styles from "../../styles/components/InputLine.module.scss";

interface InputLineProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export const InputLine: NextComponentType<{}, {}, InputLineProps> = ({ value, onChange, label, placeholder, disabled, error }) => {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${disabled ? styles.disabled : ""} ${error ? styles.error : ""}`}
        disabled={disabled}
      />
    </div>
  );
};
