---
sidebar_position: 3
---

# Adobe Apps

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Photoshop, InDesign and other Adobe Creative Suite applications offer extension
support.  Over the years there have been a few different JavaScript platforms:

- "ExtendScript": This uses an old JavaScript dialect but is supported in older
  versions of Creative Suite and Creative Cloud.

- "CEP": This was recommended in CS6 but eventually deprecated.

- "UXP": This is the current Adobe recommendation for new CC extensions.

This demo intends to cover the SheetJS-related parts.  General setup as well as
general Adobe considerations are not covered here.  A basic familiarity with
extension development is assumed.

## ExtendScript Scripts

[Installation is straightforward:](../../installation/extendscript) download a
script and move it to your project directory.

### Reading Files

`XLSX.readFile` can directly accept an absolute URI:

```js
var workbook = XLSX.readFile("~/Documents/test.xlsx");
```

The path can be user-configurable using `File.openDialog`:

```js
/* Show File Picker */
var thisFile = File.openDialog("Select a spreadsheet");
if(!thisFile) { alert("File not found!"); return; }

/* Read file from disk */
var workbook = XLSX.readFile(thisFile.absoluteURI);
```

<details open><summary><b>Complete Example</b> (click to hide)</summary>

In this example, the script will show a dialog to select a file.  After reading
the file, the workbook Author property will be extracted and the Photoshop doc
author (`activeDocument.info.author`) will be changed accordingly.

This demo was verified in Photoshop CS6 64-bit on Windows 10.

```js
#target photoshop
#include "xlsx.extendscript.js";

function main_parse() {
  /* Show File Picker */
  var thisFile = File.openDialog("Select a spreadsheet");
  if(!thisFile) { alert("File not found!"); return; }

  /* Read file from disk */
  var workbook = XLSX.readFile(thisFile.absoluteURI);

  /* Get Workbook Author */
  var Props = workbook.Props; if(!Props) { alert("Missing Author!"); return; }
  var Author = Props.Author; if(!Author) { alert("Missing Author!"); return; }

  /* Change Document Author to Workbook Author */
  var info = activeDocument.info;
  alert("Changing Author from |" + info.author + "| to |" + Author + "|");
  info.author = Author;
}

main_parse();
```

0) Download the [test workbook](pathname:///files/SheetJS.xlsb).

1) Download the following scripts:
- [`xlsx.extendscript.js`](https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.extendscript.js)
- [`parse.jsx`](pathname:///live/parse.jsx)

and place in the scripts directory.  For CS6 Windows 10 the path is typically

`C:\Program Files\Adobe\Adobe Photoshop CS6 (64 Bit)\Presets\Scripts`

2) Restart Photoshop and open a file (or create a new one)

3) File > Scripts > parse and select the test workbook

4) An alert will confirm that the file was read and the author will be changed:

!["Changing Author" popup](pathname:///files/psparse.png)

5) File > File Info... should show the updated Author field!

</details>

### Writing Files

`XLSX.writeFile` can directly accept an absolute URI:

```js
XLSX.writeFile(workbook, "~/Documents/test.xlsx");
```

The path can be user-configurable using `File.saveDialog`:

```js
/* Show File Picker */
var thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");
if(!thisFile) { alert("File not found!"); return; }

/* Write file to disk */
XLSX.writeFile(workbook, thisFile.absoluteURI);
```

<details open><summary><b>Complete Example</b> (click to hide)</summary>

In this example, the script will show a dialog to select an output file.  Once
selected, the library will create a new workbook with one worksheet.  Cell A1
will be "Author" and cell B1 will be the active Photoshop document Author.
The PS author is available as `activeDocument.info.author`.

This demo was verified in Photoshop CS6 64-bit on Windows 10.

```js
#target photoshop
#include "xlsx.extendscript.js";

function main_write() {
  /* Show File Picker */
  var thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");
  if(!thisFile) { alert("File not found!"); return; }

  /* Create new Worksheet */
  var ws = XLSX.utils.aoa_to_sheet([
    ["Author", activeDocument.info.author]
  ]);

  /* Create new Workbook and add worksheet */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  /* Write file to disk */
  XLSX.writeFile(wb, thisFile.absoluteURI);
  alert("Created File " + thisFile.absoluteURI);
}

main_write();
```

1) Download the following scripts:
- [`xlsx.extendscript.js`](https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.extendscript.js)
- [`write.jsx`](pathname:///live/write.jsx)

and place in the scripts directory.  For CS6 Windows 10 the path is typically

`C:\Program Files\Adobe\Adobe Photoshop CS6 (64 Bit)\Presets\Scripts`

2) Restart Photoshop and open a file (or create a new one)

3) File > File Info ... and confirm there is an Author. If not, set to `SheetJS`

4) File > Scripts > write and use the popup to select the Documents folder.
   Enter `SheetJSPSTest.xlsx` and hit "Save"

4) An alert will confirm that the file was created:

!["Created File" popup](pathname:///files/pswrite.png)

5) Open the generated `SheetJSPSTest.xlsx` file and compare to Photoshop author

</details>

## CEP

[The standalone scripts](../../installation/standalone) can be added to CEP
extension HTML

## UXP

UXP officially recommends `require` and NodeJS Modules for third party support.

[Use the "Frameworks" instructions to download.](../../installation/frameworks)

