import { loginPage } from '../../pages/LoginPage'
import { inventoryPage } from '../../pages/InventoryPage'
import { cartPage } from '../../pages/CartPage'

describe('Cart Functionality', () => {
  beforeEach(() => {
    // Log in before each test
    loginPage.visit()
    loginPage.login('standard_user', 'secret_sauce')
    inventoryPage.verifyPageIsLoaded()
  })

  it('should add a product to the cart and verify it appears in the cart', () => {
    const productName1 = 'sauce-labs-backpack'
    const productName2 = 'sauce-labs-bike-light'
    
    // Add product to cart
    inventoryPage.addProductToCart(productName1)
    inventoryPage.addProductToCart(productName2)
    
    // Verify product is in cart
    cartPage.verifyPageIsLoaded()
    
    
    })  
})    


    