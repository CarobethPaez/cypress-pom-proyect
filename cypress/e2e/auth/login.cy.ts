// cypress/e2e/auth/login.cy.ts
// Tests de Login usando Page Object Model

// Importamos nuestros Page Objects
import { loginPage } from '../../pages/LoginPage'
import { inventoryPage } from '../../pages/InventoryPage'

// describe() agrupa tests relacionados
describe('Login Feature', () => {
  
  // beforeEach() se ejecuta ANTES de cada test
  // Ideal para resetear el estado
  beforeEach(() => {
    loginPage.visit()  // Siempre empezamos desde la página de login
  })

  // ============================================================
  // CASOS POSITIVOS — El flujo "happy path"
  // ============================================================
  
  context('Happy Path — Login exitoso', () => {
    
    it('Debería hacer login con credenciales válidas', () => {
      // Arrange (Preparar) — datos del test
      const validUser = 'standard_user'
      const validPassword = 'secret_sauce'

      // Act (Actuar) — ejecutar la acción
      loginPage.login(validUser, validPassword)

      // Assert (Verificar) — comprobar el resultado
      inventoryPage.verifyPageIsLoaded()
    })

    it('Debería mostrar los productos después del login', () => {
      loginPage.login('standard_user', 'secret_sauce')
      
      // Verificar que hay productos visibles
      inventoryPage.getInventoryItems().should('have.length', 6)
    })

  })

  // ============================================================
  // CASOS NEGATIVOS — Manejo de errores
  // ============================================================
  
  context('Sad Path — Login fallido', () => {

    it('Debería mostrar error con usuario incorrecto', () => {
      loginPage.login('usuario_falso', 'secret_sauce')
      
      loginPage.verifyErrorMessage(
        'Username and password do not match any user in this service'
      )
    })

    it('Debería mostrar error con contraseña incorrecta', () => {
      loginPage.login('standard_user', 'contraseña_incorrecta')
      
      loginPage.verifyErrorMessage(
        'Username and password do not match any user in this service'
      )
    })

    it('Debería mostrar error cuando los campos están vacíos', () => {
      // Hacer click en login sin llenar campos
      loginPage.clickLoginButton()
      
      loginPage.verifyErrorMessage('Username is required')
    })

    it('Debería mostrar error con usuario bloqueado', () => {
      // SauceDemo tiene un usuario especial bloqueado para practicar este caso
      loginPage.login('locked_out_user', 'secret_sauce')
      
      loginPage.verifyErrorMessage(
        'Sorry, this user has been locked out'
      )
    })

  })

})

describe('Login con Fixtures', () => {

  it('Debería hacer login con datos del fixture', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.validUser.username, users.validUser.password)
      inventoryPage.verifyPageIsLoaded()
    })
  })

})