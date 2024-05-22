const LambdaPage = require("../pages/lambda.js");
const { describe, it, before, after } = require("mocha");
const { assert } = require("chai");
const fs = require("fs");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");

describe("Тест Lambda", function () {
  this.timeout(15000);
  let lp;

  before(async () => {
    lp = new LambdaPage(5, 5);
    await lp.open();
  });

  after(async () => {
    await lp.closeBrowser();
  });

  it("Проверка текста оставшихся элементов", async () => {
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Текст оставшихся элементов не соответствует ожидаемому"
    );
  });

  it("Проверка, что первый элемент не активен", async () => {
    const firstItem = await lp.getItem(1);
    assert.isTrue(
      await lp.isItemNotActive(firstItem),
      "Первый элемент должен быть неактивным"
    );
  });

  it("Клик по первому элементу и проверка, что он становится активным, а текст оставшихся элементов изменяется", async () => {
    const firstItem = await lp.getItem(1);
    await lp.clickItem(1);
    assert.isTrue(
      await lp.isItemActive(firstItem),
      "Первый элемент не стал активным после клика"
    );
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Текст оставшихся элементов не обновился корректно"
    );
  });

  it("Проверка, что другие элементы списка не активны, их клик и проверка, что они становятся активными, а текст оставшихся элементов изменяется", async () => {
    for (let i = 2; i <= lp.total; i++) {
      const item = await lp.getItem(i);
      assert.isFalse(
        await lp.isItemActive(item),
        `Элемент ${i} должен быть неактивным`
      );
      await lp.clickItem(i);
      assert.isTrue(
        await lp.isItemActive(item),
        `Элемент ${i} не стал активным после клика`
      );
      assert.isTrue(
        await lp.checkRemainingElem(),
        "Текст оставшихся элементов не обновился корректно"
      );
    }
  });

  it("Добавление нового элемента", async () => {
    await lp.addItem("Новый элемент");
    const newItem = await lp.getItem(lp.total);
    assert.isFalse(
      await lp.isItemActive(newItem),
      "Новый элемент должен быть неактивным"
    );
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Текст оставшихся элементов не обновился корректно после добавления элемента"
    );
  });

  it("Клик по новому элементу", async () => {
    await lp.clickItem(lp.total);
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Текст оставшихся элементов не обновился корректно после клика по новому элементу"
    );
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await allure.step('Сделать скриншот при ошибке', async () => {
        await lp.saveScreenshot("fail_lambda.png");
        allure.attachment("image.png", fs.readFileSync("fail_lambda.png"), "image/png");
      });
    }
  });
});
