import React from "react";
import { Header } from "./Header";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

const mockStore = {
  name: "",
};

vi.mock("../../store", () => {
  return {
    useStore: () => ({
      name: mockStore.name,
    }),
  };
});

vi.mock("/assets/logo.svg", () => ({
  default: "test-file-stub",
}));

describe("Header Component", () => {
  it("should render the logo and text", () => {
    const { getByText, getByAltText } = render(<Header />);

    expect(getByText("Quantum lab")).toBeInTheDocument();
    expect(getByAltText("profile")).toBeInTheDocument();
  });

  it("should render menu links", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Главная")).toBeInTheDocument();
    expect(getByText("Калькулятор")).toBeInTheDocument();
    expect(getByText("Генератор паролей")).toBeInTheDocument();
  });

  it("should show calculator and generator links when store.name is not empty", () => {
    mockStore.name = "Test User";
    const { getByText } = render(<Header />);

    expect(getByText("Калькулятор")).toBeInTheDocument();
    expect(getByText("Генератор паролей")).toBeInTheDocument();
  });
});
