const {waitForElementVisible} = require('./commons')
const {expect} = require("chai");

class BasketPage {
    constructor() {
        this.basketFirstItemDeleteButton1 = $('#cartProductActions0')
        this.basketFirstItemDeleteButton2 = $('.button--with-icon.button--link')
        this.basketFirstProductPrice = $('ul.cart-list > li:nth-child(1) p.cart-product__price')
        this.basketSecondProductPrice = $('ul.cart-list > li:nth-child(2) p.cart-product__price')
        this.basketTotalPrice = $('div.cart-receipt__sum-price')
        this.basketFirstProductTitle = $('ul.cart-list > li:nth-child(1) a.cart-product__title')
        this.basketSecondProductTitle = $('ul.cart-list > li:nth-child(2) a.cart-product__title')
    }

    async verify_titles_of_items_from_category_page_are_the_same_as_in_basket(firstItemTitleFromCatalogPage, secondItemTitleFromCatalogPage) {
        await waitForElementVisible(this.basketFirstProductTitle, 5000, "Basket First Product Title should be visible")
        let basketFirstProductTitleValue = await this.basketFirstProductTitle.getText()
        await waitForElementVisible(this.basketSecondProductTitle, 5000, "Basket Second Product Title should be visible")
        let basketSecondProductTitleValue = await this.basketSecondProductTitle.getText()
        expect(basketSecondProductTitleValue).to.equal(firstItemTitleFromCatalogPage)
        expect(basketFirstProductTitleValue).to.equal(secondItemTitleFromCatalogPage)
    }

    async check_that_price_of_two_items_is_calculated_correctly() {
        let basketFirstProductPriceValue = await this.basketFirstProductPrice.getText()
        const basketFirstProductPriceNumber = parseInt(basketFirstProductPriceValue.slice(0, -1))
        let basketSecondProductPriceValue = await this.basketSecondProductPrice.getText()
        const basketSecondProductPriceNumber = parseInt(basketSecondProductPriceValue.slice(0, -1))
        let basketTotalPriceValue = await this.basketTotalPrice.getText()
        const basketTotalPriceNumber = parseInt(basketTotalPriceValue.slice(0, -1))
        expect(basketTotalPriceNumber).to.equal(basketFirstProductPriceNumber + basketSecondProductPriceNumber)

    }
    async delete_first_item_from_basket() {
        await this.basketFirstItemDeleteButton1.click()
        await waitForElementVisible(this.basketFirstItemDeleteButton2,5000, "Basket First Item Delete Button 2 should be visible")
        await this.basketFirstItemDeleteButton2.click()
    }
}

module.exports = {
    BasketPage
}