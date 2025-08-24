import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ControlledForm } from "./ControlledForm";
import { addUser } from "../../slices/registeredUsersSlice";
import { registrationSchema } from "../../validation/registration";

vi.mock("../../slices/registeredUsersSlice", () => ({
  addUser: vi.fn((user) => ({ type: "users/addUser", payload: user })),
}));

// мок для FileReader
class FileReaderMock {
  result: string | null = null;
  onloadend: (() => void) | null = null;

  readAsDataURL(file: File) {
    this.result = "data:image/png;base64,mockedBase64";
    if (this.onloadend) this.onloadend();
  }
}
(global as any).FileReader = FileReaderMock;

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

describe("ControlledForm", () => {
  beforeEach(() => {
    store = mockStore({
      countries: ["USA", "Canada", "Germany"],
      registeredUsers: [],
    });
    store.dispatch = vi.fn();
  });

  const renderForm = (onClose = vi.fn()) =>
    render(
      <Provider store={store}>
        <ControlledForm onClose={onClose} />
      </Provider>
    );

  it("рендерит все поля формы", () => {
    renderForm();

    expect(screen.getByLabelText(/Photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Male/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Military helicopter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the terms/i)).toBeInTheDocument();
  });

  it("отображает страны из redux", () => {
    renderForm();
    const countryInput = screen.getByPlaceholderText("Country");
    fireEvent.focus(countryInput);
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
  });

  it("сабмитит форму и диспатчит addUser", async () => {
    const onClose = vi.fn();
    renderForm(onClose);

    // Заполняем поля
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const photoInput = screen.getByLabelText(/Photo/i);
    fireEvent.change(photoInput, { target: { files: [file] } });

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i));

    // Сабмитим
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "users/addUser",
          payload: expect.objectContaining({
            name: "John Doe",
            email: "john@example.com",
            country: "USA",
            age: "30",
            gender: "Male",
            terms: true,
            photo: "data:image/png;base64,mockedBase64",
          }),
        })
      );
    });

    expect(onClose).toHaveBeenCalled();
  });

  it("кнопка Submit задизейблена, если форма невалидна", () => {
    renderForm();
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });
});
