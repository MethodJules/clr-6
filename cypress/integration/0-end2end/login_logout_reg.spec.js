// Test scenario ID TS_US1_REG, includes test cases TS_US1_004-005: login and logout

// read in test data
const userLoginName = 'testacc';
const userPassword = 'test';

describe('Start page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('loads the tabs for login and registration correctly', () => {
        cy.get('.nav.nav-tabs').contains('Login').should('be.visible');
        cy.get('.nav.nav-tabs').contains('Registrierung').should('be.visible');
    });
});


describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // TODO I think greeting should be implemented already?
    it('allows a registered user to log in and access their internal start page - TS_US1_004', () => {
        cy.get('#zugangskennung').type(userLoginName);
        cy.get('#password').type(userPassword);
        cy.get('.btn').first().click().then(() => {
            cy.wait(1000);
            cy.contains('Meine Projekte').should('exist');
            // cy.contains('greeting');
        });
    });

    /* TODO
    it('does not allow a non-registered user to login - TS_US1_00x', () => {
        cy.get('.nav.nav-tabs').contains('Login').click().then(() => {
            cy.get('#zugangsKennung').type(userLoginName);
            cy.get('#password').type(userPassword);
            cy.get('.btn').first().click().then(() => {
                cy.contains('Meine Projekte');
                // cy.contains('greeting');
            });
        });
    }); */
});

describe('Logout', () => {
    it('allows a logged in user to log out and receive a logout message - TS_US1_005', () => {
        cy.get('.navbar-nav').eq(4).click().then(() => {
            cy.wait(1000);
            cy.contains('Bis zum nächsten Mal' + userLoginName).should('exist');
        });
    });
});