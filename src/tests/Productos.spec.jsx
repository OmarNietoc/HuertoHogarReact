import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/Productos";

describe("Productos A Vender", () => {
  // Antes de todos los tests, simulamos fetch
  beforeAll(() => {
    spyOn(window, "fetch").and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: "FR001",
              nombre: "Manzana",
              descripcion: "Rica y jugosa",
              precio: 1200,
              unid: "kg",
              oferta: "Oferta",
              imagen: "https://via.placeholder.com/200",
              categoria: "frutas",
            },
            {
              id: "VR002",
              nombre: "Pera",
              descripcion: "Dulce y fresca",
              precio: 1000,
              unid: "kg",
              oferta: "Nuevo",
              imagen: "https://via.placeholder.com/200",
              categoria: "frutas",
            },
          ]),
      })
    );
  });

  afterAll(() => {
    window.fetch.and.callThrough(); // Restaura fetch original
  });

  it("Renderiza nombres de productos obtenidos por fetch", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzana/i)).toBeTruthy();
      expect(screen.getByText(/Pera/i)).toBeTruthy();
    });
  });

  it("Muestra correctamente el precio formateado", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/\$1\.200/)).toBeTruthy();
      expect(screen.getByText(/\$1\.000/)).toBeTruthy();
    });
  });

  it("Muestra mensaje de carga mientras se obtienen productos", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando productos.../i)).toBeTruthy();
  });
});
