
Cypress.Commands.add('userData', () => {
    
    cy.fixture('users.json').then((user) => {
        
        cy.get('#email').type(user.email)
        cy.get('#phone').type(user.phone)
        cy.get('#gender').select('male')
        cy.get('#prename').type(user.firstName)
        cy.get('#surname').type(user.surName)
        cy.get('#street').type(user.street)
        cy.get('#house_number').type(user.houseNo)
        cy.get('#plz').type(user.plz)
        cy.get('#city').type(user.city)
        cy.get('#country').type(user.country) 
        cy.get('#birthday').type(user.birthDate) 
        cy.get('.container > :nth-child(1) > :nth-child(2)').click()
        cy.get(':nth-child(4) > .form-group > .sc-TRNrF').click()
        cy.get('[data-testid="checkout-button"]').click()
    
    })

})
