---
sidebar_position: 4
---

# Excel JavaScript API

Office 2016 introduced a JavaScript API for interacting with the application.
It offers solutions for custom functions as well as task panes.

Excel currently does not provide support for working with Apple Numbers files
and some legacy file formats.  SheetJS fills the gap.

This demo creates a new custom function to add much-needed functionality:

- `SHEETJS.EXTERN()` tries to fetch an external spreadsheet and insert the data
into the worksheet.

This demo focuses on the basic mechanics.  Advanced topics like Excel Custom
Function parameters are covered in the official Office JavaScript API docs.
SheetJS worksheet metadata and other properties are covered in this doc site.

## Creating a new Add-in

<details><summary><b>Initial Platform Setup</b> (click to show)</summary>

The tool for generating Office Add-ins depends on NodeJS and various libraries.
[Install NodeJS](https://nodejs.org/) and the required dependencies:

```powershell
npm install -g yo bower generator-office
```

</details>

<details><summary><b>Creating a new Project</b> (click to show)</summary>

Run `yo office` from the command line.  It will ask a few questions.

- "Choose a project type": "Excel Custom Functions Add-in project"

- "Choose a script type": "JavaScript",

- "What do you want to name your add-in?": "SheetJSImport"

You will see a screen like

```
? Choose a project type: Excel Custom Functions Add-in project
? Choose a script type: JavaScript
? What do you want to name your add-in? SheetJSImport

----------------------------------------------------------------------------------

      Creating SheetJSImport add-in for Excel using JavaScript and Excel-functions
at C:\Users\SheetJS\Documents\SheetJSImport

----------------------------------------------------------------------------------
```

It helpfully prints out the next steps:

```powershell
cd SheetJSImport
npm run build
npm start
```

If you have [VSCodium](https://vscodium.com/) installed, the folder can be opened with

```powershell
codium .
```

</details>

Running `npm start` will open up a terminal window and a new Excel window with
the loaded add-in.  Keep the terminal window open (it can be minimized).  When
you make a change, close both the Excel window and the terminal window before
running `npm start` again.

## Integrating the SheetJS Library

The library can be installed like any other NodeJS module:

```powershell
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

To be sure the library is loaded, remove all of the existing functions from
`src\functions\functions.js`.  The new contents should be

```js src\functions\functions.js
var XLSX = require("xlsx");

/**
 * Print SheetJS Library Version
 * @customfunction
 * @returns {string[][]} The SheetJS Library Version.
 */
function version() {
  return [[XLSX.version]];
}
```

The `manifest.xml` should also be updated to reflect the function namespace:

```xml
        <bt:String id="Functions.Namespace" DefaultValue="SHEETJS"/>
```

After making the change, save the files.  Close the terminal window and the
Excel window (do not save the Excel file).  Re-run `npm start`.

In the new Excel window, enter the formula `=SHEETJS.VERSION()` in cell E1. You
should see something similar to the following screenshot:

![`SHEETJS.VERSION` output](pathname:///files/xlcfversion.png)

This indicates that the SheetJS library has been loaded.

## Dynamic Arrays and SheetJS Array of Arrays

The [`sheet_to_json`](../../api/utilities#json) helper function can generate
arrays of arrays of values based on the worksheet data.  Excel custom functions
transparently treat these as Dynamic Arrays.

## Fetching Files from the Internet

For the next step, we will try to fetch data from an external resource.
<https://sheetjs.com/pres.numbers> is an Apple Numbers file.  Excel does not
understand Numbers files and it will not open them.

<details><summary><b>Excel bug related to `fetch`</b> (click to show)</summary>

`fetch` is available to custom functions:

```js
async function extern() {
  try {
    const url = "https://sheetjs.com/pres.numbers"; // URL to download
    const res = await fetch(url); // fetch data
    const ab = await res.arrayBuffer(); // get data as an array buffer

    // DO SOMETHING WITH THE DATA HERE

  } catch(e) { return e; } // pass error back to Excel
}
```

When fetching data, functions typically receive an `ArrayBuffer` which stores
the file data.  This is readily parsed with `read`:

```js
var wb = XLSX.read(ab); // parse workbook
```

**This is how it should work**.

[There are outstanding bugs in Excel.](https://github.com/OfficeDev/office-js/issues/2186)

For the purposes of this demo, a Base64-encoded file will be used.  The
workaround involves fetching that Base64 file, getting the text, and parsing
with the [`base64` type:](../../api/parse-options#input-type)

```js
async function extern() {
  try {
    const url = "https://sheetjs.com/pres.numbers.b64"; // URL to download
    const res = await fetch(url); // fetch data
    const text = await res.text(); // get data as an array buffer

    var wb = XLSX.read(text, { type: "base64" });
    // DO SOMETHING WITH THE DATA HERE

  } catch(e) { return e; } // pass error back to Excel
}
```

Base64-encoded files can be generated with PowerShell:

```powershell
[convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path "path\to\file"))) > file.b64
```

</details>


The `.Sheets` property of the workbook object holds all of the worksheets and
the `.SheetNames` property is an array of worksheet names.  Picking the first
worksheet is fairly straightforward:

```js
var ws = wb.Sheets[wb.SheetNames[0]]; // get first worksheet
```

This data can be converted to an Array of Arrays in one line:

```js
var aoa = XLSX.utils.sheet_to_json(ws, {header: 1}); // get data as array of arrays
```

To demonstrate the parsing ability, a Base64-encoded version of the file will
be used.  This file contains no binary characters and should "just work".  Once
the aforementioned Excel bug is fixed, the non-Base64 version can be used.

This new function should be added to `src\functions\functions.js`:

```js src\functions\functions.js
/**
 * Download file and write data
 * @customfunction
 * @returns {any[][]} Worksheet data
 */
async function extern() {
  try {
    /* URL */
    // const url = "https://sheetjs.com/pres.numbers"; // Once Excel bug is fixed
    const url = "https://sheetjs.com/pres.numbers.b64"; // workaround

    /* Fetch Data */
    const res = await fetch(url);

    /* Get Data */
    // const ab = await res.arrayBuffer(); // Once Excel bug is fixed
    const b64 = await res.text(); // workaround

    /* Parse Data */
    // var wb = XLSX.read(ab); // Once Excel bug is fixed
    var wb = XLSX.read(b64, { type: "base64" }); // workaround

    /* get and return data */
    var ws = wb.Sheets[wb.SheetNames[0]]; // get first worksheet
    var aoa = XLSX.utils.sheet_to_json(ws, { header: 1 }); // get data as array of arrays
    return [[url]];
  } catch(e) { return [[e]]; } // pass error back to Excel
}
```

After making the change, save the files.  Close the terminal window and the
Excel window (do not save the Excel file).  Re-run `npm start`.

Enter the formula `=SHEETJS.EXTERN()` in cell D1 and hit Enter.  Excel should
pull in the data and generate a dynamic array:

![`SHEETJS.VERSION` output](pathname:///files/xlcfextern1.png)

[SheetJS Pro](https://sheetjs.com/pro) offers additional features that can be
used in Excel Custom Functions and Add-ins