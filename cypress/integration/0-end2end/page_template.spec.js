// Test scenario ID TS_US24, includes test cases TS_US24_001-004: check for correct display of page main components

const { should } = require("chai");

// read in test data
const userLoginName = 'testacc';
const userPassword = 'test';
const userRealName = 'Testaccount';
const userMatrikel = '213213';
const userEmail = 'test@hotmail.de';
const userStudy = 'BWL';
const userReviews = '13';
const userEmailInProfileSet = false;
const userDB = 'AISeL';
const userRefmgmt = 'Citavi, Endnote';
const userAnalysis = 'MAYQDA';
const userImgSet = false;

describe('Template', () => {
    // Must log in first!
    beforeEach(() => {
        cy.visit('/');
        cy.get('#zugangskennung').type(userLoginName);
        cy.get('#password').type(userPassword);
        cy.get('.btn').first().click();
        cy.wait(1000);
    })

    /*Test cases written separately. It may be easier to simply chain everything together, but that makes it more difficult to see exactly
    which parts are there and which aren't (traceability/maintainability).*/

  
    it('shows the main components of the main page: displaying projects, to dos, calendar, navbar - TS_US24_001', () => {
        cy.contains('Meine Projekte').should('be.visible');
        cy.get('#kalender').should('be.visible');
        cy.get('#todoList').should('be.visible');
        cy.get('nav').should('be.visible');
        cy.get('.navbar-nav').eq(4).click(); // necessary because otherwise the other tests will fail (still logged in)

    });

    it('shows all elements of the navbar for the main page: home button, profile, settings, search bar - TS_US24_002a', () => {
        // check for tool name
        cy.get('.navbar-brand').should('be.visible');
        cy.get('.navbar-brand').should('contain', 'eCLR Tool');

        // check for working home button
        cy.get('.navbar-nav').eq(0).should('be.visible');
        cy.get('.navbar-nav').eq(0).get('a').invoke('attr', 'href').should('contain', '/');
        cy.get('.navbar-nav').eq(0).click();
        cy.url().should('eq', 'http://localhost:8080/projectlist'); // careful - this only works if you're running the server on port 8080!

        // check for working profile button
        cy.get('.navbar-nav').eq(1).should('be.visible');
        cy.get('.navbar-nav').eq(1).should('contain', 'Profil');
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('eq', 'http://localhost:8080/profil');
        cy.get('.navbar-nav').eq(0).click(); // go back to main page

        // check for working settings button
        cy.get('.navbar-nav').eq(2).should('be.visible');
        cy.get('.navbar-nav').eq(2).should('contain', 'Einstellungen');
        cy.get('.navbar-nav').eq(2).click();
        cy.url().should('eq', 'http://localhost:8080/einstellungen');
        cy.get('.navbar-nav').eq(0).click(); // go back to main page

        // check for search bar
        cy.get('.navbar-nav').get('.form-control').should('be.visible');
        cy.get('.navbar-nav').get('.form-control').invoke('attr', 'type').should('eq', 'search');

        // logout
        cy.get('.navbar-nav').eq(4).click();
    });

    it('shows all elements of the navbar for project-internal pages: home button, profile, settings, logout button, dashboard, project description, project forum, group management, search - TS_US24_002a', () => {
        cy.get('.mainContent.m-0.p-0.col').contains('Dashboard').first().click(); // go to a project dashboard to access project-internal pages
        cy.get('nav').scrollIntoView(); // in case screen is too small
        
        // check for tool name
        cy.get('.navbar-brand').should('be.visible');
        cy.get('.navbar-brand').should('contain', 'eCLR Tool');

        // check for working home button
        cy.get('.navbar-nav').eq(0).should('be.visible');
        cy.get('.navbar-nav').eq(0).get('a').invoke('attr', 'href').should('contain', '/');
        cy.get('.navbar-nav').eq(0).click();
        cy.url().should('eq', 'http://localhost:8080/projectlist'); // careful - this only works if you're running the server on port 8080!#
        cy.get('.mainContent.m-0.p-0.col').contains('Dashboard').first().click(); // back to project-internal pages
        cy.get('nav').scrollIntoView();

        // check for working dashboard button
        cy.get('.navbar-nav').eq(1).should('be.visible');
        cy.get('.navbar-nav').eq(1).should('contain', 'Dashboard');
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('contain', 'http://localhost:8080/home/');
        cy.get('nav').scrollIntoView();

        // check for working project description button
        cy.get('.navbar-nav').eq(2).should('be.visible');
        cy.get('.navbar-nav').eq(2).should('contain', 'Projektbeschreibung');
        cy.get('.navbar-nav').eq(2).click();
        cy.url().should('contain', 'http://localhost:8080/projectDescription/');
        cy.get('nav').scrollIntoView();

        // check for working project forum button
        cy.get('.navbar-nav').eq(3).should('be.visible');
        cy.get('.navbar-nav').eq(3).should('contain', 'Projektforum');
        cy.get('.navbar-nav').eq(3).click();
        cy.url().should('eq', 'http://localhost:8080/forum');
        cy.get('nav').scrollIntoView();

        // check for working group management button
        cy.get('.navbar-nav').eq(4).should('be.visible');
        cy.get('.navbar-nav').eq(4).should('contain', 'Gruppenmanagement');
        cy.get('.navbar-nav').eq(4).click();
        cy.url().should('eq', 'http://localhost:8080/groupmanagement');
        cy.get('nav').scrollIntoView();
        
        // check for working profile button
        cy.get('.navbar-nav').eq(5).should('be.visible');
        cy.get('.navbar-nav').eq(5).should('contain', 'Profil');
        cy.get('.navbar-nav').eq(5).click();
        cy.url().should('eq', 'http://localhost:8080/profil');
        cy.get('nav').scrollIntoView();

        // check for working settings button
        cy.get('.navbar-nav').eq(6).should('be.visible');
        cy.get('.navbar-nav').eq(6).should('contain', 'Einstellungen');
        cy.get('.navbar-nav').eq(6).click();
        cy.url().should('eq', 'http://localhost:8080/einstellungen');
        cy.get('nav').scrollIntoView();

        // check for search bar
        cy.get('.navbar-nav').get('.form-control').should('be.visible');
        cy.get('.navbar-nav').get('.form-control').invoke('attr', 'type').should('eq', 'search');
        cy.get('nav').scrollIntoView();

        // logout
        cy.get('.navbar-nav').eq(8).click();
    });

    // only for students! teachers have a different profile structure and data
    it('correctly displays the profile of a student: image, name, study program, #litrevs, databases&search engines, reference mgmt tools, analysis tools - TS_US24_003', () => {
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('eq', 'http://localhost:8080/profil'); // remove later, just for testing purposes

        cy.get('img').should('be.visible'); // profile img visible

        cy.get('.row').eq(1).should('be.visible'); // name row
        cy.get('.row').eq(1).get('.col').eq(0).should('contain', 'Name');
        cy.get('.row').eq(1).get('.col').eq(1).should('eq', userRealName);

        if (userEmailInProfileSet) {
            cy.get('.row').eq(2).should('be.visible'); // email row
            cy.get('.row').eq(2).get('.col').eq(0).should('contain', 'E-Mail');
            cy.get('.row').eq(2).get('.col').eq(1).should('eq', userEmail);
        } else {
            cy.get('.row').eq(2).get('.col').eq(2).should('be.empty'); // or: should(not.exist)
        }

        cy.get('.row').eq(3).should('be.visible'); // study program row
        cy.get('.row').eq(3).get('.col').eq(0).should('contain', 'Studiengang');
        cy.get('.row').eq(3).get('.col').eq(1).should('eq', userStudy);

        cy.get('.row').eq(4).should('be.visible'); // #litrev row
        cy.get('.row').eq(4).get('.col').eq(0).should('contain', 'Durchgeführte Literaturreviews');
        cy.get('.row').eq(4).get('.col').eq(1).should('eq', userReviews);

        cy.get('.row').eq(6).should('be.visible'); // database row
        cy.get('.row').eq(6).get('.col').eq(0).should('contain', 'Datenbanken');
        cy.get('.row').eq(6).get('.col').eq(1).should('eq', userDB);

        cy.get('.row').eq(7).should('be.visible'); // refmgmt tools row
        cy.get('.row').eq(7).get('.col').eq(0).should('contain', 'Referenzmanagement-Tools');
        cy.get('.row').eq(7).get('.col').eq(1).should('eq', userRefmgmt);

        cy.get('.row').eq(8).should('be.visible'); // analysis tool row
        cy.get('.row').eq(8).get('.col').eq(0).should('contain', 'Analysetools');
        cy.get('.row').eq(8).get('.col').eq(1).should('eq', userAnalysis);

    });

    // only for students! teachers have a different profile structure and data
    it('correctly displays the settings: image upload, pishape upload, fixed name, fixed email, fixed number, input for study program, #litrevs, databases&search engines, reference mgmt tools, analysis tools  - TS_US24_003', () => {
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('eq', 'http://localhost:8080/einstellungen'); // remove later, just for testing purposes
        cy.should('contain', 'Persönliche Daten');

        // check whether name, id number and email are indeed not input fields
        cy.find('td').not('input').should('eq', '[' + userRealName + ',' + userMatrikel + ',' + userEmail + ']'); // TODO check syntax once login stops throwing uncaught exception!!
        
        cy.get('tr').eq(0).get('th').should('eq', 'Name'); // name row
        cy.get('tr').eq(0).get('td').should('eq', userRealName);

        cy.get('tr').eq(1).get('th').should('eq', 'Matrikelnummer'); // matr number row
        cy.get('tr').eq(1).get('td').should('eq', userMatrikel);

        cy.get('tr').eq(2).get('th').should('eq', 'E-Mail'); // email row
        cy.get('tr').eq(2).get('td').should('eq', userEmail);

        cy.get('tr').eq(3).get('th').should('eq', 'Studiengang'); // study program row
        cy.get('tr').eq(3).get('td').children('input').should('have.value', userStudy);

        cy.get('tr').eq(4).get('th').should('eq', 'Durchgeführte Literaturreviews'); // #litrev row
        cy.get('tr').eq(4).get('td').children('input').should('have.value', userReviews);
        
        cy.get('tr').eq(5).get('th').should('eq', 'E-Mail im Profil anzeigen?'); // email in profile checkbox row
        cy.get('tr').eq(5).get('td').children('have.class', 'custom-control.custom-checkbox').should('exist');
        cy.get('tr').eq(5).get('td').children('input').should('have.value', userEmailInProfileSet);

        cy.get('tr').eq(6).get('th').should('eq', 'Datenbanken & Suchmaschinen'); // database row
        cy.get('tr').eq(6).get('td').children('input').should('have.value', userDB);

        cy.get('tr').eq(7).get('th').should('eq', 'Referenzmanagement-Tools'); // refmgmt tools row
        cy.get('tr').eq(7).get('td').children('input').should('have.value', userRefmgmt);

        cy.get('tr').eq(8).get('th').should('eq', 'Analysetools'); // analysis tool row
        cy.get('tr').eq(8).get('td').children('input').should('have.value', userAnalysis);

        cy.get('tr').eq(9).get('th').should('eq', 'Profilbild');
        cy.get('tr').eq(9).get('td').children('button').should('be.visible');
        cy.get('tr').eq(9).get('td').children('button').should('contain', 'Upload!');
        if (userImgSet) {
            // TODO check whether picture-preview loads actual data
        }

        // check button visibility
        cy.get('.row buttons').get('.btn.btn-secondary').eq(0).should('be.visible');
        cy.get('.row buttons').get('.btn.btn-secondary').eq(0).should('contain', 'Anderungen speichern')

        // TODO right now button 0 is 'Profil erstellen', which is not needed anymore!

    });

});