import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

//Mock de productos reales (según tu archivo JSON)
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
    id: "VR002",
    nombre: "Espinacas Frescas",
    descripcion:
      "Frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad.",
    precio: 700,
    categoria: "verduras",
    imagen: "/img/products/spinach.jpg",
    oferta: "Nuevo",
    unid: "kg",
  },
  {
    id: "VR003",
    nombre: "Pimientos Tricolores",
    descripcion:
      "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas.",
    precio: 1500,
    categoria: "verduras",
    imagen: "/img/products/peppers.jpg",
    oferta: "Nuevo",
    unid: "kg",
  },
];

describe("Home Productos Visibles", () => {
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

  it("Renderiza los títulos de los productos correctamente", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzanas Fuji/i)).toBeTruthy();
      expect(screen.getByText(/Espinacas Frescas/i)).toBeTruthy();
      expect(screen.getByText(/Pimientos Tricolores/i)).toBeTruthy();
    });
  });

  it("Renderiza al menos 3 cards de productos", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 5 });
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("Muestra correctamente los precios", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Match flexible para precios (por partes)
      const precios = screen.getAllByText((content) =>
        content.match(/\d+\.\d+|CLP|kg/)
      );
      expect(precios.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("Muestra etiquetas de oferta o nuevo", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Oferta/i)).toBeTruthy();
      expect(screen.getAllByText(/Nuevo/i).length).toBeGreaterThan(0);
    });
  });
});
