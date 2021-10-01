// Test scenario ID TS_US1_REG, includes test cases TS_US1_001-003: Registration

// read in test data
const newUserLoginName = 'wirsing';
const newUserLoginSpecialName = 'wirßing';
const newUserPassword = '12345';
const newUserMatrikel = '123456';

describe('Registration', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Registrierung').click();
    });

    // TODO A feedback so the user knows registration was successful would be nice!
    it('allows a user to register a new account with correctly formatted sample data - TS_US1_001', () => {
        cy.get('#zugangskennung2').type(newUserLoginName);
        cy.get('#zugangskennung2').should('have.value', newUserLoginName);
        cy.get('#password2').type(newUserPassword);
        cy.get('#password2').should('have.value', newUserPassword);
        cy.get('#matrikelnummer').type(newUserMatrikel);
        cy.get('#matrikelnummer').should('have.value', newUserMatrikel);
        cy.get('#zugangskennung2\.form-control\.valid').should('exist');
        cy.get('#password2\.form-control\.valid').should('exist');
        cy.get('#matrikelnummer\.form-control\.valid').should('exist');
        cy.contains('Registrieren').click();
    });

    // TODO A feedback so the user knows registration was successful would be nice!
    it('allows a user to register a new account with correctly formatted sample data containing a special character - TS_US1_002', () => {
        cy.get('#zugangskennung2').type(newUserLoginSpecialName);
        cy.get('#zugangskennung2').should('have.value', newUserLoginSpecialName);
        cy.get('#password2').type(newUserPassword);
        cy.get('#password2').should('have.value', newUserPassword);
        cy.get('#matrikelnummer').type(newUserMatrikel);
        cy.get('#matrikelnummer').should('have.value', newUserMatrikel);
        cy.get('#zugangskennung2\.form-control\.error').should('exist');
        cy.get('#password2\.form-control\.valid').should('exist');
        cy.get('#matrikelnummer\.form-control\.valid').should('exist');
        cy.contains('Registrieren').click();
    });

    /*
    TODO SQL insert prevention should be tested, but not without checking with Julien first!
    it('should not allow a user to register with a username containing $ (SQL insert prevention) - TS_US1_003', () => {
        cy.get('#zugangskennung2').type('$delete$');
        cy.get('#zugangskennung2').should('have.value', '$delete$');
        cy.get('#password2').type(newUserPassword);
        cy.get('#password2').should('have.value', newUserPassword);
        cy.get('#matrikelnummer').type(newUserMatrikel);
        cy.get('#matrikelnummer').should('have.value', newUserMatrikel);
        cy.contains('Registrieren').click();
        // check for error message
    });
    */


});