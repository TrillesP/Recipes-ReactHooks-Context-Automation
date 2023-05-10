/// <reference types="cypress" />

describe('Meals and Drinks pages test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="email-input"]').type('good@email.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-btn"]').click()
  })

  it('tests loading of elements in page', () => {
    cy.get('[data-testid="0-card-img"]').click()
    cy.get('[data-testid="favorite-btn"]').should('have.attr', 'src').and('have.','star-unselected')
    cy.get('[data-testid="favorite-btn"]').click()
    cy.get('[data-testid="favorite-btn"]').should('have.attr', 'src').and('include','star-selected')
  })

  it('cy.wait() - wait for a specific route', () => {
    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()

    // wait for GET comments/1
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
  })
})
