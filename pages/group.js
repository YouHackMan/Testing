const BasePage = require("../pages/basepage");
const { By, Key } = require("selenium-webdriver");

class StudentGroupPage extends BasePage {
  async open() {
    await this.goToUrl("https://mospolytech.ru/");
  }
  async openTimeTable() {
    await this.click(
      By.xpath(
        "//li[@class='user-nav__item']//a[@href='/obuchauschimsya/raspisaniya/']"
      )
    );
    await driver.sleep(2000);
  }
  async openTimeTableView() {
    this.originalWindow = await driver.getWindowHandle();
    await this.click(By.xpath('//a[@href="https://rasp.dmami.ru/"]'));
    await driver.sleep(1000);
  }

  async enterGroup() {
    const windows = await driver.getAllWindowHandles();
    for (const handle of windows) {
      if (handle !== this.originalWindow) {
        await driver.switchTo().window(handle);
      }
    }
    await this.enterText(By.xpath('//input[@class="groups"]'), "221-321");
    await driver
      .findElement(By.xpath('//input[@class="groups"]'))
      .sendKeys(Key.ENTER);
  }

  async checkGroupInList() {
    return !!(await driver.findElement(By.xpath('//div[@id="221-321"]')));
  }
  async goToGroupTimeTable() {
    await this.click(By.xpath('//div[@id="221-321"]'));
  }

  async checkIfCurrentDayColored() {
    let days = await driver.findElements(
      By.xpath(`//div[@class="schedule-week"]/child::div`)
    );
    let thisDay;
    for (let i = 0; i < days.length; i++) {
      if (days.indexOf(days[i]) == new Date().getDay() - 1) {
        thisDay = days[i];
      }
    }


    return (
      (await thisDay.getAttribute("class")) ===
      "schedule-day schedule-day_today"
    );
  }
}

module.exports = StudentGroupPage;