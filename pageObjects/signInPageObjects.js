const {By, until} = require("selenium-webdriver");
const assert = require("assert");


class SignInPage {
    constructor(driver) {
        this.driver = driver; 
        this.username = By.xpath("//input[@type='email']");
        this.password = By.xpath("//input[@type='password']");
        this.signInBtn = By.xpath("//button[text()='Sign In']");
        this.welcomeUserName = By.xpath("//li[@class='user-display-name']");
        this.incorrectUserCredential = By.xpath("//span[@class='ng-binding']");
        
    }

    async enterUsername(name) {
        let userName = await this.driver.findElement(this.username);
        await userName.sendKeys(name);
    }

    async enterPassword(pass) {
        let passWord = await this.driver.findElement(this.password);
        await passWord.sendKeys(pass);
        await this.driver.sleep(2000);
    }

    async clickSignInBtn() {
        let logInBtn = await this.driver.findElement(this.signInBtn);
        await logInBtn.click();
    }

    async isSuccessfullyLoggedIn() {
        await this.driver.wait(until.elementLocated(this.welcomeUserName), 20000);
        let name = await this.driver.findElement(this.welcomeUserName);
        let nameText = await name.getText();
        console.log(nameText);
        assert.equal(nameText, 'Chester', 'Current user name is not expected');
        console.log(`Welcome "${nameText}"!`);
    }
    
    async incorrectUserCreadentials() {
        let message = await this.driver.findElement(this.incorrectUserCredential);
        let getMessage = await message.getText();
        let errorMessageText = 'Incorrect username or password';
        assert.ok(getMessage.includes(errorMessageText), `Incorrect Error message: ${getMessage}` );
        console.log('Assertion successful!');
    }

    async emptySignInFields() {
        let inputField = await this.driver.findElement(this.username);
        let message = await inputField.getAttribute('validationMessage');
        assert.strictEqual(message, 'Please fill out this field.');
    }
}
module.exports = SignInPage;