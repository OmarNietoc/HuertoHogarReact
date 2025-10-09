import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home.jsx';

describe('Home (Card)', () => { // agrupa un conjunto de tests bajo un nombre (en este caso "Home (Card)"). Sirve para el reporte final.
  it('Busca que se renderizan 6 cards de producto', () => { // it describe el caso
    render(<Home />); // Render monta el componente en DOM virtual.
    const cards = screen.getAllByTestId('producto'); // Busca todos los elementos con data-testid="producto"
    expect(cards.length).toBe(6); // Valida que existan exactamente 6 cards renderizadas
  });

  it('Busca 6 títulos (h5) de producto', () => { 
    render(<Home />);
    const titles = screen.getAllByRole('heading', { level: 5 }); // Busca por rol "heading" nivel 5 (equivale a <h5>)
    expect(titles.length).toBe(6);
  });

  it('Busca un producto específico por su título', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Bombones de chocolate', level: 5 })) // Busca un texto exacto en el contenido
      .toBeInTheDocument(); //Verifica que el elemento (nombre buscado) existe en el DOM renderizado.
  });
});

describe('Elementos del Home', () => {
  it('Busca titulo de productos', async () => {
    render(<Home />);
    const titulo = await screen.findByText(/Nuestros Productos/i);
    expect(titulo).toBeInTheDocument();
  }); 
});

