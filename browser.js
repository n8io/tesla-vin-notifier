const debug = require("debug");
const chromium = require("chrome-aws-lambda");
const log = debug("tesla-vin-notifier:browser");
const { read } = require("./details");

const { args, defaultViewport } = chromium;

let browser = undefined;
let executablePath = null;

const make = async (isHeaded) => {
  executablePath = executablePath || (await chromium.executablePath);

  browser =
    browser ||
    (await chromium.puppeteer.launch({
      // Required
      executablePath,
      // Optional
      args,
      defaultViewport,
      headless: !isHeaded,
    }));

  return browser;
};

exports.make = make;
