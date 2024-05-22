const StudentGroupPage = require("../pages/group");
const mocha = require("mocha");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");
const fs = require("fs");

mocha.describe("Тест группы студентов", async () => {
  const sp = new StudentGroupPage();

  before(async () => {
    await sp.open();
  });

  after(async () => {
    await sp.closeBrowser();
  });

  it("открывает страницу расписания", async () => {
    await sp.openTimeTable();
  });

  it("открывает страницу просмотра расписания", async () => {
    await sp.openTimeTableView();
  });

  it("заполняет группу", async () => {
    await sp.enterGroup();
    await driver.sleep(1000);
  });

  it("проверяет, есть ли нужная группа в списке", async () => {
    assert.equal(await sp.checkGroupInList(), true);
    await driver.sleep(1000);
  });

  it("переходит к расписанию группы", async () => {
    await sp.goToGroupTimeTable();
    await driver.sleep(1000);
  });

  it("проверяет, выделен ли текущий день", async () => {
    assert.equal(await sp.checkIfCurrentDayColored(), true);
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await allure.step('Сделать скриншот при ошибке', async () => {
        await sp.saveScreenshot("fail_student.png");
        allure.attachment("image.png", fs.readFileSync("fail_student.png"), "image/png");
      });
    }
  });
});
