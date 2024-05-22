const marketPage = require("../pages/sort");
const mocha = require("mocha");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");
const fs = require("fs");

mocha.describe("Тест добавления в корзину на Яндекс Маркете", function () {
  const ybp = new marketPage();

  before(async function () {
    await ybp.open();
  });

  after(async function () {
    await ybp.closeBrowser();
  });

  it("открыть дешевые товар", async function () {
    await allure.step("открыть категорию", async function () {
      await ybp.clickCatalogButton();
      await ybp.clickBigCategory();
      await ybp.clickMediumCategory();
      await ybp.clickSmallCategory();
      await ybp.checkHeader("Внутренние жесткие диски");
    });

    await allure.step("записать товары", async function () {
      await ybp.logFirstFiveProducts();
    });

    await allure.step("проверить, что все правильно", async function () {
      console.log('-------------------------------------------');
      console.log('Тестирование сортировки по возрастанию цены');
      console.log('-------------------------------------------');
      await ybp.clickCheap();
      await driver.sleep(500);
      await ybp.checkCheapProducts();
    });
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await allure.step('Сделать скриншот при ошибке', async () => {
        await ybp.saveScreenshot("fail_sort.png");
        allure.attachment("image.png", fs.readFileSync("fail_sort.png"), "image/png");
      });
    }
  });
});
