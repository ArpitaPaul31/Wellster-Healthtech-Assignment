
// Handling uncaught exception
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Checkout Page', () => {

    // Filling out the questionnaire
    beforeEach("Questionnaire", () => {

        // Handling external users.json file
        cy.fixture('users.json').then((data) => {
            cy.visit(data.url, { failOnStatusCode: false}) //to handle http error
            cy.wait(1000)
            cy.get('[data-testid="product-selection-continue-button"]')
                .should('be.visible')
                .click()
            
            // Populate user data
            cy.userData()

            cy.contains('Gutschein hinzufügen')
                .should('be.visible')
                .click()
        })
    })

    it('Checkout with VALID Coupon', () => {
        
        cy.fixture('users.json').then((data) => {
            // To use all valid coupons existing in the array
            for(let i = 0; i<data.validCoupons.length; i++){
                cy.get('[data-testid="coupon-code-input"]').type(data.validCoupons[i])

                cy.get('#button-addon2').click()
                
                // Assertion check for the expected text 
                cy.get('.wysiwyg').should('contain', "Der Gutschein wurde erfolgreich zu deiner Bestellung hinzugefügt.")

                cy.get(':nth-child(4) > div > .sc-hHLeRK').contains(data.validCoupons[i])

                // Remove applied coupon
                cy.get('[data-testid="remove-coupon-code"]').click()

                // Check the total amount after coupon removal
                cy.get(':nth-child(4) > div > .sc-hHLeRK').should('not.exist')

                cy.get('[data-testid="render-coupon-code-input"]').click()
            }

        })
        
    })

    it('Checkout with INVALID Coupon', () => {
        
        cy.fixture('users.json').then((data) => {

            // Do not apply coupon
            cy.get('[data-testid="coupon-code-input"]').type(data.invalidCoupons)

            cy.get('#button-addon2').click()
                
            // Assertion check for the expected text
            cy.get('.wysiwyg').contains(`Der Gutschein "${data.invalidCoupons}" konnte leider nicht zu deiner Bestellung hinzugefügt werden, da er ungültig ist.`)

            // Check the total amount
            cy.get(':nth-child(4) > div > .sc-hHLeRK').should('have.text', 'Gesamtsumme')

            cy.wait(2000)

        })
        
    })

    it('Checkout with Multiple Coupons', () => {
        
        cy.fixture('users.json').then((data) => {
        
            // Apply valid coupon multiple times
            cy.get('[data-testid="coupon-code-input"]').type(data.multCoupon)
        
            cy.get('#button-addon2').click()
                
            // Assertion check for the expected text
            cy.get('.wysiwyg').contains(`Der Gutschein "${data.multCoupon}" konnte leider nicht zu deiner Bestellung hinzugefügt werden, da er ungültig ist.`)

            // Check the total amount
            cy.get(':nth-child(4) > div > .sc-hHLeRK').should('have.text', 'Gesamtsumme')

            cy.wait(2000)

        })
        
    })
    
    it('Checkout with Empty Coupon', () => {
        
        cy.fixture('users.json').then((data) => {
            
            // Do not type any text in the coupon field
            cy.get('[data-testid="coupon-code-input"]').click()

            cy.get('#button-addon2').click()
                
            // Assertion check for the expected text
            cy.get('.wysiwyg').contains(`Der Gutschein "" konnte leider nicht zu deiner Bestellung hinzugefügt werden, da er ungültig ist.`)

            // Check the total amount
            cy.get(':nth-child(4) > div > .sc-hHLeRK').should('have.text', 'Gesamtsumme')

            cy.wait(2000)

        })
        
    })

})