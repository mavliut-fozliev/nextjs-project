import { NextComponentType } from "next";
import React from "react";
import styles from "../../styles/components/Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: NextComponentType<{}, {}, ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button className={`${styles.button} ${disabled ? styles.disabled : ""}`} onClick={disabled ? undefined : onClick} disabled={disabled}>
      {children}
    </button>
  );
};
