import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { shoppyService } from "../services/shoppyService";
import Productos from "../pages/Productos";

// Mock de productos
const mockProductos = [
  {
    id: "FR001",
    nombre: "Manzanas Fuji",
    descripcion: "Crujientes y dulces.",
    precio: 1200,
    categoria: { id: 1, name: "Frutas Frescas" },
    imagen: "/img/products/apples2.jpg",
    stock: 10,
    unid: { name: "kg" }
  },
  {
    id: "VR001",
    nombre: "Zanahorias Orgánicas",
    descripcion: "Cultivadas sin pesticidas.",
    precio: 900,
    categoria: { id: 2, name: "Verduras" },
    imagen: "/img/products/carrots.jpg",
    stock: 20,
    unid: { name: "kg" }
  },
  {
    id: "LC001",
    nombre: "Leche Fresca",
    descripcion: "Leche de vaca.",
    precio: 1000,
    categoria: { id: 3, name: "Lácteos" },
    imagen: "/img/products/milk.jpg",
    stock: 15,
    unid: { name: "lt" }
  }
];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Componente Productos", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    spyOn(shoppyService, 'getProducts').and.returnValue(Promise.resolve(mockProductos));
    spyOn(shoppyService, 'getCategories').and.returnValue(Promise.resolve([]));
    spyOn(shoppyService, 'getUnits').and.returnValue(Promise.resolve([]));
  });

  it("debe renderizar todos los nombres de productos", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Productos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzanas Fuji/i)).toBeTruthy();
      expect(screen.getByText(/Zanahorias Orgánicas/i)).toBeTruthy();
      expect(screen.getByText(/Leche Fresca/i)).toBeTruthy();
    });
  });

  it("debe mostrar el número correcto de cards", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Productos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 5 });
      expect(cards.length).toBeGreaterThanOrEqual(mockProductos.length);
    });
  });

  it("debe mostrar los precios correctamente", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Productos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const precios = screen.getAllByText(/\d{3,}/);
      expect(precios.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("debe mostrar mensaje de carga inicialmente", () => {
    // Sobrescribir el mock para que nunca resuelva (simular carga infinita) o usar fake timers
    // Pero React Query tiene isLoading true inicialmente.
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Productos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByLabelText("loading-text")).toBeTruthy();
  });

});
