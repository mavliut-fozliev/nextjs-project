import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders the button with children", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when button is clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick handler when button is disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled styles when button is disabled", () => {
    render(
      <Button onClick={() => {}} disabled>
        Click me
      </Button>
    );
    const button = screen.getByText("Click me");
    expect(button).toHaveClass(/disabled/);
    expect(button).toBeDisabled();
  });
});
