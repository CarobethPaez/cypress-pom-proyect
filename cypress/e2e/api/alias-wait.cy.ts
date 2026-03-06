describe('Alias y Wait - Esperar a llamadas API con alias', () => {
    it('Patrón correcto: interceptar -> actuar -> esperar -> verificar', () => {

        // PASO 1: Definir interceptaciones con alias ANTES de visitar la página
        cy.intercept('GET', '**/products').as('getProducts')
        cy.intercept('GET', '**/cart').as('getCart')
         cy.intercept('POST', '**/add-to-cart').as('addToCart')