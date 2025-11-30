# HuertoHogar React

Frontend en React + Vite para la experiencia de compra y gestión de HuertoHogar. Consume los microservicios de Shoppy expuestos vía gateway.

## Tecnologías
- React 18 + Vite
- React Router
- TanStack Query (fetching/caching)
- Axios para HTTP
- Bootstrap y estilos locales
- Karma + Jasmine + Testing Library para pruebas unitarias

## APIs consumidas
- Gateway Shoppy: productos, categorías, unidades, auth/login-register, usuarios, regiones/comunas.
- Repo backend: https://github.com/OmarNietoc/Shoppy

Configura `VITE_API_URL` apuntando al gateway (ej. `http://localhost:8080` o tu dominio). Si no se define, el frontend usa `http://localhost:8080` por defecto.

## Pruebas
- Ejecutar tests: `npm run test:karma`
- Tests actuales cubren Home, Productos, Login con mocks de datos y servicios.
