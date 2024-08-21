import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I visit {string}", (url) => {
  cy.visit(url);
});

Given('I am on mobile', () => {
  cy.viewport('iphone-6');
});

Given('I am on tablet', () => {
  cy.viewport('ipad-2');
});

Given('I am on desktop', () => {
  cy.viewport('macbook-13');
});

Then('the title should be {string}', (title) => {
  cy.title().should('eq', title);
});
