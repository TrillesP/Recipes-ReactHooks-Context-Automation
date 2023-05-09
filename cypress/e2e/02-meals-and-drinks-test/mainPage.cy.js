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
    cy.get('#search-bar-elements').find('#name').should('exist').and('have.value', "Name")
    cy.get('#search-bar-elements').find('#ingredient').should('exist').and('have.value', "Ingredient")
    cy.get('#search-bar-elements').find('#first-letter').should('exist').and('have.value', "First Letter")

    cy.get('[data-testid="name-search-radio"]').click()
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

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy
      .get('[data-testid="search-input"]').type('ad{enter}')
      .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Your search must have only 1 (one) character')      
    })
  })

  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click()

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click()

    cy.get('#action-canvas').click('topLeft')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('topRight')
    cy.get('#action-canvas').click('left')
    cy.get('#action-canvas').click('right')
    cy.get('#action-canvas').click('bottomLeft')
    cy.get('#action-canvas').click('bottom')
    cy.get('#action-canvas').click('bottomRight')

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    cy.get('#action-canvas')
      .click(80, 75) // click 80px on x coord and 75px on y coord
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165)

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true })
  })

  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick().should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')
  })

  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })

  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
      .check().should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]')
      .check().should('be.checked')

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]')
      .check('radio1').should('be.checked')

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox2']).should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]')
      .check({ force: true }).should('be.checked')

    cy.get('.action-radios [type="radio"]')
      .check('radio3', { force: true }).should('be.checked')
  })

  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck().should('not.be.checked')

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]')
      .check('checkbox1')
      .uncheck('checkbox1').should('not.be.checked')

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')

    // Ignore error checking prior to unchecking
    cy.get('.action-check [disabled]')
      .uncheck({ force: true }).should('not.be.checked')
  })

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.action-select')
      .should('have.value', '--Select a fruit--')

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      // when getting multiple values, invoke "val" method first
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // Select option(s) with matching value
    cy.get('.action-select').select('fr-bananas')
      // can attach an assertion right away to the element
      .should('have.value', 'fr-bananas')

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // assert the selected values include oranges
    cy.get('.action-select-multiple')
      .invoke('val').should('include', 'fr-oranges')
  })

  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    cy.get('#scroll-horizontal button')
      .should('not.be.visible')

    // scroll the button into view, as if the user had scrolled
    cy.get('#scroll-horizontal button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-vertical button')
      .should('not.be.visible')

    // Cypress handles the scroll direction needed
    cy.get('#scroll-vertical button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-both button')
      .should('not.be.visible')

    // Cypress knows to scroll to the right and down
    cy.get('#scroll-both button').scrollIntoView()
      .should('be.visible')
  })

  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
  })

  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom')

    cy.get('#scrollable-horizontal').scrollTo('right')

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    cy.get('#scrollable-vertical').scrollTo(250, 250)

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    cy.get('#scrollable-both').scrollTo('75%', '25%')

    // control the easing of the scroll (default is 'swing')
    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

    // control the duration of the scroll (in ms)
    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
  })
})
