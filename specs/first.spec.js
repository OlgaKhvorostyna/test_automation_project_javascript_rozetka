const expect = require('chai').expect
const EC = protractor.ExpectedConditions
const loc = require('../locators')
const {MainPage, CatalogPage, BasketPage} = require('../pages')


describe('First suit', function() {

    beforeEach(async function () {
        await browser.driver.manage().window().maximize()
    })

    afterEach(() => browser.driver.manage().deleteAllCookies());
    after(() => browser.driver.quit());

    const mainPage = new MainPage()
    const catalogPage = new CatalogPage()
    const basketPage = new BasketPage()


    it('price_filter_on_left_sidebar', async function(){
        await browser.get(loc.BASE_URL)
        await mainPage.should_be_main_page()
        await mainPage.open_children_goods_category_and_development_and_creation_subcategory()
        await catalogPage.choose_filters_rozetka_seller_and_price_between_400_and_500()
        await catalogPage.price_of_all_items_on_the_page_should_be_bigger_than_400_and_less_than_500()
    })


    it('adding_items_to_basket', async function() {
        await browser.get(loc.BASE_URL)
        await mainPage.should_be_main_page()
        await mainPage.add_to_basket_item_from_children_goods_category()

        const firstItemTitle = $('ul.catalog-grid > li:nth-child(1) span.goods-tile__title')
        let firstItemTitleValue = await firstItemTitle.getText()

        await catalogPage.go_to_main_page()
        await mainPage.add_to_basket_item_from_zoo_category()

        const secondItemTitle = $('ul.catalog-grid > li:nth-child(2) span.goods-tile__title')
        let secondItemTitleValue = await secondItemTitle.getText()

        await catalogPage.go_to_basket()
        await basketPage.verify_titles_of_items_from_category_page_are_the_same_as_in_basket(firstItemTitleValue, secondItemTitleValue)
        await basketPage.check_that_price_of_two_items_is_calculated_correctly()
        await basketPage.delete_first_item_from_basket()
        await browser.wait(EC.invisibilityOf(basketPage.basketFirstProductTitle))
    })


    it('search_the_item', async function() {
        await browser.get(loc.BASE_URL)
        await mainPage.should_be_main_page()
        const searchValue = 'lenovo'
        await mainPage.search_items(searchValue)
        const catalogTitleValue = await catalogPage.getTitleBlockInfo()
        expect(catalogTitleValue.toLowerCase()).to.include(searchValue)
        await catalogPage.search_value_should_be_in_all_the_items_on_page(searchValue)
    })


    it('search_the_item_through_catalog_menu_in_header', async function() {
        await browser.get(loc.BASE_URL)
        await mainPage.should_be_main_page()
        await mainPage.search_the_item_through_pop_up_catalog_menu()
    })
})