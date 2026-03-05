// cypress/support/e2e.ts
// Este archivo se ejecuta antes de cada test suite

// Aquí irán los imports de custom commands (los crearemos en la Clase 1 - Paso 6)
// import './commands'

// Manejador global de errores no capturados
Cypress.on('uncaught:exception', (err) => {
  console.log('Uncaught exception:', err.message)
  return false
})