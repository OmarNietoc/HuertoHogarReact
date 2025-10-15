import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

describe("🧪 Componente Login", () => {
  it("renderiza los campos de correo y contraseña", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  });

  it("muestra mensaje al hacer clic en Ingresar", () => {
    render(<Login />);
    const boton = screen.getByText("Ingresar");
    fireEvent.click(boton);
    expect(
      screen.getByText("Inicio de sesión exitoso")
    ).toBeInTheDocument();
  });
});
