
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Declaración de tipos para TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      // Los comandos se irán agregando aquí
    }
  }
}

export {}
// Declaración de tipos (TypeScript requiere esto para autocompletado)
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      loginAsStandardUser(): Chainable<void>
      addProductToCart(productName: string): Chainable<void>
      loginBySession(username: string, password: string): Chainable<void>
    }
  }
}

// ============================================================
// COMANDO: cy.login() 
// Uso: cy.login('standard_user', 'secret_sauce')
// ============================================================
Cypress.Commands.add('login', (username: string, password: string) => {
  // En vez de hacer login por la UI (lento), usamos la API directamente
  // Esto hace los tests MÁS RÁPIDOS y más estables
  cy.session([username, password], () => {
    cy.visit('/')
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory')
  })
})

// ============================================================
// COMANDO: cy.loginAsStandardUser()
// Uso: cy.loginAsStandardUser() — sin parámetros, más conveniente
// ============================================================
Cypress.Commands.add('loginAsStandardUser', () => {
  // Llama al comando login con las credenciales del usuario estándar
  cy.login('standard_user', 'secret_sauce')
})

// ============================================================
// COMANDO: cy.addProductToCart()
// Uso: cy.addProductToCart('sauce-labs-backpack')
// ============================================================
Cypress.Commands.add('addProductToCart', (productName: string) => {
  cy.get(`[data-test="add-to-cart-${productName}"]`).click()
})

Cypress.Commands.add('loginBySession', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory')
  })
})
