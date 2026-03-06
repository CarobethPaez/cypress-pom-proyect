describe('Mockear Productos - Stub con datos personalizados', () => {

it('Debería mostrar solo los productos que definimos en el stub', () => {
    
    // Interceptar la llamada de productos y responder con datos personalizados
    cy.intercept('GET', '**/products', {
        fixture: 'products.json' 
    }).as('getProducts')    

    cy.visit('/inventory')
    cy.wait('@getProducts')

    // Verificar que solo se muestran los productos del fixture
    cy.get('.inventory_item').should('have.length', 3) // Asegúrate de que el fixture tenga 3 productos
    cy.get('.inventory_item').first().should('contain.text', 'Producto Personalizado 1')
    cy.get('.inventory_item').eq(1).should('contain.text', 'Producto Personalizado 2')
    cy.get('.inventory_item').last().should('contain.text', 'Producto Personalizado 3')
})

})

// Verificar que el primer producto se llama 'Sauce Labs Backpack'



