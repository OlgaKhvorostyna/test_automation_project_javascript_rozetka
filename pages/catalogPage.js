const {waitForElementVisible} = require('./commons')
const {expect} = require("chai");

class CatalogPage {
    constructor() {
        this.catalogTitle = $('h1.catalog-heading')
        this.catalogBlockRoot = $('.content_type_catalog')
        this.catalogItemTitles = this.catalogBlockRoot.$$('.goods-tile__title')
        this.headerLogo = $('header div.header-layout > a')
        this.basketButton = $('rz-cart > button')
        this.rozetkaIsSeller = $('rz-filter-stack > div:nth-child(1) rz-filter-checkbox > ul:nth-child(1) > li:nth-child(1) > a.checkbox-filter__link')
        this.maxPriceField = $('input.slider-filter__input[formcontrolname="max"]')
        this.newValueForMaxPriceField = 500
        this.minPriceField = $('input.slider-filter__input[formcontrolname="min"]')
        this.newValueForMinPriceField = 400
        this.priceFieldButtonConfirmation = $('button.slider-filter__button')
        this.catalogItemPrices = this.catalogBlockRoot.$$('span.goods-tile__price-value')
        this.catalogPriceFilter = $('ul > li:nth-child(2) > a.catalog-selection__link')
    }

    async getTitleBlockInfo() {
        await waitForElementVisible(this.catalogTitle, 10 * 1000, 'Title block should be visible')
        return this.catalogTitle.getText()
    }

    async search_value_should_be_in_all_the_items_on_page(searchValue) {
        await waitForElementVisible(this.catalogBlockRoot,10 * 1000, 'Catalog root should be visible')
        const catalogItemTitleValues = await this.catalogItemTitles.map(function(titleItem) {
            return titleItem.getText()
        })
        catalogItemTitleValues.forEach(function(titleValue) {
            expect(titleValue.toLowerCase()).to.include(searchValue)
        })
    }

    async go_to_main_page() {
        await waitForElementVisible(this.headerLogo, 5000, "returnToMainPage button should be visible")
        await this.headerLogo.click()
    }

    async go_to_basket() {
        await waitForElementVisible(this.basketButton, 5000, "basketButton should be visible")
        await this.basketButton.click()
    }

    async choose_filters_rozetka_seller_and_price_between_400_and_500() {
        await waitForElementVisible(this.rozetkaIsSeller, 9000, "Rozetka Seller Checkbox should be visible")
        await this.rozetkaIsSeller.click()
        await waitForElementVisible(this.minPriceField, 5000, "Min Price Field should be visible")
        await this.minPriceField.clear()
        await this.maxPriceField.clear()
        await this.minPriceField.sendKeys(this.newValueForMinPriceField)
        await this.maxPriceField.sendKeys(this.newValueForMaxPriceField)
        await this.priceFieldButtonConfirmation.click()
    }

    async price_of_all_items_on_the_page_should_be_bigger_than_400_and_less_than_500() {
        await waitForElementVisible(this.catalogPriceFilter,10 * 1000, 'Catalog Price Filter should be visible')
        const catalogItemPricesValues = await this.catalogItemPrices.map(function(titleItem) {
            return titleItem.getText()
        })
        catalogItemPricesValues.forEach(function(titleValue) {
            const titleValue2 = parseInt(titleValue.slice(0, titleValue.length - 1));
            expect(titleValue2).to.be.greaterThanOrEqual(400)
            expect(titleValue2).to.be.lessThanOrEqual(500)
        })
    }
}

module.exports = {
    CatalogPage
}