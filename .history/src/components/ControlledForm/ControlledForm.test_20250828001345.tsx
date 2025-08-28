import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ControlledForm } from "./ControlledForm";

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

describe("ControlledForm", () => {
  beforeEach(() => {
    store = mockStore({
      countries: ["USA", "Canada"],
      registeredUsers: [],
    });
  });

  const renderForm = (onClose = vi.fn()) =>
    render(
      <Provider store={store}>
        <ControlledForm onClose={onClose} />
      </Provider>
    );

  it("рендерит основные поля", () => {
    renderForm();

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the terms/i)).toBeInTheDocument();
  });

  it("подставляет страны из redux", () => {
    renderForm();
    fireEvent.focus(screen.getByPlaceholderText("Country"));
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
  });

  it("кнопка Submit задизейблена по умолчанию", () => {
    renderForm();
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });
});
