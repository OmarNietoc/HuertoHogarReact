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

> Nota seguridad Swagger Users: la ruta `https://api.onieto.cl/users/v3/api-docs` (y Swagger UI de Users) responde 401 si no envías `Authorization: Bearer <token>`; es intencional. Obtén el JWT con `POST /api/auth/login` y úsalo en la cabecera para acceder a la documentación.

## Pruebas
- Ejecutar tests: `npm run test:karma`
- Tests actuales cubren Home, Productos, Login con mocks de datos y servicios.
