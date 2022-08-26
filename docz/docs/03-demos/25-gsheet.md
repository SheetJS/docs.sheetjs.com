---
title: Google Sheets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This demo uses [`node-google-spreadsheet`](https://theoephraim.github.io/node-google-spreadsheet)
to interact with Google Sheets v4 API.

Code that does not directly relate to SheetJS APIs are tucked away.  Click on
the "click to show" blocks to see the code snippets.

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

## Exporting Document Data to a File

The goal is to create an XLSB export from a Google Sheet.  Google Sheets does
not natively support the XLSB format.  SheetJS fills the gap.  [The last subsection](#how-to-run-export-example) includes detailed instructions for running locally.

### Connecting to the Document

This uses the `common.js` helper from above:

<details><summary><b>Code</b> (click to show)</summary>

```js
/* Connect to Google Sheet */
const ID = "<google sheet id>";
const doc = await require("./common")(ID);
```

</details>

### Creating a New Workbook

`XLSX.utils.book_new()` creates an empty workbook with no worksheets:

```js
/* create a blank workbook */
const wb = XLSX.utils.book_new();
```

### Looping across the Document


`doc.sheetsByIndex` is an array of worksheets in the Google Sheet Document.

<details><summary><b>Code</b> (click to show)</summary>

```js
/* Loop across the Document sheets */
for(let i = 0; i < doc.sheetsByIndex.length; ++i) {
  const sheet = doc.sheetsByIndex[i];
  /* Get the worksheet name */
  const name = sheet.title;
  /* ... */
}
```

</details>

### Convert a Google Sheets sheet to a SheetJS Worksheet

The idea is to extract the raw data from the Google Sheet headers and combine
with the raw data rows to produce a large array of arrays.

<details><summary><b>Code</b> (click to show)</summary>

```js
  /* get the header and data rows */
  await sheet.loadHeaderRow();
  const header = sheet.headerValues;
  const rows = await sheet.getRows();

  /* construct the array of arrays */
  const aoa = [header].concat(rows.map(r => r._rawData));
```

</details>

This can be converted to a SheetJS worksheet using `XLSX.utils.aoa_to_sheet`:


```js
  /* generate a SheetJS Worksheet */
  const ws = XLSX.utils.aoa_to_sheet(aoa);
```

`XLSX.utils.book_append_sheet` will add the worksheet to the workbook:

```js
  /* add to workbook */
  XLSX.utils.book_append_sheet(wb, ws, name);
```

### Generating an XLSB file

`XLSX.writeFile` will write a file in the file system:

```js
/* write to SheetJS.xlsb */
XLSX.writeFile(wb, "SheetJS.xlsb");
```

### How to Run Export Example

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

## Updating a Document from a Local File

The goal is to refresh a Google Sheet based on a local file.  The problem can
be broken down into a few steps.  [The last subsection](#how-to-run-update-example)
includes detailed instructions for running locally.

### Reading the Workbook File

`XLSX.readFile` can read files from the file system.  The following line reads
`sheetjs.xlsx` from the current directory:

```js
const XLSX = require("xlsx");
const wb = XLSX.readFile("sheetjs.xlsx");
```

### Connecting to the Document

This uses the `common.js` helper from above:

<details><summary><b>Code</b> (click to show)</summary>

```js
/* Connect to Google Sheet */
const ID = "<google sheet id>";
const doc = await require("./common")(ID);
```

</details>

### Clearing the Document

Google Sheets does not allow users to delete every worksheet.  The snippet
deletes every worksheet after the first, then clears the first worksheet.

<details><summary><b>Code</b> (click to show)</summary>

```js
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
```

</details>

### Update First Worksheet

In the SheetJS workbook object, worksheet names are stored in the `SheetNames`
property.  The first worksheet name is `wb.SheetNames[0]`:

```js
const name = wb.SheetNames[0];
```

The `Sheets` property is an object whose keys are sheet names and whose values
are worksheet objects.

```js
const ws = wb.Sheets[name];
```

In the Google Sheet, `doc.sheetsByIndex[0]` is a reference to the first sheet:

```js
const sheet = doc.sheetsByIndex[0];
```

#### Update Sheet Name

The worksheet name is assigned by using the `updateProperties` method.  The
desired sheet name is the name of the first worksheet from the file.

```js
/* update worksheet name */
await sheet.updateProperties({title: name});
```

#### Update Worksheet Data

`sheet.addRows` reads an Array of Arrays of values. `XLSX.utils.sheet_to_json`
can generate this exact shape with the option `header: 1`.  Unfortunately
Google Sheets requires at least one "Header Row".  This can be implemented by
converting the entire worksheet to an Array of Arrays and setting the header
row to the first row of the result:

```js
/* generate array of arrays from the first worksheet */
const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});

/* set document header row to first row of the AOA */
await sheet.setHeaderRow(aoa[0]);

/* add the remaining rows */
await sheet.addRows(aoa.slice(1));
```

### Add the Other Worksheets

Each name in the SheetJS Workbook `SheetNames` array maps to a worksheet.  The
loop over the remaining worksheet names looks like

```js
for(let i = 1; i < wb.SheetNames.length; ++i) {
  /* wb.SheetNames[i] is the sheet name */
  const name = wb.SheetNames[i];
  /* wb.Sheets[name] is the worksheet object */
  const ws = wb.Sheets[name];
  /* ... */
}
```

#### Appending a Worksheet to the Document

`doc.addSheet` accepts a properties object that includes the worksheet name:

```js
  const sheet = await doc.addSheet({title: name});
```

This creates a new worksheet, sets the tab name, and returns a reference to the
created worksheet.

#### Update Worksheet Data

This is identical to the first worksheet code:

```js
  /* generate array of arrays from the first worksheet */
  const aoa = XLSX.utils.sheet_to_json(ws, {header: 1});

  /* set document header row to first row of the AOA */
  await sheet.setHeaderRow(aoa[0]);

  /* add the remaining rows */
  await sheet.addRows(aoa.slice(1));
```

### How to Run Update Example

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

## Using the Raw File Exports

`node-google-spreadsheet` can download the XLSX or ODS export of the document.
The functions return NodeJS `Buffer` data that can be parsed using SheetJS.

<details><summary><b>Sample Code</b> (click to show)</summary>

SheetJS can read data from XLSX files and ODS files.  This example prints the
worksheet names and CSV exports of each sheet.

<Tabs>
  <TabItem value="xlsx" label="XLSX">

```js
const XLSX = require("xlsx");

/* Connect to Google Sheet */
const ID = "<google sheet id>";
const doc = await require("./common")(ID);

/* Get XLSX export */
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
```

  </TabItem>

  <TabItem value="ods" label="ODS">

```js
const XLSX = require("xlsx");

/* Connect to Google Sheet */
const ID = "<google sheet id>";
const doc = await require("./common")(ID);

/* Get XLSX export */
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
```

  </TabItem>
</Tabs>

</details>