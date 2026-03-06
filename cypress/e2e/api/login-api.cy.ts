describe(' Spy - POST Login API', () => {
    it('Debería hacer login correctamente y verificar la respuesta', () => {
        // Configurar el spy para la llamada de login
        cy.intercept('POST', '/api/login').as('loginRequest')

        // Realizar el login
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')

        cy.get('#login-button').click()

        // Esperar la llamada de login y verificar la respuesta
        cy.wait('@loginRequest').then((interception) => {
            // Verificar el STATUS CODE de la respuesta
            expect(interception.response?.statusCode).to.eq(200)
            
            // Verificar que la respuesta tiene un token
            expect(interception.response?.body).to.have.property('token')
            // Verificar que el REQUEST tenía los datos correctos
            expect(interception.request.body).to.have.property('username', 'standard_user')
        })
    })
})