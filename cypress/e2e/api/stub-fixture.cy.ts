describe('Stub — Mockear con Fixture', () => {

  it('Debería mostrar exactamente los productos del fixture', () => {
    // Interceptar y responder con datos del fixture
    cy.intercept('GET', '**/products', {
      fixture: 'products.json'   // Lee el archivo cypress/fixtures/products.json
    }).as('getProducts')

    cy.visit('/inventory')
    cy.wait('@getProducts')

    // Ahora sabemos exactamente cuántos productos hay (los del fixture)
    cy.get('.inventory_item').should('have.length', 3)
    
    // Y podemos verificar datos específicos
    cy.get('.inventory_item_name').first()
      .should('contain.text', 'Sauce Labs Backpack')
  })

  it('Debería mostrar carrito vacío cuando no hay productos guardados', () => {
    // Mockear respuesta de carrito vacío
    cy.intercept('GET', '**/cart', {
      statusCode: 200,
      body: { items: [], total: 0 }
    }).as('emptyCart')

    cy.visit('/cart')
    cy.wait('@emptyCart')

    cy.get('.cart_item').should('not.exist')
    cy.get('.cart_quantity_label').should('not.exist')
  })

})