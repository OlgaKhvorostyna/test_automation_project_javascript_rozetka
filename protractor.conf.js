const conf = {
    specs: ['./specs/**/*.spec.js'],
    framework: 'mocha',
    mochaOpts: {
        timeout: 50 * 1000,
        reporter: 'mochawesome',
        reporterOptions: {
            overwrite: false
        }
    },
    onPrepare() {
        browser.waitForAngularEnabled(false)
    },
    SELENIUM_PROMISE_MANAGER: false
};

exports.config = conf