import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

describe("Login Component", () => {
  test("renders login form", () => {
    render(<Login />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("allows user to type in email and password", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("logs user in on form submission", () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const button = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    console.log = jest.fn(); // Mock console.log
    
    fireEvent.click(button);

    expect(console.log).toHaveBeenCalledWith("Logging in:", "test@example.com");
  });
});
