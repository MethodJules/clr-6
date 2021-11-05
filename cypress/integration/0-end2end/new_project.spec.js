// Test scenario ID TS_US2, includes user stories US 2, US 20, US 21, US 48, incluses test cases TS_US1_001-004: creation of a new project with

const { describe } = require("mocha");

// read in test data
const userLoginName = 'testacc';
const userPassword = 'test';
const titleCorrect = 'Titel';
const titleIncorrect1 = 'T';
const titleIncorrect2 = '';
const lecturerNumber = 1;
const partnersCorrect = 'Max Müller, Lisa Lindner';
const partnersIncorrect1 = 'Max Müller Lisa Lindner';
const partnersIncorrect2 = '';
const tagsCorrect = 'eins, zwei, drei';
const tagsIncorrect1 = 'eins zwei drei';
const tagsIncorrect2 = '';
const descriptionCorrect = 'Dies ist eine Beschreibung';
const descriptionIncorrect1 = 'a';
const descriptionIncorrect2 = '';

describe ('newProject', () =>  {
    // Log in first
    cy.visit('/');
    cy.get('#zugangskennung').type(userLoginName);
    cy.get('#password').type(userPassword);
    cy.get('.btn').first().click();

    it('allows a student to create a new project and gives hints regarding incorrect inputs - TS_US_001', () => {
        cy.get('.projektAnlegen').get('button').click();

        // first, test incorrect but filled inputs and subsequent hints
        cy.get('table').get('tr').eq(1).get('#title').type(titleIncorrect1); // incorrect title - title too short
        // no lecturer selection
        cy.get('table').get('tr').eq(5).get('#title').type(partnersIncorrect1); // incorrect partners - no comma separation
        cy.get('table').get('tr').eq(7).get('input').type(tagsIncorrect1); // incorrect tags - no comma separation
        cy.get('table').get('tr').eq(7).get('input').type(descriptionIncorrect1); // incorrect description - description too short
        cy.get('.btn.btn-primary').contains('OK').click();
        cy.wait(1000);
        // TODO check for hints
        // TODO leave modal
        cy.get('.mainContent.m-0.p-0.col').contains(titleIncorrect1).should('not.exist'); // project mustn't be created!

        // second, test empty inputs and subsequent hints
        cy.get('table').get('tr').eq(1).get('#title').type(titleIncorrect2); // incorrect title - title too short
        // no lecturer selection
        cy.get('table').get('tr').eq(5).get('#title').type(partnersIncorrect2); // incorrect partners - no comma separation
        cy.get('table').get('tr').eq(7).get('input').type(tagsIncorrect2); // incorrect tags - no comma separation
        cy.get('table').get('tr').eq(7).get('input').type(descriptionIncorrect2); // incorrect description - description too short
        cy.get('.btn.btn-primary').contains('OK').click();
        cy.wait(1000);
        // TODO check for hints
        // TODO leave modal
        cy.get('.mainContent.m-0.p-0.col').contains(titleIncorrect2).should('not.exist'); // project mustn't be created!


        // finally, test correct inputs and successful project creation
        cy.get('table').get('tr').eq(1).get('#title').type(titleCorrect);
        for (let i = 0; i < lecturerNumber; i++) {
            cy.get('table').get('tr').eq(3).get('select').eq(i).get('option').eq(i).click();
            if (i < lecturerNumber-1) {
                cy.get('table').get('tr').eq(3).get('button').click();
            }
        }
        cy.get('table').get('tr').eq(5).get('#title').type(partnersCorrect);
        cy.get('table').get('tr').eq(7).get('input').type(tagsCorrect);
        cy.get('table').get('tr').eq(7).get('input').type(descriptionCorrect);
        cy.get('.btn.btn-primary').contains('OK').click();
        cy.wait(1000);
        // TODO check for hints
        // TODO leave modal
        cy.get('.mainContent.m-0.p-0.col').contains(titleCorrect).should('exist'); // project must have been created!
    });
});

describe('correctStructure', () => {
    
    it('when a new project has been successfully created, the standard phase template is automatically created along with it - TS_US_002', () => {
        // TODO
    });

    it('when a new project has been successfully created, the standard reflexion template (per phase) is automatically created along with it and can be accessed - TS_US_003-004', () => {
        // TODO
    });
});