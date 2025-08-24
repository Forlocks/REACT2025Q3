import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { ControlledForm } from "./ControlledForm";
import countriesReducer from "../../slices/countriesSlice";
import registeredUsersReducer from "../../slices/registeredUsersSlice";

describe("ControlledForm simple tests", () => {
  const setupStore = () =>
    configureStore({
      reducer: {
        countries: countriesReducer,
        registeredUsers: registeredUsersReducer,
      },
      preloadedState: {
        countries: ["USA", "Canada"],
        registeredUsers: [],
      },
    });

  it("renders all input fields and submit button", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/country/i)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled(); // форма невалидна
  });

  it("enables submit button when required fields are filled and terms checked", async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/name/i), "John");
    await user.type(screen.getByPlaceholderText(/email/i), "john@mail.com");
    await user.type(screen.getByPlaceholderText(/password/i), "Password123");
    await user.type(screen.getByPlaceholderText(/confirm password/i), "Password123");
    await user.type(screen.getByPlaceholderText(/age/i), "30");
    await user.type(screen.getByPlaceholderText(/country/i), "USA");
    await user.click(screen.getByLabelText(/i agree to the terms/i));

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();
  });

  it("renders countries from redux store", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
  });
});
