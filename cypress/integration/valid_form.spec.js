/* eslint-disable */

describe('Form submits without errors', () => {
  it ('will  submit form with value', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy=weather-input]').find('input').type('Lenoir')
    cy.get('[data-cy=search-btn').click()
    cy.get('p').contains('the weather is described as')
    
  })
})
