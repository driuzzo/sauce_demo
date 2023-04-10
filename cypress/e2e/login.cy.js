describe('login scenarios', () => {

    const loginFailMessage = 'Epic sadface: Username and password do not match any user in this service'
    const usernameRequiredMessage = 'Epic sadface: Username is required'
    const passwordRequiredMessage = 'Epic sadface: Password is required'
    const lockedOutUserMessage = 'Epic sadface: Sorry, this user has been locked out.'

    beforeEach(() => {
      cy.visit('/')
    })

    it('should login successfully', () => {
  
      cy.login('standard_user', 'secret_sauce')
  
      cy.textAssertionOfElement('.title', 'Products')
  
      cy.get('.inventory_list')
        .find('.inventory_item')
        .should('have.length', 6)
    })

    it('should fail login with wrong username', () => {
      
      cy.login('test', 'secret_sauce')

      cy.getByData('error')
        .should('be.visible')
        .and('have.text', loginFailMessage)
    })

    it('should fail login with wrong password', () => {
      
      cy.login('standard_user', 'test')

      cy.getByData('error')
        .should('be.visible')
        .and('have.text', loginFailMessage)
    })

    it('should require username', () => {

      cy.get('#password')
        .type('secret_sauce')
  
      cy.get('#login-button')
        .should('be.visible')
        .click()

      cy.get('#user-name').then($el => $el.css('border-bottom-color'))
        .should('be.colored', '#E2231A')

      cy.getByData('error')
        .should('be.visible')
        .and('have.text', usernameRequiredMessage)
    })

    it('should require password', () => {

      cy.get('#user-name')
        .type('standard_user')
  
      cy.get('#login-button')
        .should('be.visible')
        .click()

      cy.get('#password').then($el => $el.css('border-bottom-color'))
        .should('be.colored', '#E2231A')

      cy.getByData('error')
        .should('be.visible')
        .and('have.text', passwordRequiredMessage)
  })

    it('should fail login to locked user', () => {
      cy.login('locked_out_user', 'secret_sauce')

      cy.getByData('error')
        .should('be.visible')
        .and('have.text', lockedOutUserMessage)
    })

    it('should logout successfully', () => {
  
      cy.login('standard_user', 'secret_sauce')

      cy.textAssertionOfElement('.title', 'Products')

      cy.get('#react-burger-menu-btn').click()

      cy.get('.bm-menu-wrap').should('be.visible')

      cy.get('#logout_sidebar_link').click()

      cy.location('pathname').should('eq', '/')

      cy.get('.login_logo').should('be.visible')

    })
})