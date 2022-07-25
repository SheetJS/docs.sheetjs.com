---
sidebar_position: 7
---

# Headless Automation

Headless automation involves controlling "headless browsers" to access websites
and submit or download data.  It is also possible to automate browsers using
custom browser extensions.

The [SheetJS standalone script](../../installation/standalone) can be added to
any website by inserting a `SCRIPT` tag.  Headless browsers usually provide
utility functions for running custom snippets in the browser and passing data
back to the automation script.

## Use Case

This demo focuses on exporting table data to a workbook.  Headless browsers do
not generally support passing objects between the browser context and the
automation script, so the file data must be generated in the browser context
and sent back to the automation script for saving in the filesystem.  Steps:

1) Launch the headless browser and load the target webpage.

2) Add the standalone SheetJS build to the page in a `SCRIPT` tag.

3) Add a script to the page (in the browser context) that will:

- Make a workbook object from the first table using `XLSX.utils.table_to_book`
- Generate the bytes for an XLSB file using `XLSX.write`
- Send the bytes back to the automation script

4) When the automation context receives data, save to a file

This demo exports data from <https://sheetjs.com/demos/table>.

:::note

It is also possible to parse files from the browser context, but parsing from
the automation context is more performant and strongly recommended.

:::

## Puppeteer

Puppeteer enables headless Chromium automation for NodeJS.  Releases ship with
an installer script.  Installation is straightforward:

```bash
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz puppeteer
```

Binary strings are the favored data type.  They can be safely passed from the
browser context to the automation script.  NodeJS provides an API to write
binary strings to file (`fs.writeFileSync` using encoding `binary`).

To run the example, after installing the packages, save the following script to
`SheetJSPuppeteer.js` and run `node SheetJSPuppeteer.js`.  Steps are commented:

```js title="SheetJSPuppeteer.js"
const fs = require("fs");
const puppeteer = require('puppeteer');
(async () => {
  /* (1) Load the target page */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  await page.setViewport({width: 1920, height: 1080});
  await page.goto('https://sheetjs.com/demos/table');

  /* (2) Load the standalone SheetJS build from the CDN */
  await page.addScriptTag({ url: 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js' });

  /* (3) Run the snippet in browser and return data */
  const bin = await page.evaluate(() => {
    /* NOTE: this function will be evaluated in the browser context.
       `page`, `fs` and `puppeteer` are not available.
       `XLSX` will be available thanks to step 2 */

    /* find first table */
    var table = document.body.getElementsByTagName('table')[0];

    /* call table_to_book on first table */
    var wb = XLSX.utils.table_to_book(table);

    /* generate XLSB and return binary string */
    return XLSX.write(wb, {type: "binary", bookType: "xlsb"});
  });

  /* (4) write data to file */
  fs.writeFileSync("SheetJSPuppeteer.xlsb", bin, { encoding: "binary" });

  await browser.close();
})();
```

## Playwright

Playwright presents a unified scripting framework for Chromium, WebKit, and
other browsers.  It draws inspiration from Puppeteer.  In fact, the example
code is almost identical!

```bash
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz playwright
```

To run the example, after installing the packages, save the following script to
`SheetJSPlaywright.js` and run `node SheetJSPlaywright.js`.  Import divergences
from the Puppeteer example are highlighted below:

```js title="SheetJSPlaywright.js"
const fs = require("fs");
// highlight-next-line
const { webkit } = require('playwright'); // import desired browser
(async () => {
  /* (1) Load the target page */
  // highlight-next-line
  const browser = await webkit.launch(); // launch desired browser
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  // highlight-next-line
  await page.setViewportSize({width: 1920, height: 1080}); // different name :(
  await page.goto('https://sheetjs.com/demos/table');

  /* (2) Load the standalone SheetJS build from the CDN */
  await page.addScriptTag({ url: 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js' });

  /* (3) Run the snippet in browser and return data */
  const bin = await page.evaluate(() => {
    /* NOTE: this function will be evaluated in the browser context.
       `page`, `fs` and the browser engine are not available.
       `XLSX` will be available thanks to step 2 */

    /* find first table */
    var table = document.body.getElementsByTagName('table')[0];

    /* call table_to_book on first table */
    var wb = XLSX.utils.table_to_book(table);

    /* generate XLSB and return binary string */
    return XLSX.write(wb, {type: "binary", bookType: "xlsb"});
  });

  /* (4) write data to file */
  fs.writeFileSync("SheetJSPlaywright.xlsb", bin, { encoding: "binary" });

  await browser.close();
})();
```


## PhantomJS

PhantomJS is a headless web browser powered by WebKit.  Standalone binaries are
available at <https://phantomjs.org/download.html>

:::warning

This information is provided for legacy deployments.  PhantomJS development has
been suspended and there are known vulnerabilities, so new projects should use
alternatives.  For WebKit automation, new projects should use Playwright.

:::

Binary strings are the favored data type.  They can be safely passed from the
browser context to the automation script.  PhantomJS provides an API to write
binary strings to file (`fs.write` using mode `wb`).

To run the example, save the following script to `SheetJSPhantom.js` in the same
folder as `phantomjs.exe` or `phantomjs` and run

```
./phantomjs SheetJSPhantom.js     ## macOS / Linux
.\phantomjs.exe SheetJSPhantom.js ## windows
```

The steps are marked in the comments:

```js title="SheetJSPhantom.js"
var page = require('webpage').create();
page.onConsoleMessage = function(msg) { console.log(msg); };

/* (1) Load the target page */
page.open('https://sheetjs.com/demos/table', function() {

  /* (2) Load the standalone SheetJS build from the CDN */
  page.includeJs("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js", function() {

    /* (3) Run the snippet in browser and return data */
    var bin = page.evaluateJavaScript([ "function(){",

      /* find first table */
      "var table = document.body.getElementsByTagName('table')[0];",

      /* call table_to_book on first table */
      "var wb = XLSX.utils.table_to_book(table);",

      /* generate XLSB file and return binary string */
      "return XLSX.write(wb, {type: 'binary', bookType: 'xlsb'});",
    "}" ].join(""));

    /* (4) write data to file */
    require("fs").write("SheetJSPhantomJS.xlsb", bin, "wb");

    phantom.exit();
  });
});
```

:::caution

PhantomJS is very finicky and will hang if there are script errors.  It is
strongly recommended to add verbose logging and to lint scripts before use.

:::
