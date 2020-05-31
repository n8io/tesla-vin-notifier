const debug = require("debug");
const http = require("http");
const chromium = require("chrome-aws-lambda");
const log = debug("tesla-vin-notifier:server:request");
const { make: makeBrowser } = require("./browser");
const { read: readDetails } = require("./details");

const { PORT = 3000 } = process.env;

const seconds = (start, end) =>
  `${Math.floor((end.getTime() - start.getTime()) / 1000)}s`;

http
  .createServer(async (_req, res) => {
    const start = new Date();

    log("Request received");

    let browser = undefined;
    let executablePath = null;

    try {
      executablePath = executablePath || (await chromium.executablePath);

      browser = await makeBrowser();
      details = await readDetails(browser);
    } catch (error) {
      console.error(error);

      return res.end(
        JSON.stringify({
          isOk: false,
          message: "An error occurred",
          responseTime: seconds(start, new Date()),
        })
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }

    return res.end(
      JSON.stringify({
        ...details,
        isOk: true,
        message: "Situation normal",
        responseTime: seconds(start, new Date()),
      })
    );
  })
  .listen(PORT, () =>
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  );
