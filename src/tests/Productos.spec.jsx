import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/Productos";

describe("Componente Productos", () => {
  const mockProductos = [
    {
      id: "FR001",
      nombre: "Manzanas Fuji",
      descripcion:
        "Crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.",
      precio: 1200,
      categoria: "frutas",
      imagen: "/img/products/apples2.jpg",
      oferta: "Oferta",
      unid: "kg",
    },
    {
      id: "FR002",
      nombre: "Naranjas Valencia",
      descripcion:
        "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas.",
      precio: 1000,
      categoria: "frutas",
      imagen: "/img/products/oranges2.jpg",
      unid: "kg",
    },
    {
      id: "VR001",
      nombre: "Zanahorias Orgánicas",
      descripcion:
        "Cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra.",
      precio: 900,
      categoria: "verduras",
      imagen: "/img/products/carrots.jpg",
      unid: "kg",
    },
  ];

  beforeAll(() => {
    spyOn(window, "fetch").and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProductos),
      })
    );
  });

  afterAll(() => {
    window.fetch.and.callThrough();
  });

  it("debe renderizar todos los nombres de productos", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzanas Fuji/i)).toBeTruthy();
      expect(screen.getByText(/Naranjas Valencia/i)).toBeTruthy();
      expect(screen.getByText(/Zanahorias Orgánicas/i)).toBeTruthy();
    });
  });

  it("debe mostrar el número correcto de cards", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 5 });
      expect(cards.length).toBe(mockProductos.length);
    });
  });

  it("debe mostrar los precios correctamente", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/\$1200/i)).toBeTruthy();
      expect(screen.getByText(/\$1000/i)).toBeTruthy();
      expect(screen.getByText(/\$900/i)).toBeTruthy();
    });
  });
});
