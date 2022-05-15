///<reference types="cypress"/>
let dadosLogin

import dadosCadastro from '../fixtures/faker.js'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC ok
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('produtos')
    })

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Cliente já cadastrado', () => {
        const prod1 = 'Apollo Running Short'
        const prod2 = 'Selene Yoga Hoodie'
        const prod3 = 'Orestes Fitness Short'
        const prod4 = 'Cassia Funnel Sweatshirt'
        const qtd = 2

        //adicionando o primeiro produto
        cy.SelecionarProduto(prod1)
        cy.AdicionarProdutoCarrinho(prod1, qtd, 34, "Black")

        // // //adicionando o segundo produto
        cy.PesquisarProduto(prod2)
        cy.AdicionarProdutoCarrinho(prod2, qtd, "M", "Orange")

        // // //adicionando o terceiro produto
        cy.PesquisarProduto(prod3)
        cy.AdicionarProdutoCarrinho(prod3, qtd, "34", "Blue")

        // // //adicionando o quarto produto
        cy.PesquisarProduto(prod4)
        cy.AdicionarProdutoCarrinho(prod4, qtd, "L", "Purple")

        cy.xpath('//a[@class="button wc-forward"]').click()

        cy.get('.page-title').should('contain', "Carrinho")

        cy.get('.checkout-button').click()
        cy.get('.showlogin').click()
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha)
        cy.get('.woocommerce-button').click()

        cy.AlterarEnderecoFaturamento(
            dadosCadastro.firstName,
            dadosCadastro.lastName,
            dadosCadastro.company,
            dadosCadastro.country,
            dadosCadastro.address,
            dadosCadastro.number,
            dadosCadastro.city,
            dadosCadastro.state,
            dadosCadastro.postcode,
            dadosCadastro.phonenumber,
            dadosCadastro.email,
            dadosCadastro.comments)

        cy.get('#payment_method_cod').click()
        cy.get('[type="checkbox"]').check()
        cy.get('#place_order').click()

        cy.get('.page-title').should('contain', 'Pedido recebido')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    })

});
