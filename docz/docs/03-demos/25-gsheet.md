---
title: Google Sheets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This demo uses [`node-google-spreadsheet`](https://theoephraim.github.io/node-google-spreadsheet)
to interact with Google Sheets v4 API.

:::caution

Google Sheets deprecates APIs quickly and there is no guarantee that the
referenced API version will be available in the future.

:::

## Initial Configuration

Install the dependencies:

```bash
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz google-spreadsheet@3.3.0
```

The library README has a [guide](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)
for configuring a service worker with write access to the document.  Following
the service worker guide, the JSON key should be saved to `key.json`.

The following helper function attempts to authenticate and access the specified
sheet by ID.  The code should be copied and saved to `common.js`:

<details><summary><b>Code</b> (click to show)</summary>

```js title=common.js
const fs = require("fs");
const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = async(ID) => {
  /* get credentials */
  const creds = JSON.parse(fs.readFileSync('key.json'));

  /* initialize sheet and authenticate */
  const doc = new GoogleSpreadsheet(ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}
```

</details>

## Export Document Data

The goal is to create an XLSB export from a Google Sheet.  Google Sheets does
not natively support the XLSB format.  SheetJS fills the gap.

<details><summary><b>How to run locally</b> (click to show)</summary>

0) Follow the [Authentication and Service Account](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)
instructions.  At the end, you should have

- Created a project and enabled the Sheets API
- Created a service account with a JSON key

Move the generated JSON key to `key.json` in your project folder.

1) Create a new Google Sheet and share with the generated service account.  It
should be granted the "Editor" role

2) Install the dependencies:

```
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz google-spreadsheet@3.3.0
```

2) Save the following snippet to `common.js`:

```js title=common.js
const fs = require("fs");
const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = async(ID) => {
  /* get credentials */
  const creds = JSON.parse(fs.readFileSync('key.json'));

  /* initialize sheet and authenticate */
  const doc = new GoogleSpreadsheet(ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}
```

3) Save the following snippet to `pull.js`:

```js title=pull.js
const XLSX = require("xlsx");

/* create a blank workbook */
const wb = XLSX.utils.book_new();

const init = require("./common");
const ID = "<google sheet ID>";

(async() => {

  const doc = await init(ID);

  for(let i = 0; i < doc.sheetsByIndex.length; ++i) {
    const sheet = doc.sheetsByIndex[i];
    const name = sheet.title;

    /* get the header and data rows */
    await sheet.loadHeaderRow();
    const header = sheet.headerValues;
    const rows = await sheet.getRows();
    const aoa = [header].concat(rows.map(r => r._rawData));

    /* generate a SheetJS Worksheet */
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    /* add to workbook */
    XLSX.utils.book_append_sheet(wb, ws, name);
  }

  /* write to SheetJS.xlsb */
  XLSX.writeFile(wb, "SheetJS.xlsb");

})();
```

4) Replace `<google sheet ID>` with the ID of the actual document.

5) Run `node pull.js` once. It will create `SheetJS.xlsb`.

6) Open `SheetJS.xlsb` and confirm the contents are the same as Google Sheets.

7) Change some cells in the Google Sheets Document.

8) Run `node pull.js` again and reopen `SheetJS.xlsb` to confirm value changes.

</details>

### Convert a Single Sheet

The idea is to extract the raw data from the Google Sheet headers and combine
with the raw data rows to produce a large array of arrays.

```js
async function wb_append_sheet(sheet, name, wb) {
  /* get the header and data rows */
  await sheet.loadHeaderRow();
  const header = sheet.headerValues;
  const rows = await sheet.getRows();

  /* construct the array of arrays */
  const aoa = [header].concat(rows.map(r => r._rawData));

  /* generate a SheetJS Worksheet */
  const ws = XLSX.utils.aoa_to_sheet(aoa);

  /* add to workbook */
  XLSX.utils.book_append_sheet(wb, ws, name);
}
```

### Convert a Workbook

`doc.sheetsByIndex` is an array of worksheets in the Google Sheet Document.  By
looping across the sheets, the entire workbook can be written:

