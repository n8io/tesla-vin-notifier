const dotenv = require("dotenv");
const { make: makeBrowser } = require("./browser");
const { read: readDetails } = require("./details");

dotenv.config();

const main = async () => {
  const browser = await makeBrowser(process.env.HEADED);
  const details = await readDetails(browser);

  // console.log(JSON.stringify(details, null, 2));
  console.log(details.vin || "");

  browser && (await browser.close());
};

main();
