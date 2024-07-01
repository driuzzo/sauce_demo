import chaiColors from 'chai-colors'
chai.use(chaiColors)

import { faker } from '@faker-js/faker';

const viewports = [
    { width: 320, height: 480 },
    { width: 640, height: 960 },
    { width: 750, height: 1334 },
    { width: 1080, height: 1920 },
    { width: 1440, height: 2560 },
    { width: 1125, height: 2436 },
  ];

describe('flow scenarios', () => {
    
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    viewports.forEach((viewport) => {
    context(`viewport ${viewport.width} x ${viewport.height}`, () => {

        it('puts an item into cart and then removes it', () => {
            cy.viewport(viewport.width, viewport.height);

            const product = 'Sauce Labs Backpack'
                        
            cy.get('#header_container').contains('Products')

            cy.get('.inventory_list').children()
                .should('have.length', 6)

            cy.get('.shopping_cart_badge').should('not.exist')

            cy.get(`.inventory_item_name:contains(${product})`).parents('.inventory_item').then(($productObject) => {
                const productObject = $productObject
                cy.wrap(productObject).as('productObject')
            })

            cy.get('@productObject').find('.inventory_item_name').then(($productName) => {
                expect($productName).to.have.text(product)
            })        
            
            cy.get('@productObject').contains('Add to cart').click()

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('contain.text','1')

            cy.get('@productObject')
                .contains('Remove')
                .click()
            
            cy.get('.shopping_cart_badge').should('not.exist')
        })

        it('orders a product', () => {
            cy.viewport(viewport.width, viewport.height);

            const product = 'Test.allTheThings() T-Shirt (Red)'

            const productWithDashes = product.replace(/\s+/g, '-').toLowerCase()

            cy.get(`.inventory_item_name:contains(${product})`).parents('.inventory_item').then(($productObject) => {
                const productObject = $productObject
                cy.wrap(productObject).as('productObject')
            })
            
            cy.get('@productObject').find('.inventory_item_name').then(($el) => {
                const productTitle = $el.text()
                cy.wrap($el).click()        

                cy.get('.inventory_details_price').then(($el) => {
                    const price = $el.text()
                    cy.wrap(price)

                    cy.contains('Add to cart').click().then(() => {
                        cy.getByData('remove')
                        .scrollIntoView()
                        .should('be.visible')
                        .and('contain.text', 'Remove')
                    })                    

                    cy.get('.shopping_cart_badge')
                        .should('be.visible')
                        .and('contain.text','1')
                        .click()

                    cy.get('.cart_item_label').find('.inventory_item_name')
                        .should('contain.text', productTitle)
                        
                    cy.get('.inventory_item_price').should('contain.text', price)

                    cy.get('.cart_quantity').should('contain', '1')

                    cy.get('#continue-shopping').should('be.visible')

                    cy.get('#checkout').then($el => $el.css('background-color')).should('be.colored', '#3ddc91')
                    cy.get('#checkout').click()

                    cy.getByData('firstName').type(faker.name.firstName())

                    cy.getByData('lastName').type(faker.name.lastName())

                    cy.getByData('postalCode').type(faker.address.zipCode())

                    cy.get('#continue').should('be.visible').click()

                    cy.location('pathname').should('eq', '/checkout-step-two.html')

                    cy.get('.title').should('contain', 'Checkout: Overview')

                    cy.get('.cart_quantity').should('contain', '1')

                    cy.get('.inventory_item_name').should('contain', productTitle)

                    cy.get('.inventory_item_price').should('contain', price)

                    cy.get('.summary_subtotal_label').then(($el) => {
                        let itemTotal = $el.text().slice(12, 18)
                        cy.wrap(itemTotal).should('contain', price)
                        itemTotal = $el.text().slice(13, 18)
                        itemTotal = parseFloat(itemTotal)

                    cy.get('.summary_tax_label').then(($el) => {
                        let tax = $el.text().slice(6, 11)
                        tax = parseFloat(tax)
                        cy.wrap(tax)

                        cy.getByData('total-label').then(($el) => {
                            let getTotal = $el.text().slice(8, 13)
                            let total = itemTotal + tax
                            total = total.toFixed(2).toString()
                            cy.wrap(getTotal).should('eq', total)
                        })

                        cy.getByData('finish').should('be.visible').click()

                        cy.get('h2').should('contain','Thank you for your order!')
                        })
                    })
                })
            })
        })

        it('asserts listing sort', () => {
            cy.viewport(viewport.width, viewport.height);
            let productsList = []
            let productsListSorted = []
            cy.get('#header_container').contains('Products')

            cy.get('.inventory_list').children()
                .should('have.length', 6)

            cy.get('.select_container').find('.active_option').should('have.text', 'Name (A to Z)')

            cy.get('.inventory_item_name').each($item => {
                productsList.push($item.text())
                productsListSorted.push($item.text())
                })
                .then(() => {
                    expect(productsList).to.deep.equal(productsListSorted.sort())
                })
            })
        })
    })
})