```js
async function doc_to_wb(doc) {
  /* Create a new workbook object */
  const wb = XLSX.utils.book_new();

  /* Loop across the Document sheets */
  for(let i = 0; i < doc.sheetsByIndex.length; ++i) {
    const sheet = doc.sheetsByIndex[i];
    /* Get the worksheet name */
    const name = sheet.title;

    /* Add sheet to workbook */
    await add_sheet_to_wb(sheet, name, wb);
  }

  return wb;
}
```

## Update Document Data

The goal is to refresh a Google Sheet based on a local file.

<details><summary><b>How to run locally</b> (click to show)</summary>

0) Follow the [Authentication and Service Account](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)
instructions.  At the end, you should have

- Created a project and enabled the Sheets API
- Created a service account with a JSON key

Move the generated JSON key to `key.json` in your project folder.

1) Create a new Google Sheet and share with the generated service account.  It
should be granted the "Editor" role

2) Install the dependencies:

```
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz google-spreadsheet@3.3.0
```

2) Save the following snippet to `common.js`:

```js title=common.js
const fs = require("fs");
const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = async(ID) => {
  /* get credentials */
  const creds = JSON.parse(fs.readFileSync('key.json'));

  /* initialize sheet and authenticate */
  const doc = new GoogleSpreadsheet(ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  return doc;
}
```

3) Save the following snippet to `push.js`:

```js title=push.js
const XLSX = require("xlsx");
const fs = require("fs");
/* create dummy worksheet if `sheetjs.xlsx` does not exist */
if(!fs.existsSync("sheetjs.xlsx")) {
  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.aoa_to_sheet([["a","b","c"],[1,2,3]]); XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
  const ws2 = XLSX.utils.aoa_to_sheet([["a","b","c"],[4,5,6]]); XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");
  XLSX.writeFile(wb, "sheetjs.xlsx");
}
/* read and parse sheetjs.xlsx */
const wb = XLSX.readFile("sheetjs.xlsx");

const init = require("./common");
const ID = "<google sheet ID>";

(async() => {

  const doc = await init(ID);

  /* clear workbook */
  {
    /* delete all sheets after the first sheet */
    const old_sheets = doc.sheetsByIndex;
    for(let i = 1; i < old_sheets.length; ++i) {
      await old_sheets[i].delete();
    }
    /* clear first worksheet */
    old_sheets[0].clear();
  }

  /* write worksheets */
  {
    const name = wb.SheetNames[0];
    const ws = wb.Sheets[name];
    /* first worksheet already exists */
    const sheet = doc.sheetsByIndex[0];

    /* update worksheet name */
    await sheet.updateProperties({title: name});

    /* generate array of arrays from the first worksheet */
    const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});

    /* set document header row to first row of the AOA */
    await sheet.setHeaderRow(aoa[0])

    /* add the remaining rows */
    await sheet.addRows(aoa.slice(1));

    /* the other worksheets must be created manually */
    for(let i = 1; i < wb.SheetNames.length; ++i) {
      const name = wb.SheetNames[i];
      const ws = wb.Sheets[name];

      const sheet = await doc.addSheet({title: name});
      const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});
      await sheet.setHeaderRow(aoa[0])
      await sheet.addRows(aoa.slice(1));
    }
  }

})();
```

4) Replace `<google sheet ID>` with the ID of the actual document.

5) Run `node push.js` once. It will create `sheetjs.xlsx` and update the sheet.

6) Edit `sheetjs.xlsx` with some new data

7) Run `node push.js` again and watch the Google Sheet update!

</details>

### Clear the Document

Google Sheets does not allow users to delete every worksheet.  This function
deletes every worksheet after the first, then clears the first worksheet:

```js
/* clear google sheets doc */
async function doc_clear(doc) {
  /* delete all sheets after the first sheet */
  const old_sheets = doc.sheetsByIndex;
  for(let i = 1; i < old_sheets.length; ++i) await old_sheets[i].delete();

  /* clear first worksheet */
  old_sheets[0].clear();
}
```

### Update First Sheet

There are two steps: "update worksheet name" and "update worksheet data":

#### Update Sheet Name

The worksheet name is assigned by using the `updateProperties` method.  The
desired sheet name is the name of the first worksheet from the file.

```js
async function doc_update_first_sheet_name(doc, wb) {
  /* get first worksheet name */
  const wsname = wb.SheetNames[0];

  /* get first gsheet */
  const sheet = doc.sheetsByIndex[0];

  /* update worksheet name */
  await sheet.updateProperties({title: wsname});
}
```

