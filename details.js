const debug = require("debug");
const LOGIN = "https://www.tesla.com/teslaaccount";
const log = debug("tesla-vin-notifier:puppeteer:read");

const read = async (browser) => {
  const { PASSWORD, RESERVATION_NUMBER, USERNAME } = process.env;
  let page = null;

  try {
    page = await browser.newPage();

    log("Navigating to login page...");
    await page.goto(LOGIN);

    log("Logging in...");
    await page.type("#form-input-identity", USERNAME);
    await page.type("#form-input-credential", PASSWORD);
    await page.click("#form-submit-continue");
    log("Login successful. Waiting for account page to load...");
    await page.waitFor(".rn-vin");
    await page.click(`a[href$="${RESERVATION_NUMBER}"]`);
    log("Waiting for vehicle details page to load...");
    await page.waitFor("#page");

    const { DeliveryDetails, Vin } = await page.evaluate(
      () => Tesla.ProductF.Data
    );

    const { DeliveryEstimateDate: estimateDeliveryDate } = DeliveryDetails;

    log("Page info found", JSON.stringify({ DeliveryDetails, Vin }));

    return {
      estimateDeliveryDate,
      vin: Vin,
    };
  } catch (error) {
    console.error(error);

    return {};
  } finally {
    if (page) await page.close();
  }
};

exports.read = read;
