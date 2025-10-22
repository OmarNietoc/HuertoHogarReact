# React + Vite

# Cobertura de Testing – Proyecto Frontend

## Datos para Pruebas
   - "email": "admin@gmail.com"
    "password": "1234"
    "rol": "admin"

   - "email": "omar@duoc.cl"
    "password": "1234"
    "rol": "cliente"

## Alcance
- Home:
  - Render de cards y títulos
  - Precios y etiquetas (Oferta/Nuevo)
  - Fetch de productos (mock)
- Login:
  - Render de campos y botón
  - Validaciones: email inválido, password fuera de rango
  - Credenciales incorrectas (mensaje de alerta)
  - Credenciales válidas (llama a login y navega /admin o /)
  - Interacciones UI: toggle de visibilidad de contraseña

## Herramientas
- Karma 6.4.4 + Jasmine
- @testing-library/react para consultas y eventos
- Webpack (babel-loader), ChromeHeadless

## Resultados (ejemplo)
- Total specs: 12
- Pasados: 12 / Fallidos: 0
- Cobertura (si usas karma-coverage):
  - Lines: 80%
  - Branches: 70%
  - Functions: 75%
  - Statements: 80%

## Brechas / pendientes
- Cobertura de formularios adicionales (registro / contacto)
- Tests de errores de red en Login (fetch 500)
- Pruebas de borde en validadores (e-mails raros, longitudes)
