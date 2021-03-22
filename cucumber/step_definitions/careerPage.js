'use strict';

const {Given, When, Then, setDefaultTimeout} = require('cucumber');
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/^the career page is opened$/, () => {
    return careerPage.load();
});

When(/^(.+), (.+) is selected in the location filter box$/, (city, country) => {
    return careerPage.selectCityInCountry(country, city);
});

When(/^(.+) is selected in the department filter box$/, department => {
    return careerPage.toggleDepartment(department);
});

When(/^the search button is clicked$/, () => {
    return careerPage.search();
});

When(/^the apply button of the (.+) position is clicked on$/, positionName => {
});

Then(/^the logo should be visible$/, () => {
    return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
});

Then(/^the cookie bar should be (hidden|visible)$/, visibility => {
    return expect(careerPage.cookieBanner.isVisible()).to.eventually.be.equal(visibility === "visible");
});

Then(/^the search form should be visible$/, () => {
    return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

Then(/^(.+) should be selected in the location filter box$/, city => {
    return expect(careerPage.getSelectedCity()).to.eventually.equal(city);
});

Then(/^(.+) should be selected in the department filter box$/, department => {
    return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(department.toUpperCase());
});

Then(/^there should be a job offer for (.+) position$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.nameOfPosition(position).getText()).to.eventually.contain(positionName);
});

Then(/^the location of the (.+) position should be (.+)$/, (positionName, country) => {
    const position = careerPage.getResultByPosition(positionName);
    return expect(careerPage.locationOfPosition(position)
        .getText()).to.eventually.include(country.toUpperCase());
});

Then(/^the description of the job offer should contain the (.+) position name$/, positionName => {
    const position = careerPage.getResultByPosition(positionName);
    careerPage.applyForPosition(position);
    return expect(careerPage.jobDescription.getText()).to.eventually.include(positionName);
});
