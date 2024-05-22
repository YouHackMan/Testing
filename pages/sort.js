const BasePage = require("./basepage");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

class marketPage extends BasePage {
  constructor() {
    super();
  }

  async open() {
    await this.goToUrl("https://market.yandex.ru/");
    await driver.manage().addCookie({
      name: "spravka",
      value:
        "dD0xNzE0OTI1MDg0O2k9MjEyLjQ2LjEwLjg4O0Q9QkIxMjBCMjA1OUNBMjgxREFCNjRBN0EwNzRBQTRBMTY4RDczQTBCNjQ5QjE5Q0ZFQjgxNUU2RkREM0FBODkzODlFRjAyNUQ4NUZFMEU1RUU5Rjc4RkRDNDI4OTc0ODM5OTY4QUMwREFENzY5QTE5MTNEOURBMkE5RDdFOUU2QTQ2NERDMzREOTFFNTkwOEMwRjc2NTU4NTBEM0VFODA4RTdERThDRTlGNDI5ODQ1RjJBOTBGM0ZBM0I2O3U9MTcxNDkyNTA4NDQzNjA0MTY5MDtoPTg1NzQxN2M1ZjAxZDJkMTc5ZWU1ZDgzMzMyY2I5NGQ3",
    });
    driver.manage().window().maximize();
  }

  async checkHeader(header) {
    return header === (await driver.findElement(By.xpath("//h1")).getText());
  }

  async clickCatalogButton() {
    await this.click(
      By.xpath(
        "//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']"
      )
    );
    await driver.sleep(5000);
  }

  async clickBigCategory() {
    await this.click(
      By.xpath("//li//a[@href='/catalog--kompiuternaia-tekhnika/54425']")
    );
    await driver.sleep(5000);
  }

  async clickMediumCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_1jFQq _1eGsE pttHu"]//a[@href="https://market.yandex.ru/catalog--kompiuternye-komplektuiushchie/54536?hid=91018"]'
      )
    );
    await driver.sleep(500);
  }

  async clickSmallCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_1jFQq _1eGsE pttHu"]//a[@href="https://market.yandex.ru/catalog--vnutrennie-zhestkie-diski/55316/list?hid=91033&allowCollapsing=1&local-offers-first=0"]'
      )
    );
    await driver.sleep(500);
  }

  async logFirstFiveProducts() {
    let productNames = await driver.findElements(
      By.xpath(
        '//div[@data-auto="SerpList"]/child::div//div[@class="m4M-1"]//h3'
      )
    );

    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto="SerpList"]/child::div//span[@class="_1ArMm"]')
    );
    for (let i = 0; i < 5; i++) {
      console.log(
        `Товар: ${await productNames[
          i
        ].getText()}, цена: ${await productPrices[i].getText()} руб.`
      );
    }
  }

  async clickCheap() {
    await this.click(
      By.xpath(
        "//div[@class='_2Ios3']/child::button[@data-autotest-id='aprice']"
      )
    );
  }

  async checkCheapProducts() {
    let productNames = await driver.findElements(
      By.xpath(
        '//div[@data-auto="SerpList"]/child::div//div[contains(@class, "_2rw4E D81hX")]//h3'
      )
    );

    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto="SerpList"]/child::div//div[contains(@class, "_2rw4E D81hX")]//span[@class="_1ArMm"]')
    );

    let len = Math.min(productNames.length, productPrices.length);

    for (let i = 0; i < len - 1; i++) {
      if (productPrices[i] && productPrices[i + 1]) {
        const price1 = parseFloat((await productPrices[i].getText()).replace(/\D/g, ''));
        const price2 = parseFloat((await productPrices[i + 1].getText()).replace(/\D/g, ''));

        if (price1 <= price2) {
          console.log(
            `Товар: ${await productNames[i].getText()}, цена: ${await productPrices[i].getText()} руб.`
          );
        } else {
          console.log(
            `сортировка по цене не сработала`,
            await productPrices[i].getText(), await productPrices[i + 1].getText()
          );
        }
      } else {
        console.log('Product price element is missing');
      }
    }
  }
}

module.exports = marketPage;
