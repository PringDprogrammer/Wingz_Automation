const { Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const BasePage = require("../pageObjects/basePageObjects");
const SignInPage = require("../pageObjects/signInPageObjects");
require("chromedriver");


describe("Sign In page test", () => {

    let driver;
    let basePage;
    let signinPage;

    beforeEach(async () => {
        driver = new Builder().forBrowser('chrome').build();
        basePage = new BasePage(driver);
        signinPage = new SignInPage(driver);
        await basePage.openUrl("https://app.wingz.me/");
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("TC001 Negative test - User enter correct password but wrong username", async () => {

        await driver.sleep(2000);
        await signinPage.enterUsername("chester.palanca@gmail.com");
        await signinPage.enterPassword("chestertest25");

        await signinPage.clickSignInBtn();
        await driver.sleep(2000);
        await signinPage.incorrectUserCreadentials(); 
        
    });

    it("TC002 Negative test - User enter incorrect password but correct username", async () => {

        await driver.sleep(2000);
        await signinPage.enterUsername("chester.palanca@gmail.comss");
        await signinPage.enterPassword("chestertest2");

        await signinPage.clickSignInBtn();
        await driver.sleep(2000);
        await signinPage.incorrectUserCreadentials();  

    });

    it("TC003 Negative test - Click the Login button without completing all the fields", async () => {

        await signinPage.clickSignInBtn();
        await signinPage.emptySignInFields();

    });

    it("TC004 Positive test - User enters correct username and password", async () => {
        
        await signinPage.enterUsername("chester.palanca@gmail.comss");
        await signinPage.enterPassword("chestertest25");

        await signinPage.clickSignInBtn();
        await driver.sleep(5000);
        await signinPage.isSuccessfullyLoggedIn();
        
    });

});