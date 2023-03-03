describe('flow scenarios', () => {
    
    beforeEach(() => {
        cy.visit('/')
        cy.clearLocalStorage()
        cy.login('standard_user', 'secret_sauce')
    })

    it('puts an item into cart and then removes it', () => {
        cy.get('#header_container').contains('Products')

        cy.get('.shopping_cart_badge').should('not.exist')

        cy.get('.inventory_item').eq(0)
            .contains('Add to cart')
            .click()

        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('contain.text','1')

        cy.get('.inventory_item').eq(0)
            .contains('Remove')
            .click()
        
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it.only('access product page', () => {
        cy.contains('Sauce Labs Backpack').click()

        cy.get('.inventory_details_price')
            .should('contain.text', '29.99')

        cy.contains('Add to cart').click()

        cy.getByData('remove-sauce-labs-backpack')
            .should('be.visible')
            .and('contain.text', 'Remove')
    })
})