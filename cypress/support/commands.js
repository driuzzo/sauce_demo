Cypress.Commands.add('login', (email, password) => {   
        cy.visit('/')
        cy.get('#user-name')
            .type(email)

        cy.get('#password')
            .type(password)

        cy.get('#login-button')
            .should('be.visible')
            .click()
})

Cypress.Commands.add('textAssertionOfElement', (element, text) => { 
    cy.get(element)
    .should('have.text', text)
})

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})
