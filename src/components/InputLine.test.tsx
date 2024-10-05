import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputLine } from "./InputLine";

describe("InputLine component", () => {
  it("renders the input with a label", () => {
    render(<InputLine value="" onChange={() => {}} label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = vi.fn();
    render(<InputLine value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies disabled state to the input", () => {
    render(<InputLine value="" onChange={() => {}} disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(/disabled/);
  });

  it("applies error state to the input", () => {
    render(<InputLine value="" onChange={() => {}} error />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(/error/);
  });

  it("renders the input with a placeholder", () => {
    render(<InputLine value="" onChange={() => {}} placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });
});
