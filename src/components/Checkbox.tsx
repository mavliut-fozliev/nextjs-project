import React from "react";
import styles from "../../styles/components/Checkbox.module.scss";
import { NextComponentType } from "next";

interface CheckboxProps {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
}

export const Checkbox: NextComponentType<{}, {}, CheckboxProps> = ({ value, onChange, name, label }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input type="checkbox" id={`${name}-checkbox`} className={styles.checkbox} checked={value} onChange={onChange} name={name} />
      <label htmlFor={`${name}-checkbox`} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};
