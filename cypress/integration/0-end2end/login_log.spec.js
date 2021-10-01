// Test scenario ID TS_US1_LOG, includes test cases TS_US1_004-004: login of an existing user

describe('Login', () => {
    beforeEach(() => {
        cy.wait(1000); // this is necessary in case the server is slow; otherwise logout won't work properly
        cy.visit('/');
    });

    // TODO I think greeting should be implemented already?
    it('allows a registered user, using correct account name and password, to log in and access their internal start page - TS_US1_001', () => {
        cy.get('#zugangsKennung').type('testacc');
        cy.get('#password').type('test');
        cy.get('.btn').first().click().then(() => {
            cy.wait(1000);
            cy.contains('Meine Projekte').should('exist');
            // cy.contains('greeting');
        });
        cy.get('.navbar-nav').eq(4).click(); // necessary because otherwise the other tests will fail (still logged in)
    });

    
    // TODO a popup for informing a user of a non-successful login would be nice
    it('does not allow a registered user, using correct account name and incorrect password, to log in and access their internal start page - TS_US1_002', () => {
        cy.get('#zugangsKennung').type('testacc');
        cy.get('#password').type('falsch');
        cy.get('.btn').first().click().then(() => {
            cy.wait(1000);
            cy.contains('Meine Projekte').should('not.exist');
        });
    });

    it('does not allow a registered user, using incorrect account name and correct password, to log in and access their internal start page - TS_US1_003', () => {
        cy.get('#zugangsKennung').type('falsch');
        cy.get('#password').type('test');
        cy.get('.btn').first().click().then(() => {
            cy.wait(1000);
            cy.contains('Meine Projekte').should('not.exist');
        });
    });

    it('does not allow a registered user, using incorrect account name and incorrect password, to log in and access their internal start page - TS_US1_004', () => {
        cy.get('#zugangsKennung').type('falsch');
        cy.get('#password').type('falsch');
        cy.get('.btn').first().click().then(() => {
            cy.wait(1000);
            cy.contains('Meine Projekte').should('not.exist');
        });
    });
});