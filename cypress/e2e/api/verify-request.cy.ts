describe('Verificar datos del request', () => {

    it('Debería enviar las credenciales correctas en el login', () => {

        // Interceptar la llamada de login
        cy.intercept('POST', '**/login').as('loginRequest')

        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // Esperar la llamada y verificar el request
        cy.wait('@loginRequest').then((interception) => {
            const requestBody = interception.request.body
        
            // Verificar que el request tiene los datos correctos
            expect(requestBody).to.have.property('username', 'standard_user')
            expect(requestBody).to.have.property('password', 'secret_sauce')

            // Verificar headers importantes
            expect(interception.request.headers).to.have.property('content-type')
        .that.includes('application/json')
    })
})

it('Debería enviar el token de autorización en requests protegidos', () => {
    // Primero hacer login para obtener el token
    cy.intercept('POST', '**/login', {
    statusCode: 200,
    body: { token: 'fake-jwt-token-12345' }
    }).as('login')

    cy.intercept('GET', '**/products').as('getProducts')

    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.wait('@login')

    // Verificar que las siguientes llamadas incluyen el token
    cy.wait('@getProducts').then((interception) => {
      expect(interception.request.headers)
        .to.have.property('authorization', 'Bearer fake-jwt-token-12345')
    })
  })

})