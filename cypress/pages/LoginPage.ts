// cypress/pages/LoginPage.ts
// Page Object para la página de Login de SauceDemo

class LoginPage {
  
  // ============================================================
  // SELECTORES — Todos los elementos de la página en un solo lugar
  // Si el selector cambia, solo lo actualizas aquí
  // ============================================================
  
  private usernameInput = '#user-name'          // Campo de usuario
  private passwordInput = '#password'            // Campo de contraseña
  private loginButton = '#login-button'          // Botón de login
  private errorMessage = '[data-test="error"]'   // Mensaje de error

  // ============================================================
  // ACCIONES — Métodos que simulan lo que hace un usuario real
  // ============================================================

  /**
   * Navega a la página de login
   */
  visit(): void {
    cy.visit('/')  // Usa la baseUrl del config
  }

  /**
   * Escribe el nombre de usuario en el campo correspondiente
   * @param username - El usuario a ingresar
   */
  typeUsername(username: string): void {
    cy.get(this.usernameInput)
      .should('be.visible')    // Verifica que el campo existe
      .clear()                  // Limpia el campo antes de escribir
      .type(username)           // Escribe el usuario
  }

  /**
   * Escribe la contraseña en el campo correspondiente
   * @param password - La contraseña a ingresar
   */
  typePassword(password: string): void {
    cy.get(this.passwordInput)
      .should('be.visible')
      .clear()
      .type(password)
  }

  /**
   * Hace click en el botón de login
   */
  clickLoginButton(): void {
    cy.get(this.loginButton)
      .should('be.enabled')    // Verifica que el botón no está deshabilitado
      .click()
  }

  /**
   * Método completo: hace todo el proceso de login en un solo paso
   * Este es el método que más usarás en los tests
   * @param username - El usuario
   * @param password - La contraseña
   */
  login(username: string, password: string): void {
    this.visit()
    this.typeUsername(username)
    this.typePassword(password)
    this.clickLoginButton()
  }

  // ============================================================
  // VERIFICACIONES — Métodos para validar el estado de la página
  // ============================================================

  /**
   * Verifica que aparece un mensaje de error con el texto esperado
   * @param expectedMessage - El mensaje de error esperado
   */
  verifyErrorMessage(expectedMessage: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', expectedMessage)
  }

  /**
   * Verifica que la página de login está cargada correctamente
   */
  verifyPageIsLoaded(): void {
    cy.get(this.loginButton).should('be.visible')
    cy.url().should('include', 'saucedemo.com')
  }
}

// Exportar una instancia (Singleton) — solo existe un LoginPage
export const loginPage = new LoginPage()