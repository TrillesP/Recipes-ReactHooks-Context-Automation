/// <reference types="cypress" />

describe('Meals and Drinks pages test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="email-input"]').type('good@email.com')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('[data-testid="login-btn"]').click()
  })

  it('tests loading of elements in page', () => {
    cy.get('img').should('have.length', 16) //all images
    cy.get('h3').should('have.length', 12) //all meal names
    cy.get('button').should('have.length', 9) //all buttons
  })

  it('tests if filter button works for meals, changing elements that appear', () => {
    cy.get('[data-testid="0-card-name"]').should('have.text', "Corba")
    cy.contains('Beef').click()
    cy.get('[data-testid="0-card-name"]').should('not.have.text', "Corba")

    cy.get('[data-testid="0-card-name"]').should('have.text', "Beef and Mustard Pie")
    cy.contains('Dessert').click()
    cy.get('[data-testid="0-card-name"]').should('not.have.text', "Beef and Mustard Pie")

    cy.get('[data-testid="0-card-name"]').should('have.text', "Apam balik")
    cy.contains('All').click()
    cy.get('[data-testid="0-card-name"]').should('have.text', "Corba")
  })

  it('checks if footer images work for changing pages', () => {
    cy.contains('Meals').should('exist')
    cy.contains('Drinks').should('not.exist')
    cy.get('[data-testid="drinks-bottom-btn"]').click()
    cy.contains('Meals').should('not.exist')
    cy.contains('Drinks').should('exist')
    cy.get('[data-testid="meals-bottom-btn"]').click()
    cy.contains('Meals').should('exist')
    cy.contains('Drinks').should('not.exist')
  })

  it('tests if filter button works for drinks, changing elements that appear', () => {
    cy.get('[data-testid="drinks-bottom-btn"]').click()

    cy.get('[data-testid="0-card-name"]').should('have.text', "GG")
    cy.contains('Cocktail').click()
    cy.get('[data-testid="0-card-name"]').should('not.have.text', "GG")

    cy.get('[data-testid="0-card-name"]').should('have.text', "155 Belmont")
    cy.contains('Cocoa').click()
    cy.get('[data-testid="0-card-name"]').should('not.have.text', "155 Belmont")

    cy.get('[data-testid="0-card-name"]').should('have.text', "Castillian Hot Chocolate")
    cy.contains('All').click()
    cy.get('[data-testid="0-card-name"]').should('have.text', "GG")
  })

  it('checks if Search component shows and works correctly', () => {
    cy.get('[data-testid="search-btn-img"]').click()
    cy.get('[data-testid="search-exec-btn"]').should('be.disabled')
    cy.get('#search-bar-elements').find('#name').should('exist').and('have.value', "Name")
    cy.get('#search-bar-elements').find('#ingredient').should('exist').and('have.value', "Ingredient")
    cy.get('#search-bar-elements').find('#first-letter').should('exist').and('have.value', "First Letter")

    cy.get('[data-testid="name-search-radio"]').click()
    cy.get('[data-testid="search-exec-btn"]').should('be.enabled')
    cy.get('[data-testid="search-input"]').type('salmon{enter}')
    cy.get('h3').should('contain.text', 'salmon')

    cy.get('[data-testid="ingredient-search-radio"]').click()
    cy.get('[data-testid="search-input"]').clear()
    cy.get('[data-testid="search-input"]').type('lime{enter}')
    cy.get('h3').should('have.length', 12)

    cy.get('[data-testid="first-letter-search-radio"]').click()
    cy.get('[data-testid="search-input"]').clear()
    cy.get('[data-testid="search-input"]').type('P{enter}')
    cy.get('[data-testid="0-card-name"]').should('have.text', "Pad See Ew")

    const stub = cy.stub() //testing for allert showing correctly when searching for more than 1 letter
    cy.on('window:alert', stub)
    cy
      .get('[data-testid="search-input"]').type('ad{enter}')
      .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Your search must have only 1 (one) character')      
    })
  })

  it('testing clicking on any recipe and changing pages to recipe details', () => {
    cy.get('[data-testid="0-card-img"]').click()

    cy.get('[data-testid="recipe-title"]').should('have.text', "Corba")
    cy.get('[data-testid="recipe-photo"]').should('exist')
    cy.get('[data-testid="favorite-btn"]').should('exist')
    cy.get('[data-testid="tested-btn"]').should('exist')
    cy.get('p').should('have.length', 14)

    cy.get('[data-testid="search-btn-img"]').click()
    cy.get('[data-testid="name-search-radio"]').click()
    cy.get('[data-testid="search-input"]').type('salmon{enter}')
    cy.get('[data-testid="0-card-name"]').should('contain.text', "Salmon")
    cy.get('[data-testid="3-card-img"]').click()

    cy.get('[data-testid="recipe-title"]').should('contain.text', "Salmon")
    cy.get('[data-testid="recipe-photo"]').should('exist')
    cy.get('[data-testid="favorite-btn"]').should('exist')
    cy.get('[data-testid="tested-btn"]').should('exist')
    cy.get('p').should('have.length', 10)
  })
});
