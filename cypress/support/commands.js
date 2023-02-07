Cypress.Commands.add('login', (email, password) => { 
    cy.get('#user-name')
        .type(email)

    cy.get('#password')
        .type(password)
})

Cypress.Commands.add('textAssertionOfElement', (element, text) => { 
    cy.get(element)
    .should('have.text', text)
})
