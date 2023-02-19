const EC = protractor.ExpectedConditions

async function waitForElementVisible(element, timeout=5000, message) {
    await browser.wait(EC.visibilityOf(element), timeout, message)
}

module.exports = {
    waitForElementVisible
}