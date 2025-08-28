import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { ControlledForm } from "./ControlledForm";
import countriesReducer from "../../slices/countriesSlice";
import registeredUsersReducer from "../../slices/registeredUsersSlice";

describe("ControlledForm", () => {
  const setupStore = (preloadedState?: any) =>
    configureStore({
      reducer: {
        countries: countriesReducer,
        registeredUsers: registeredUsersReducer,
      },
      preloadedState,
    });

  it("рендерит форму и показывает ошибку, если сабмит без данных", async () => {
    const store = setupStore({
      countries: ["Ukraine", "USA", "Poland"], // preloadedState для стран
      registeredUsers: [],
    });

    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled(); // т.к. форма невалидна
  });

  it("показывает список стран из redux", () => {
    const store = setupStore({
      countries: ["Ukraine", "USA", "Poland"],
      registeredUsers: [],
    });

    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    // проверяем, что страна из стора отрендерилась в datalist
    expect(screen.getByText("Ukraine")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Poland")).toBeInTheDocument();
  });

  it("добавляет нового пользователя при сабмите", async () => {
    const store = setupStore({
      countries: ["Ukraine"],
      registeredUsers: [],
    });

    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/name/i), "Alex");
    await user.type(screen.getByPlaceholderText(/email/i), "alex@mail.com");
    await user.type(screen.getByPlaceholderText(/password/i), "Password123!");
    await user.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password123!"
    );
    await user.type(screen.getByPlaceholderText(/age/i), "25");
    await user.type(screen.getByPlaceholderText(/country/i), "Ukraine");
    await user.click(screen.getByLabelText(/i agree to the terms/i));

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    const actions = store.getState().registeredUsers;
    expect(actions.length).toBe(1);
    expect(actions[0].name).toBe("Alex");
  });
});
