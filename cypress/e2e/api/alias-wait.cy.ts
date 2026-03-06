describe('Alias y Wait - Esperar a llamadas API con alias', () => {
    it('Patrón correcto: interceptar -> actuar -> esperar -> verificar', () => {

        // PASO 1: Definir interceptaciones con alias ANTES de visitar la página
        cy.intercept('GET', '**/products').as('getProducts')
        cy.intercept('GET', '**/cart').as('getCart')
         cy.intercept('POST', '**/add-to-cart').as('addToCart')

         // PASO 2: Visitar la página

        cy.visit('/inventory')

         // PASO 3: Esperar que carguen los productos
        cy.wait('@getProducts').its('response.statusCode').should('eq', 200)

        // PASO 4: Hacer la acción
         cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

         // PASO 5: Esperar que se complete la llamada
        cy.wait('@addToCart').then((interception) => {
            // Verificar que la llamada se hizo correctamente
           expect(interception.request.body).to.deep.include({
        productId: 1,
        quantity: 1
      }) // Verificar respuesta exitosa

      expect(interception.response?.statusCode).to.eq(201)
    })

    // PASO 6: Verificar el resultado en la UI
    cy.get('.shopping_cart_badge').should('contain.text', '1')  
    })

    it('Esperar múltiples llamadas simultáneas', () => {
    cy.intercept('GET', '**/products').as('getProducts')
    cy.intercept('GET', '**/categories').as('getCategories')
    cy.intercept('GET', '**/user/profile').as('getUserProfile')

    cy.visit('/dashboard')

    // Esperar que TODAS las llamadas terminen antes de verificar
    cy.wait(['@getProducts', '@getCategories', '@getUserProfile'])

    // Ahora sí verificar que todo cargó correctamente
    cy.get('.products-section').should('be.visible')
    cy.get('.category-section').should('be.visible')
    cy.get('.user-name').should('be.visible')
  })

})

