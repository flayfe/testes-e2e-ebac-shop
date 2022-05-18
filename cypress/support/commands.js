// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (usuario, senha) => {
  cy.get('#username').type(usuario)
  cy.get('#password').type(senha, { log: false })
  cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add('SelecionarProduto', prod => {
  cy.get('#main-content').contains(prod).click()
})

Cypress.Commands.add('PesquisarProduto', prod => {
  //   cy.xpath(
  //     '//section[@class="tbay-mainmenu hidden-xs hidden-sm"]//li[contains(@class,"menu-item-629")]'
  //   ).click()
  //   cy.xpath(
  //     '//div[@class="header-main clearfix"]//input[contains(@class,"tbay-search")]'
  //   ).type(prod + '{enter}')

  cy.visit('produtos')
  cy.contains(prod).click()
  cy.get('.product_title').should('have.text', prod)
})

Cypress.Commands.add('AdicionarProdutoCarrinho', (prod, qtd, tam, cor) => {
  cy.xpath('//h1[@class="product_title entry-title"]').should('have.text', prod)

  cy.get('.button-variable-item-' + tam).click()
  cy.get('.button-variable-item-' + cor).click()
  cy.get('.input-text').clear().type(qtd)
  cy.xpath('//button[@class="single_add_to_cart_button button alt"]').click()
  cy.xpath('//div[@role="alert"]').contains(
    qtd + ' × “' + prod + '” foram adicionados no seu carrinho.'
  )
})

Cypress.Commands.add(
  'AlterarEnderecoFaturamento',
  (
    firstName,
    lastName,
    company,
    country,
    address,
    number,
    city,
    state,
    postcode,
    phonenumber,
    email,
    comments
  ) => {
    cy.get('#billing_first_name').clear().type(firstName)
    cy.get('#billing_last_name').clear().type(lastName)
    cy.get('#billing_company').clear().type(company)
    cy.get('#select2-billing_country-container')
      .click()
      .type(country + '{enter}')
    cy.get('#billing_address_1').clear().type(address)
    cy.get('#billing_address_2').clear().type(number)
    cy.get('#billing_city').clear().type(city)
    cy.get('#select2-billing_state-container')
      .click()
      .type(state + '{enter}')
    cy.get('#billing_postcode').clear().type(postcode)
    cy.get('#billing_phone').clear().type(phonenumber)
    cy.get('#billing_email').clear().type(email)
    cy.get('#order_comments').clear().type(comments)
  }
)
