import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { shoppyService } from "../services/shoppyService";
import Home from "../pages/Home";

// Mock de productos
const mockProductos = [
  {
    id: "FR001",
    nombre: "Manzanas Fuji",
    descripcion: "Crujientes y dulces.",
    precio: 1200,
    categoria: "frutas",
    imagen: "/img/products/apples2.jpg",
    stock: 10,
    unid: { name: "kg" }
  },
  {
    id: "VR002",
    nombre: "Espinacas Frescas",
    descripcion: "Frescas y nutritivas.",
    precio: 700,
    categoria: "verduras",
    imagen: "/img/products/spinach.jpg",
    stock: 3, // Stock bajo para probar etiqueta de oferta/poco stock
    unid: { name: "atado" }
  },
  {
    id: "VR003",
    nombre: "Pimientos Tricolores",
    descripcion: "Pimientos rojos, amarillos y verdes.",
    precio: 1500,
    categoria: "verduras",
    imagen: "/img/products/peppers.jpg",
    stock: 20,
    unid: { name: "kg" }
  },
];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Home Productos Visibles", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    // Mockear el servicio en lugar del hook
    spyOn(shoppyService, 'getProducts').and.returnValue(Promise.resolve(mockProductos));
  });

  it("Renderiza los títulos de los productos correctamente", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Manzanas Fuji/i)).toBeTruthy();
      expect(screen.getByText(/Espinacas Frescas/i)).toBeTruthy();
      expect(screen.getByText(/Pimientos Tricolores/i)).toBeTruthy();
    });
  });

  it("Renderiza al menos 3 cards de productos", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 5 });
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("Muestra etiquetas de oferta o poco stock", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // En el componente Home, se muestra "¡Poco Stock!" si stock <= 5
      // Espinacas tiene stock 3
      expect(screen.getByText(/¡Poco Stock!/i)).toBeTruthy();
    });
  });

  it("Renderiza correctamente el botón de descarga de la App Android", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const botonDescarga = await screen.findByRole("link", { name: /Descargar App Android/i });
    expect(botonDescarga).toBeTruthy();
    expect(botonDescarga.getAttribute("href")).toBe("/app/huertohogar.apk");
  });
});
