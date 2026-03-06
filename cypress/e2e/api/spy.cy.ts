describe('Spy - Espiar llamadas API', () => {

  it('Debería verificar que se hace la llamada de login correcta', () => {
    
    // 1. Configurar el spy ANTES de la acción
    cy.intercept('POST', '/api/login').as('loginRequest')
    // Realizar el login

    // 2. Ejecutar la acción que dispara la llamada
   cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // 3. Esperar que ocurra la llamada interceptada
    cy.wait('@loginRequest').then((interception) => {
      // Verificar el STATUS CODE de la respuesta
      expect(interception.response?.statusCode).to.eq(200)

      // Verificar que el REQUEST tenía los datos correctos
      expect(interception.request.body).to.have.property('username', 'standard_user')
    })
  })

  it('Debería verificar que se cargan los productos al entrar al inventario', () => {
    // Spy en la llamada de productos
    cy.intercept('GET', '**/api/v1/products').as('getProducts')

    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Esperar la llamada y verificar
    cy.wait('@getProducts').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200)
      // Verificar que la respuesta tiene productos
      expect(interception.response?.body).to.have.property('products')
    })
  })

})


