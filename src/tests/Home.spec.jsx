import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("🧩 Home (Card)", () => {
  // Antes de todas las pruebas
  beforeAll(() => {
    spyOn(window, "fetch").and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: "FR001",
              nombre: "Manzanas Fuji",
              descripcion: "Crujientes y dulces, cultivadas en el Valle del Maule.",
              precio: 1200,
              unid: "kg",
              oferta: "Oferta",
              imagen: "https://via.placeholder.com/200",
              categoria: "fruta",
            },
            {
              id: "VR002",
              nombre: "Espinacas Frescas",
              descripcion: "Perfectas para ensaladas.",
              precio: 700,
              unid: "kg",
              oferta: "Nuevo",
              imagen: "https://via.placeholder.com/200",
              categoria: "verdura",
            },
          ]),
      })
    );
  });

  afterAll(() => {
    window.fetch.and.callThrough(); // restaura fetch original
  });

  it("Renderiza títulos de productos correctamente", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzanas Fuji/i)).toBeTruthy();
      expect(screen.getByText(/Espinacas Frescas/i)).toBeTruthy();
    });
  });

  it("Renderiza al menos 2 productos en cards", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 5 });
      expect(cards.length).toBeGreaterThanOrEqual(2);
    });
  });
});
