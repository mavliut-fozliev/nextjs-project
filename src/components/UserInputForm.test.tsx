import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserInputForm } from "./UserInputForm";
import { Routes } from "../../consts";

const mockStore = {
  setName: vi.fn(),
};

vi.mock("../../store/useStore", () => ({
  useStore: () => mockStore,
}));

const mockPush = vi.fn();
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("UserInputForm Component", () => {
  it("should update the name state on input change", () => {
    const { getByPlaceholderText } = render(<UserInputForm />);
    const input = getByPlaceholderText("Как вас зовут?") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test User" } });

    expect(input.value).toBe("Test User");
  });

  it("should call store.setName and navigate to calculator on button click", () => {
    const { getByText, getByPlaceholderText } = render(<UserInputForm />);
    const input = getByPlaceholderText("Как вас зовут?");
    const button = getByText("Открыть калькулятор");

    fireEvent.change(input, { target: { value: "Test User" } });
    fireEvent.click(button);

    expect(mockStore.setName).toHaveBeenCalledWith("Test User");
    expect(mockPush).toHaveBeenCalledWith(Routes.calculator);
  });

  it("should call store.setName and navigate to password generator on button click", () => {
    const { getByText, getByPlaceholderText } = render(<UserInputForm />);
    const input = getByPlaceholderText("Как вас зовут?");
    const button = getByText("Открыть генератор");

    fireEvent.change(input, { target: { value: "Test User" } });
    fireEvent.click(button);

    expect(mockStore.setName).toHaveBeenCalledWith("Test User");
    expect(mockPush).toHaveBeenCalledWith(Routes.passwordGenerator);
  });
});
