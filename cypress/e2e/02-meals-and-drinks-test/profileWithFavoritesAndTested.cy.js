/// <reference types="cypress" />

describe('Meals and Drinks pages test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="email-input"]').type('good@email.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-btn"]').click()
    cy.get('[type="submit"][name="profile-btn"]').click()
  })

  it('tests logout button', () => {
    cy.get('[data-testid="profile-logout-btn"]').click()
    cy.get('[data-testid="email-input"]').should('exist').and('have.text', "")
    cy.get('[data-testid="password-input"]').should('exist').and('have.text', "")
    cy.get('[data-testid="login-btn"]').should('exist').and('be.disabled')
  })

  it('adds recipes to favorites and checks if they show in profile page', () => {
    cy.get('[data-testid="meals-bottom-btn"]').click()

    cy.contains('Beef').click()
    cy.get('[data-testid="0-card-name"]').should('have.text', "Beef and Mustard Pie")
    cy.get('[data-testid="0-card-name"]').click()

    cy.get('[data-testid="recipe-title"]').should('have.text', "Beef and Mustard Pie")
    cy.get('[data-testid="favorite-btn"]').click()

    cy.get('[data-testid="search-btn-img"]').click()
    cy.get('[data-testid="name-search-radio"]').click()
    cy.get('[data-testid="search-input"]').type('salmon{enter}')
    cy.get('h3').should('contain.text', 'salmon')
    cy.get('[data-testid="0-card-name"]').click()

    cy.get('[data-testid="recipe-title"]').should('contain.text', "Salmon")
    cy.get('[data-testid="favorite-btn"]').click()

    cy.get('[data-testid="profile-btn"]').click()

    cy.get('[data-testid="profile-favorite-btn"]').click()
    cy.contains('Beef').should('exist')
    cy.contains('Salmon').should('exist')
    cy.get('[data-testid="0-horizontal-favorite-btn"]').click()
    cy.visit('http://localhost:3000/favorite-recipes')
    cy.get('[data-testid="page-title"]').should('have.text', 'Favorite Recipes')
    cy.contains('Beef and Mustard Pie').should('not.exist')
  })

  it('adds recipes to tested and checks if they show in profile page', () => {
    cy.get('[data-testid="drinks-bottom-btn"]').click()

    cy.contains('Cocktail').click()
    cy.get('[data-testid="0-card-name"]').should('have.text', "GG")
    cy.get('[data-testid="0-card-name"]').click()

    cy.get('[data-testid="recipe-title"]').should('have.text', "GG")
    cy.get('[data-testid="tested-btn"]').click()

    cy.get('[data-testid="search-btn-img"]').click()
    cy.get('[data-testid="name-search-radio"]').click()
    cy.get('[data-testid="search-input"]').type('cosmopolitan{enter}')
    cy.get('h3').should('contain.text', 'Cosmopolitan')
    cy.get('[data-testid="0-card-name"]').click()

    cy.get('[data-testid="recipe-title"]').should('contain.text', "Cosmopolitan")
    cy.get('[data-testid="tested-btn"]').click()

    cy.get('[data-testid="profile-btn"]').click()

    cy.get('[data-testid="profile-tested-btn"]').click()
    cy.contains('GG').should('exist')
    cy.contains('Cosmopolitan').should('exist')
    cy.get('[data-testid="0-horizontal-tested-btn"]').click()
    cy.visit('http://localhost:3000/tested-recipes')
    cy.get('[data-testid="page-title"]').should('have.text', 'Tested Recipes')
    cy.contains('GG').should('not.exist')
  })
})
