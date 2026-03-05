import { loginPage } from '../../pages/LoginPage'
import { inventoryPage } from '../../pages/InventoryPage'

describe('Login parametrizado con todos los usuarios', () => {

  it('Debería verificar el comportamiento de cada usuario', () => {
    cy.fixture('users').then((users) => { 

        // Object.entries convierte el objeto JSON en un array iterable
      Object.entries(users).forEach(([key, user]: [string, any]) => {
        cy.log(`Probando login con usuario: ${key}`)
        loginPage.visit()
        loginPage.login(user.username, user.password)   
        // Verificar el resultado esperado para cada usuario
        if (key === 'validUser') {
          inventoryPage.verifyPageIsLoaded()
        } else if (key === 'lockedUser') {
          loginPage.verifyErrorMessage('Sorry, this user has been locked out')
        } else if (key === 'problemUser') {
          inventoryPage.verifyPageIsLoaded()
        } else if (key === 'invalidUser') {
          loginPage.verifyErrorMessage('Username and password do not match any user in this service')
        } else {
  // Caso no esperado — falla el test con un mensaje claro
  throw new Error(`User unknown in fixture: ${key}`)
}
    })
    })
  })

})

