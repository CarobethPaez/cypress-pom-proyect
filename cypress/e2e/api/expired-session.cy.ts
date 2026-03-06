describe( 'Expired Session - Simular sesión expirada', () => {

    it('Debería redirigir al login si la sesión ha expirado', () => {

// Crea login exitoso
cy.intercept('POST', '**/api/login', {
    statusCode: 200,
    body: { token: 'fake-jwt-token' }
}).as('login')

// Intercepta la llamada de productos y responde con 401 para simular sesión expirada
cy.intercept('GET', '**/api/v1/products', {
    statusCode: 401,
    body: { message: 'Session expired' }
}).as('getProducts')    

// Verifica que la app redirige al usuario al login
cy.visit('/inventory')
cy.wait('@getProducts')
cy.url().should('include', '/login')

// Verifica que aparece el mensaje "Session expired, please login again"
cy.get('.error-message').should('contain.text', 'Session expired, please login again') 
    })

})  


