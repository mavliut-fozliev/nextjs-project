import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./calculator";
import "@testing-library/jest-dom/extend-expect";
import { describe, beforeEach, expect, test } from "vitest";

describe("Calculator Component", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test("renders calculator title and description", () => {
    expect(screen.getByText(/Калькулятор/i)).toBeInTheDocument();
    expect(screen.getByText(/Очень Простой калькулятор/i)).toBeInTheDocument();
  });

  test("displays initial values", () => {
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.queryByText("÷")).toBeNull();
  });

  test("handles number input", () => {
    fireEvent.click(screen.getByText("7"));
    expect(screen.getByText("7")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));
    fireEvent.click(screen.getByText("8"));
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  test("performs addition operation", () => {
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("performs subtraction operation", () => {
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("performs multiplication operation", () => {
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("×"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("performs division operation", () => {
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("÷"));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("clears input when C is clicked", () => {
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("C"));

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.queryByText("÷")).toBeNull();
  });

  test("handles plus-minus operation", () => {
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+/-"));
    expect(screen.getByText("-5")).toBeInTheDocument();
  });

  test("handles percent operation", () => {
    fireEvent.click(screen.getByText("50"));
    fireEvent.click(screen.getByText("%"));
    expect(screen.getByText("0.5")).toBeInTheDocument();
  });

  test("handles keyboard input", () => {
    fireEvent.keyDown(window, { key: "1", code: "Digit1" });
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "+", code: "Equal" });
    fireEvent.keyDown(window, { key: "2", code: "Digit2" });
    fireEvent.keyDown(window, { key: "=", code: "Enter" });

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
