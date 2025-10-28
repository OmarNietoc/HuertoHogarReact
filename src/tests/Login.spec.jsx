// src/tests/Login.spec.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";

// Usuarios que devolverá el mock de /data/usuarios.json
const mockUsuarios = [
  { email: "admin@gmail.com", password: "1234", rol: "admin", nombre: "Administrador" },
  { email: "omar@duoc.cl", password: "1234", rol: "cliente", nombre: "OmarDuoc" },
];

// Helper: renderiza Login en /login con Provider y rutas
function renderLogin({ ctxValue } = {}) {
  const value = ctxValue ?? { usuario: null, login: () => {}, logout: () => {} };

  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<div data-testid="admin-ok">ADMIN OK</div>} />
          <Route path="/" element={<div data-testid="home-ok">HOME OK</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("Componente Login", () => {
  let loginSpy;

  beforeAll(() => {
    // más margen para pruebas asíncronas
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  beforeEach(() => {
    // Timers falsos para poder avanzar el setTimeout(1200)
    jasmine.clock().install();

    // Mock de fetch para /data/usuarios.json
    spyOn(window, "fetch").and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsuarios),
      })
    );

    // Espía de login del contexto
    loginSpy = jasmine.createSpy("login");
  });

  afterEach(() => {
    try { jasmine.clock().uninstall(); } catch (_) {}
    if (window.fetch?.and?.callThrough) window.fetch.and.callThrough();
  });

  it("Cambia visibilidad de la contraseña al hacer clic", () => {
    renderLogin({ ctxValue: { usuario: null, login: loginSpy, logout: () => {} } });

    const inputPass = screen.getByPlaceholderText("********");
    // Botón “ojo” no tiene texto → tomamos el button con clase outline-secondary
    const botones = screen.getAllByRole("button");
    const botonOjo = botones.find((b) => b.className.includes("btn-outline-secondary"));
    expect(inputPass.getAttribute("type")).toBe("password");
    fireEvent.click(botonOjo);
    expect(inputPass.getAttribute("type")).toBe("text");
    fireEvent.click(botonOjo);
    expect(inputPass.getAttribute("type")).toBe("password");
  });

});
