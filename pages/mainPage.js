const {waitForElementVisible} = require('./commons')

class MainPage {
    constructor() {
        this.root = $('header.header')
        this.searchInput = this.root.$('.search-form__input')
        this.searchButton = this.root.$('.search-form__submit')
        this.mainSlider = $('app-slider')
        this.leftSideMenu = $('ul.menu-categories_type_main')
        this.childrenGoodsCategory = $('ul.menu-categories_type_main > li:nth-child(12) > a')
        this.developmentAndCreationSubcategory = $('section > div:nth-child(3) > rz-dynamic-widgets > rz-widget-list:nth-child(3) > section > ul.portal-grid.portal-grid_type_1_6 > li:nth-child(3) div.tile-cats > a.tile-cats__heading')
        this.firstItemBuyButton = $('ul.catalog-grid > li:nth-child(1) app-buy-button > button.buy-button')
        this.zooCategory = $('ul.menu-categories_type_main > li:nth-child(13) > a')
        this.dogsVitaminsSubcategory = $('body > app-root > div > div > rz-super-portal > div > main > section > div:nth-child(3) > rz-dynamic-widgets > rz-widget-slider > section > div > div.top-widget__categories.ng-star-inserted > ul > li:nth-child(3) > rz-category-tile > a')
        this.secondItemBuyButton = $('ul.catalog-grid > li:nth-child(2) app-buy-button > button.buy-button')
        this.categoryMenu = $('#fat-menu')
        this.laptopCategory = $('ul.main-categories > li:nth-child(3) > a')
        this.tabletSubcategory = $('ul.menu-main > li:nth-child(2) > a')
    }

    async search_items(searchValue){
        await waitForElementVisible(this.root)
        await this.searchInput.sendKeys(searchValue)
        await this.searchButton.click()
    }

    async should_be_main_page(){
        await waitForElementVisible(this.mainSlider, 9000, 'Main slider should be visible on Main Page')
        await waitForElementVisible(this.leftSideMenu, 7000, 'Big left side menu should be visible on Main Page')
    }

    async add_to_basket_item_from_children_goods_category(){
        await waitForElementVisible(this.childrenGoodsCategory, 5000, "Children Goods Category should be visible")
        await this.childrenGoodsCategory.click()
        await waitForElementVisible(this.developmentAndCreationSubcategory, 8000, "Development And Creation Subcategory should be visible")
        await this.developmentAndCreationSubcategory.click()
        await waitForElementVisible(this.firstItemBuyButton, 5000, "First Item Buy Button should be visible")
        await this.firstItemBuyButton.click()
    }

    async add_to_basket_item_from_zoo_category(){
        await waitForElementVisible(this.zooCategory, 5000, "Zoo category should be visible")
        await this.zooCategory.click()
        await waitForElementVisible(this.dogsVitaminsSubcategory, 25000, "dogsVitaminsSubcategory should be visible")
        await this.dogsVitaminsSubcategory.click()
        await waitForElementVisible(this.secondItemBuyButton, 5000, "secondItemBuyButton should be visible")
        await this.secondItemBuyButton.click()
    }

    async open_children_goods_category_and_development_and_creation_subcategory(){
        await waitForElementVisible(this.childrenGoodsCategory, 5000, "Children Goods Category should be visible")
        await this.childrenGoodsCategory.click()
        await waitForElementVisible(this.developmentAndCreationSubcategory, 8000, "Development And Creation Subcategory should be visible")
        await this.developmentAndCreationSubcategory.click()
    }

    async search_the_item_through_pop_up_catalog_menu() {
        await waitForElementVisible(this.categoryMenu, 5000, "Category menu button isn't visible")
        await this.categoryMenu.click()
        await waitForElementVisible(this.laptopCategory, 5000, "Laptop Category isn't visible")
        await this.laptopCategory.click()
        await this.tabletSubcategory.click()
    }
}

module.exports = {
    MainPage
}