describe('Stub — Mockear con objeto inline', () => {

  it('Debería mostrar mensaje de error cuando la API falla', () => {
    // Mockear un error 401 — Unauthorized
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      }
    }).as('failedLogin')

    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.wait('@failedLogin')

    // Aunque las credenciales son correctas, la API devuelve 401
    // Verificamos que la UI maneja el error correctamente
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('Debería mostrar loading spinner mientras carga', () => {
    // Simular una respuesta lenta (2 segundos de delay)
    cy.intercept('GET', '**/products', (req) => {
      req.on('response', (res) => {
        res.setDelay(2000)  // 2 segundos de delay
      })
    }).as('slowProducts')

    cy.visit('/inventory')
    
    // Verificar que el spinner aparece mientras carga
    cy.get('.loading-spinner').should('be.visible')
    
    cy.wait('@slowProducts')
    
    // Verificar que el spinner desaparece cuando termina
    cy.get('.loading-spinner').should('not.exist')
  })

})