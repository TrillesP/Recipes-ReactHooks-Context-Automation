/// <reference types="cypress" />

describe('Login page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('verifying e-mail and password validations, login button functionality', () => {
    cy.get('[data-testid="email-input"]').type('bad_email')
    cy.get('[data-testid="password-input"]').type('1234')
    cy.get('[data-testid="login-btn"]').should('be.disabled')
    cy.get('[data-testid="password-input"]').type('56')
    cy.get('[data-testid="login-btn"]').should('be.disabled')
    cy.get('[data-testid="email-input"]').clear()
    cy.get('[data-testid="password-input"]').clear()
    cy.get('[data-testid="email-input"]').type('good@email.com')
    cy.get('[data-testid="password-input"]').type('1234')
    cy.get('[data-testid="login-btn"]').should('be.disabled')
    cy.get('[data-testid="password-input"]').type('56')
    cy.get('[data-testid="login-btn"]').should('be.enabled')

    cy.get('[data-testid="login-btn"]').click()

    cy.contains('Meals').should('exist')
    cy.get('[data-testid="profile-btn"]').click()

    cy.contains('good@email.com').should('exist')
  })
});