class CartPage {

  // Selectores
  private pageTitle = '.title'
  private cartItems = '.cart_item'
  private checkoutButton = '[data-test="checkout"]'
  private removeButton = (productName: string) =>
    `[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`

  // ============================================================
  // VERIFICACIONES
  // ============================================================

  /**
   * Verifica que estamos en la página del carrito
   */
  verifyPageIsLoaded(): void {
    cy.url().should('include', '/cart')
    cy.get(this.pageTitle)
      .should('be.visible')
      .and('have.text', 'Your Cart')
  }

  // ============================================================
  // ACCIONES
  // ============================================================

  /**
   * Retorna todos los items del carrito
   */
  getCartItems(): Cypress.Chainable {
    return cy.get(this.cartItems)
  }

  /**
   * Elimina un producto del carrito por su nombre
   * @param productName - ej: 'Sauce Labs Backpack'
   */
  removeItem(productName: string): void {
    cy.get(this.removeButton(productName))
      .should('be.visible')
      .click()
  }

  /**
   * Hace click en el botón Checkout
   */
  clickCheckout(): void {
    cy.get(this.checkoutButton)
      .should('be.visible')
      .click()
  }
}

// Singleton — igual que LoginPage e InventoryPage
export const cartPage = new CartPage()





    
    
    
    
    
    
   


