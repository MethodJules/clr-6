// Test scenario ID TS_US24, includes test cases TS_US24_001-004: check for correct display of page main components
describe('Template', () => {
    // Must log in first!
    beforeEach(() => {
        cy.visit('/');
        cy.get('#zugangsKennung').type('testacc');
        cy.get('#password').type('test');
        cy.get('.btn').first().click();
        cy.wait(1000);
    })

    /*Test cases written separately. It may be easier to simply chain everything together, but that makes it more difficult to see exactly
    which parts are there and which aren't (traceability/maintainability).*/

    /* commented for testing purposes
    it('shows the main components of the main page: displaying projects, to dos, calendar, navbar - TS_US24_001', () => {
        cy.contains('Meine Projekte').should('be.visible');
        cy.get('#kalender').should('be.visible');
        cy.get('#todoList').should('be.visible');
        cy.get('nav').should('be.visible');
        cy.get('.navbar-nav').eq(4).click(); // necessary because otherwise the other tests will fail (still logged in)

    }); */

    /* commented for testing purposes
    it('shows all elements of the navbar for the main page: home button, profile, settings, search bar - TS_US24_002a', () => {
        // check for tool name
        cy.get('.navbar-brand').should('be.visible');
        cy.get('.navbar-brand').should('contain', 'eCLR Tool');

        // check for working home button
        cy.get('.navbar-nav').eq(0).should('be.visible');
        cy.get('.navbar-nav').eq(0).get('a').invoke('attr', 'href').should('contain', '/');
        cy.get('.navbar-nav').eq(0).click();
        cy.url().should('eq', 'http://localhost:8080/'); // careful - this only works if you're running the server on port 8080!

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
    }); */

    /* commented for testing purposes
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
        cy.url().should('eq', 'http://localhost:8080/'); // careful - this only works if you're running the server on port 8080!#
        cy.get('.mainContent.m-0.p-0.col').contains('Dashboard').first().click(); // back to project-internal pages
        cy.get('nav').scrollIntoView();

        // check for working dashboard button
        cy.get('.navbar-nav').eq(1).should('be.visible');
        cy.get('.navbar-nav').eq(1).should('contain', 'Dashboard');
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('eq', 'http://localhost:8080/home');
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
    }); */

    // only for students! teachers have a different profile structure and data
    it('correctly displays the profile of a student: image, name, study program, #litrevs, databases&search engines, reference mgmt tools, analysis tools - TS_US24_003', () => {
        cy.get('.navbar-nav').eq(1).click();
        cy.url().should('eq', 'http://localhost:8080/profil'); // remove later, just for testing purposes

        cy.get('img').should('be.visible'); // profile img visible

        cy.get('.row').eq(1).should('be.visible'); // name row
        cy.get('.row').eq(1).get('.col').eq(0).should('contain', 'Name');
        cy.get('.row').eq(1).get('.col').eq(1).expect($el).not.to.be.empty;

        cy.get('.row').eq(2).should('be.visible'); // email row
        cy.get('.row').eq(2).get('.col').eq(0).should('contain', 'E-Mail');
        cy.get('.row').eq(2).get('.col').eq(1).expect($el).not.to.be.empty;

        cy.get('.row').eq(3).should('be.visible'); // study program row
        cy.get('.row').eq(3).get('.col').eq(0).should('contain', 'Studiengang');
        cy.get('.row').eq(3).get('.col').eq(1).expect($el).not.to.be.empty;

        cy.get('.row').eq(4).should('be.visible'); // #litrev row
        cy.get('.row').eq(4).get('.col').eq(0).should('contain', 'Durchgeführte Literaturreviews');
        cy.get('.row').eq(4).get('.col').eq(1).expect($el).not.to.be.empty; // obviously, only if the student has already put down their profile info
        cy.get('.row').eq(4).get('.col').eq(1).invoke('text').should('match', /^[0-9]*$/); // value must be number

        cy.get('.row').eq(5).should('be.visible'); // I know the following... row
        cy.get('.row').eq(5).get('.col').eq(0).should('contain', 'Ich kenne mich mit den folgenden... aus:');
        cy.get('.row').eq(5).get('.col').eq(1).should('not.exist');

        cy.get('.row').eq(6).should('be.visible'); // database row
        cy.get('.row').eq(6).get('.col').eq(0).should('contain', 'Datenbanken');
        cy.get('.row').eq(6).get('.col').eq(1).expect($el).not.to.be.empty; // only for testacc, because other students may not have worked with any database or tool yet!

        cy.get('.row').eq(7).should('be.visible'); // refmgmt tools row
        cy.get('.row').eq(7).get('.col').eq(0).should('contain', 'Referenzmanagement-Tools');
        cy.get('.row').eq(7).get('.col').eq(1).expect($el).not.to.be.empty;
        
        cy.get('.row').eq(8).should('be.visible'); // analysis tool row
        cy.get('.row').eq(8).get('.col').eq(0).should('contain', 'Analysetools');
        cy.get('.row').eq(8).get('.col').eq(1).expect($el).not.to.be.empty;

    });

    it('correctly displays the settings: image upload, pishape upload, fixed name, fixed email, fixed number, input for study program, #litrevs, databases&search engines, reference mgmt tools, analysis tools  - TS_US24_003', () => {

    });

});