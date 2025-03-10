# Wingz_Automation

Initialize the npm for new project
- npm init -y

Install the dependencies: npm install selenium-webdriver chromedriver mocha --save-dev

Update the package.json file "scripts"
"scripts": {
    "test": "mocha ./tests/*.js --timeout 60000"
  }

Run the test type in terminal : npm run test