import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import CMS from '../../page_objects/CMS';

Given('I log in using the default credentials', () => {
  // make sure any previous sessions are cleared
  cy.clearCookies();
  cy.clearLocalStorage();

  // get the default credentials from the .env file
  const username = Cypress.env('SS_DEFAULT_ADMIN_USERNAME');
  const password = Cypress.env('SS_DEFAULT_ADMIN_PASSWORD');

  // log in using the default credentials
  cy.visit('/admin');
  cy.get('[name="Email"]')
    .type(username);
  cy.get('[name="Password"]')
    .type(password);
  cy.get('[name="action_doLogin"]')
    .click();

  // wait for the CMS interface to load
  cy.url()
    .should('include', '/admin/pages', { timeout: 10000 });
});

Then('I should see the CMS interface is loaded', () => {
  cy.get(CMS.container)
    .should('be.visible');
  cy.get(CMS.site)
    .should('be.visible');
  cy.get(CMS.menu)
    .should('be.visible');
  cy.get(CMS.content)
    .should('be.visible');
});

Then('I should see the pages section', () => {
  cy.get(CMS.header)
    .contains('Pages')
    .should('be.visible');
});

Then('I should see pages', () => {
  cy.get(CMS.pages)
    .should('be.visible');
});

Then('I can visit each of the model admin pages', () => {
  // visit each of the model admin pages
  // checking the header is visible
  cy.get(CMS.admins)
    .each(($el, index, $list) => {
      // get values from the clicked link element
      const expectedUrl = $el.attr('href');
      const expectedTitle = $el.text().trim();

      // reselect the element, since the DOM has changed
      cy.get(CMS.admins).eq(index)
        .click();
      // wait for the admin to load
      cy.url()
        .should('include', expectedUrl, { timeout: 10000 });

      // check the content
      cy.get(CMS.container)
        .should('be.visible');
      cy.get(CMS.header)
        .should('be.visible', { timeout: 10000 })
        .should('contain', expectedTitle);
    });
});