#### Update Sheet Data

`sheet.addRows` reads an Array of Arrays of values. `XLSX.utils.sheet_to_json`
can generate this exact shape with the option `header: 1`.  Unfortunately
Google Sheets requires at least one "Header Row".  This can be implemented by
converting the entire worksheet to an Array of Arrays and setting the header
row to the first row of the result:

```js
async function doc_update_first_sheet_data(doc, wb) {
  /* get first worksheet */
  const ws = wb.Sheets[wb.SheetNames[0]];
  /* generate array of arrays from the first worksheet */
  const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});

  /* get first gsheet */
  const sheet = doc.sheetsByIndex[0];
  /* set document header row to first row of the AOA */
  await sheet.setHeaderRow(aoa[0]);

  /* add the remaining rows */
  await sheet.addRows(aoa.slice(1));
}
```

### Append Remaining Worksheets

Each name in the SheetJS Workbook `SheetNames` array maps to a worksheet.  The
list of names not including the first sheet is `wb.SheetNames.slice(1)`.

There are two steps for each sheet: "create new sheet" and "load data".

Due to JavaScript `async` idiosyncrasies, a plain `for` loop must be used:

```js
async function doc_append_remaining_sheets(doc, wb) {
  const names = wb.SheetNames.slice(1);

  /* loop across names */
  for(let i = 0; i < names.length; ++i) {
    /* wb.SheetNames[i] is the sheet name */
    const name = wb.SheetNames[i];
    /* wb.Sheets[name] is the worksheet object */
    const ws = wb.Sheets[name];

    /* create new google sheet */
    const sheet = await doc_add_new_sheet(doc, name);
    /* load sheet with data */
    await sheet_load_from_ws(sheet, ws);
  }
}
```

#### Add a New Worksheet

`doc.addSheet` accepts a properties object that includes the worksheet name:

```js
async function doc_add_new_sheet(doc, name) {
  return await doc.addSheet({title: name});
}
```

This creates a new worksheet, sets the tab name, and returns a reference to the
created worksheet.

#### Update Worksheet Data

```js
async function sheet_load_from_ws(sheet, ws) {
  /* generate array of arrays from the first worksheet */
  const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});

  /* set document header row to first row of the AOA */
  await sheet.setHeaderRow(aoa[0]);

  /* add the remaining rows */
  await sheet.addRows(aoa.slice(1));
}
```

## Raw File Exports

`node-google-spreadsheet` can download the XLSX or ODS export of the document.
The functions return NodeJS `Buffer` data that can be parsed using SheetJS.

This example prints the worksheet names and CSV exports of each sheet.

<Tabs>
  <TabItem value="xlsx" label="XLSX">

```js
const XLSX = require("xlsx");

(async() => {
  /* Connect to Google Sheet */
  const ID = "<google sheet id>";
  const doc = await require("./common")(ID);

  /* Get file export */
  // highlight-next-line
  const buf = await doc.downloadAsXLSX();

  /* Parse with SheetJS */
  const wb = XLSX.read(buf);

  /* Loop over the worksheet names */
  wb.SheetNames.forEach(name => {
    /* Print the name to the console */
    console.log(name);

    /* Get the corresponding worksheet object */
    const sheet = wb.Sheets[name];

    /* Print a CSV export of the worksheet */
    console.log(XLSX.utils.sheet_to_csv(sheet));
  });
})();
```

  </TabItem>

  <TabItem value="ods" label="ODS">

```js
const XLSX = require("xlsx");

(async() => {
  /* Connect to Google Sheet */
  const ID = "<google sheet id>";
  const doc = await require("./common")(ID);

  /* Get file export */
  // highlight-next-line
  const buf = await doc.downloadAsODS();

  /* Parse with SheetJS */
  const wb = XLSX.read(buf);

  /* Loop over the worksheet names */
  wb.SheetNames.forEach(name => {
    /* Print the name to the console */
    console.log(name);

    /* Get the corresponding worksheet object */
    const sheet = wb.Sheets[name];

    /* Print a CSV export of the worksheet */
    console.log(XLSX.utils.sheet_to_csv(sheet));
  });
})();
```

  </TabItem>
</Tabs>