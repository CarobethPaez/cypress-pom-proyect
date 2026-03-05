// cypress.config.ts
// Este archivo es el cerebro de la configuración de Cypress

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // URL base de la aplicación que vas a testear
    // Así en los tests solo escribes cy.visit('/login') en vez de la URL completa
    baseUrl: 'https://www.saucedemo.com',
    
    // Tiempo máximo de espera para encontrar elementos (en ms)
    defaultCommandTimeout: 8000,
    
    // Tiempo máximo para cargar una página
    pageLoadTimeout: 30000,
    
    // Carpeta donde están los tests
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    
    // Carpeta donde se guardan screenshots automáticos cuando falla un test
    screenshotsFolder: 'cypress/reports/screenshots',
    
    // Carpeta donde se guardan videos de los tests
    videosFolder: 'cypress/reports/videos',
    
    // Grabar video de cada test (útil para debugging)
    video: true,
    
    setupNodeEvents(on, config) {
      // Aquí se configuran plugins adicionales
      return config
    },
  },
})
