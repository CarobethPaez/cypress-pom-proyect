import { should } from "chai"

describe('Manejo de errores del servidor', () => {

    it('Debería mostrar mensaje amigable cuando el servidor devuelve un error 500', () => { 
        // Interceptar la llamada de productos y simular un error 500   

        cy.intercept('GET', '**/products', {
            statusCode: 500,
            body: {error: 'Internal Server Error'}
        }).as('serverError')

        cy.visit('/inventory')
        cy.wait('@serverError')

        // Verificar que la app muestra un mensaje de error amigable
        cy.get('.error-message')
            .should('be.visible')
                .and('contain.text', 'Sorry, something went wrong. Please try again later.')
    })

    // Error 404 — Not Found

    it('Debería redirigir cuando el recurso no existe (404)', () => {
        cy.intercept('GET', '**/products', {
            statusCode: 404,
            body: {error: 'Product not found'}
        }).as('notFound')

        cy.visit('/product/999')  // Intentamos acceder a un producto que no existe
        cy.wait('@notFound')

        // Verificar redirección a página de error
        cy.url().should('include', '/not-found')

       
    })

// Error de red — sin conexión

it('Debería mostrar mensaje de error cuando no hay conexión', () => {
    cy.intercept('GET', '**/products', {
        forceNetworkError: true  // Simula un error de red
    }).as('networkError')   

    cy.visit('/inventory')
    
    cy.get('.network-error-message')
    .should('be.visible')
    .and('contain.text', 'Network error. Please check your connection and try again.')
    })

    // Timeout — respuesta lenta
    it('Debería mostrar mensaje de timeout cuando la respuesta es muy lenta', () => {   
        cy.intercept('GET', '**/products', (req) => {
            req.on('response', (res) => {
                res.setDelay(10000)  // Simula una respuesta muy lenta (10 segundos)
            })
        }).as('timeoutRequest')

        cy.visit('/inventory')

        cy.get('.timeout-message')
        .should('be.visible')
        .and('contain.text', 'The request is taking too long. Please try again later.')
    })

})



