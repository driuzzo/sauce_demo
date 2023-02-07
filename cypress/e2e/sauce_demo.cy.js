describe('sauce demo spec', () => {
  
  context('login', () => {

    const loginFailMessage = 'Epic sadface: Username and password do not match any user in this service'

    beforeEach(() => {
      cy.visit('/')
    })

    it('should login successfully', () => {
  
      cy.login('standard_user', 'secret_sauce')
  
      cy.get('#login-button')
        .should('be.visible')
        .click()
  
      cy.textAssertionOfElement('.title', 'Products')
  
      cy.get('.inventory_list')
        .find('.inventory_item')
        .should('have.length', 6)
    })

    it('should fail login with wrong username', () => {
      
      cy.login('test', 'secret_sauce')
  
      cy.get('#login-button')
        .should('be.visible')
        .click()

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('have.text', loginFailMessage)
    })

    it('should fail login with wrong password', () => {
      
      cy.login('standard_user', 'test')
  
      cy.get('#login-button')
        .should('be.visible')
        .click()

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('have.text', loginFailMessage)
    })
  })
})