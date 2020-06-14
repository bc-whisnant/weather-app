/* eslint-disable */

describe('Form will not submit if empty', () => {
  it ('will not submit form without value', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy=search-btn').click()
    cy.get('.error--text')
      .find('.v-messages__message')
      .then(error => {
        const errorCount = Cypress.$(error).length;
        expect(error).to.have.length(errorCount);
      })
  })
})
