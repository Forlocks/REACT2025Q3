import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserCard, UserCardProps } from "./UserCard";

const baseProps: UserCardProps = {
  photo: "test-photo.png",
  name: "John Doe",
  country: "USA",
  age: "30",
  gender: "Male",
  email: "john@example.com",
  password: "secret123",
  isNewCard: false,
};

describe("UserCard component", () => {
  it("renders the user's name", () => {
    render(<UserCard {...baseProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<UserCard {...baseProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test-photo.png");
    expect(img).toHaveAttribute("alt", "John Doe's avatar");
  });

  it("renders country, age, gender, email, and password", () => {
    render(<UserCard {...baseProps} />);
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("secret123")).toBeInTheDocument();
  });

  it("has .card class by default", () => {
    render(<UserCard {...baseProps} />);
    expect(screen.getByText("John Doe").closest(".card")).toHaveClass("card");
    expect(screen.getByText("John Doe").closest(".card")).not.toHaveClass("card--new");
  });

  it("adds .card--new class if isNewCard=true", () => {
    render(<UserCard {...baseProps} isNewCard />);
    expect(screen.getByText("John Doe").closest(".card")).toHaveClass("card--new");
  });
});
