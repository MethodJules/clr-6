// Test scenario ID TS_US1_REG, includes test cases TS_US1_001-003: Registration

describe('Registration', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Registrierung').click();
    });

    // TODO A feedback so the user knows registration was successful would be nice!
    it('allows a user to register a new account with correctly formatted sample data - TS_US1_001', () => {
        cy.get('#zugangskennung2').type('wirsing');
        cy.get('#zugangskennung2').should('have.value', 'wirsing');
        cy.get('#password2').type('12345');
        cy.get('#password2').should('have.value', '12345');
        cy.get('#matrikelnummer').type('123456');
        cy.get('#matrikelnummer').should('have.value', '123456');
        cy.get('#zugangskennung2\.form-control\.valid').should('exist');
        cy.get('#password2\.form-control\.valid').should('exist');
        cy.get('#matrikelnummer\.form-control\.valid').should('exist');
        cy.contains('Registrieren').click();
    });

    // TODO A feedback so the user knows registration was successful would be nice!
    it('allows a user to register a new account with correctly formatted sample data containing a special character - TS_US1_002', () => {
        cy.get('#zugangskennung2').type('wirßing');
        cy.get('#zugangskennung2').should('have.value', 'wirßing');
        cy.get('#password2').type('12345');
        cy.get('#password2').should('have.value', '12345');
        cy.get('#matrikelnummer').type('123456');
        cy.get('#matrikelnummer').should('have.value', '123456');
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
        cy.get('#password2').type('12345');
        cy.get('#password2').should('have.value', '12345');
        cy.get('#matrikelnummer').type('123456');
        cy.get('#matrikelnummer').should('have.value', '123456');
        cy.contains('Registrieren').click();
    });
    */


});