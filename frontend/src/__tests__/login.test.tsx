import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import LoginPage from "@/app/login/page";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("LoginPage Component", () => {
  it("renders the AUREN branding and heading accurately", () => {
    render(<LoginPage />);

    expect(screen.getByText("Log in or Sign up")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("renders both Apple and Google social sign-in buttons", () => {
    render(<LoginPage />);

    expect(screen.getByText("Continue with Apple")).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
  });

  it("renders Email and Password form fields with prefilled values", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/Enter your email address/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i) as HTMLInputElement;

    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe("rasika@auren.app");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility when eye button is clicked", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i) as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    const toggleBtn = screen.getByLabelText(/Show password/i);
    fireEvent.click(toggleBtn);

    expect(passwordInput.type).toBe("text");
  });

  it("renders navigation link to signup", () => {
    render(<LoginPage />);

    const signUpLink = screen.getByRole("link", { name: /Sign up for free/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });
});
