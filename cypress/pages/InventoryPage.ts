// cypress/pages/InventoryPage.ts
// Page Object para la página de productos (después del login)

class InventoryPage {
  
  // Selectores
  private pageTitle = '.title'
  private inventoryItems = '.inventory_item'
  private addToCartButton = (productName: string) => 
    `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`
  private cartIcon = '.shopping_cart_link'
  private cartBadge = '.shopping_cart_badge'
  private sortDropdown = '[data-test="product_sort_container"]'
  private burgerMenu = '#react-burger-menu-btn'
  private logoutLink = '#logout_sidebar_link'

  // Acciones

  /**
   * Verifica que llegamos correctamente a la página de inventario
   */
  verifyPageIsLoaded(): void {
    cy.url().should('include', '/inventory')
    cy.get(this.pageTitle)
      .should('be.visible')
      .and('have.text', 'Products')
  }

  /**
   * Obtiene todos los productos visibles en pantalla
   * Útil para verificar cuántos hay
   */
  getInventoryItems(): Cypress.Chainable {
    return cy.get(this.inventoryItems)
  }

  /**
   * Agrega un producto al carrito por su nombre
   * @param productName - Nombre del producto (ej: 'Sauce Labs Backpack')
   */
  addProductToCart(productName: string): void {
    cy.get(this.addToCartButton(productName))
      .should('be.visible')
      .click()
  }

  /**
   * Verifica que el carrito tiene la cantidad correcta de items
   * @param expectedCount - Número esperado de items
   */
  verifyCartCount(expectedCount: number): void {
    cy.get(this.cartBadge)
      .should('be.visible')
      .and('have.text', expectedCount.toString())
  }

  /**
   * Ordena los productos usando el dropdown
   * @param sortOption - Opción de ordenamiento ('az', 'za', 'lohi', 'hilo')
   */
  sortProductsBy(sortOption: string): void {
    cy.get(this.sortDropdown).select(sortOption)
  }

  /**
   * Cierra sesión desde el menú burger
   */
  logout(): void {
    cy.get(this.burgerMenu).click()
    cy.get(this.logoutLink).should('be.visible').click()
  }

  /**
   * Navega al carrito
   */
  goToCart(): void {
    cy.get(this.cartIcon).click()
  }
}

export const inventoryPage = new InventoryPage()

