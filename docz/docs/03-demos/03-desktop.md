---
title: Desktop Applications
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Web technologies like JavaScript and HTML have been adapted to the traditional
app space.  Typically these frameworks bundle a JavaScript engine as well as a
windowing framework. SheetJS is compatible with many app frameworks.

## NW.js

The [Standalone scripts](../getting-started/installation/standalone) can be
referenced in a `SCRIPT` tag from the entry point HTML page.

This demo was tested against NW.js 0.66.0.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a `package.json` file that specifies the entry point:

```json title="package.json"
{
  "name": "sheetjs-nwjs",
  "author": "sheetjs",
  "version": "0.0.0",
  "main": "index.html",
  "dependencies": {
    "nw": "~0.66.0",
    "xlsx": "https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz"
  }
}
```

2) Download [`index.html`](pathname:///nwjs/index.html) into the same folder.

:::caution

Right-click the link and select "Save Link As...".  Left-clicking the link will
try to load the page in your browser.  The goal is to save the file contents.

:::

3) Run `npm install` to install dependencies

4) To verify the app works, run in the test environment:

```
npx nw .
```

The app will show and you should be able to verify reading and writing by using
the file input element to select a spreadsheet and clicking the export button.

5) To build a standalone app, run the builder:

```
npx -p nw-builder nwbuild --mode=build .
```

This will generate the standalone app in the `build\sheetjs-nwjs\` folder.

</details>

### Reading data

The standard HTML5 `FileReader` techniques from the browser apply to NW.js!

NW.js handles the OS minutiae for dragging files into app windows.  The
[drag and drop snippet](../solutions/input#example-user-submissions) apply
to DIV elements on the page.

Similarly, file input elements automatically map to standard Web APIs.

For example, assuming a file input element on the page:

```html
<input type="file" name="xlfile" id="xlf" />
```

The event handler would process the event as if it were a web event:

```js
async function handleFile(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
document.getElementById("xlf").addEventListener("change", handleFile, false);
```

### Writing data

File input elements with the attribute `nwsaveas` show UI for saving a file. The
standard trick is to generate a hidden file input DOM element and "click" it.
Since NW.js does not present a `writeFileSync` in the `fs` package, a manual
step is required:

```js
/* pre-build the hidden nwsaveas input element */
var input = document.createElement('input');
input.style.display = 'none';
input.setAttribute('nwsaveas', 'SheetJSNWDemo.xlsx');
input.setAttribute('type', 'file');
document.body.appendChild(input);

/* show a message if the save is canceled */
input.addEventListener('cancel',function(){ alert("Save was canceled!"); });

/* write to a file on the 'change' event */
input.addEventListener('change',function(e){
  /* the `value` is the path that the program will write */
  var filename = this.value;

  /* use XLSX.write with type "buffer" to generate a buffer" */
  /* highlight-next-line */
  var wbout = XLSX.write(workbook, {type:'buffer', bookType:"xlsx"});
  /* highlight-next-line */
  fs.writeFile(filename, wbout, function(err) {
    if(!err) return alert("Saved to " + filename);
    alert("Error: " + (err.message || err));
  });
});

input.click();
```

## Electron

The [NodeJS Module](../getting-started/installation/nodejs) can be imported
from the main or the renderer thread.

Electron presents a `fs` module.  The `require('xlsx')` call loads the CommonJS
module, so `XLSX.readFile` and `XLSX.writeFile` work in the renderer thread.

This demo was tested against Electron 19.0.5 on an Intel Mac (`darwin-x64`).

<details><summary><b>Complete Example</b> (click to show)</summary>

This demo includes a drag-and-drop box as well as a file input box, mirroring
the [SheetJS Data Preview Live Demo](http://oss.sheetjs.com/sheetjs/)

The core data in this demo is an editable HTML table.  The readers build up the
table using `sheet_to_html` (with `editable:true` option) and the writers scrape
the table using `table_to_book`.

The demo project is wired for `electron-forge` to build the standalone binary.

1) Download the demo files:

- [`package.json`](pathname:///electron/package.json) : project structure
- [`main.js`](pathname:///electron/main.js) : main process script
- [`index.html`](pathname:///electron/index.html) : window page
- [`index.js`](pathname:///electron/index.js) : script loaded in render context

:::caution

Right-click each link and select "Save Link As...".  Left-clicking a link will
try to load the page in your browser.  The goal is to save the file contents.

:::

2) Run `npm install` to install dependencies.

3) To verify the app works, run in the test environment:

```bash
npx -y electron .
```

The app will show and you should be able to verify reading and writing by using
the relevant buttons to open files and clicking the export button.

4) To build a standalone app, run the builder:

```bash
npm run make
```

This will generate the standalone app in the `out\sheetjs-electron-...` folder.
For a recent Intel Mac, the path will be `out/sheetjs-electron-darwin-x64/`

</details>

### Writing Files

[`XLSX.writeFile`](../api/write-options) writes workbooks to the file system.
`showSaveDialog` shows a Save As dialog and returns the selected file name:

```js
/* from the renderer thread */
const electron = require('@electron/remote');

/* this function will show the save dialog and try to write the workbook */
async function exportFile(workbook) {
  /* show Save As dialog */
  const result = await electron.dialog.showSaveDialog({
    title: 'Save file as',
    filters: [{
      name: "Spreadsheets",
      extensions: ["xlsx", "xls", "xlsb", /* ... other formats ... */]
    }]
  });
  /* write file */
  // highlight-next-line
  XLSX.writeFile(workbook, result.filePath);
}
```

:::note

In older versions of Electron, `showSaveDialog` returned the path directly:

```js
var dialog = require('electron').remote.dialog;

function exportFile(workbook) {
  var result = dialog.showSaveDialog();
  XLSX.writeFile(workbook, result);
}
```

:::

### Reading Files

Electron offers 3 different ways to read files, two of which use Web APIs.

**File Input Element**

File input elements automatically map to standard Web APIs.

For example, assuming a file input element on the page:

```html
<input type="file" name="xlfile" id="xlf" />
```

The event handler would process the event as if it were a web event:

```js
async function handleFile(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
document.getElementById("xlf").addEventListener("change", handleFile, false);
```

**Drag and Drop**

The [drag and drop snippet](../solutions/input#example-user-submissions)
applies to DIV elements on the page.

For example, assuming a DIV on the page:

```html
<div id="drop">Drop a spreadsheet file here to see sheet data</div>
```

The event handler would process the event as if it were a web event:

```js
async function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
document.getElementById("drop").addEventListener("drop", handleDrop, false);
```

**Electron API**

[`XLSX.readFile`](../api/parse-options) reads workbooks from the file system.
`showOpenDialog` shows a Save As dialog and returns the selected file name.
Unlike the Web APIs, the `showOpenDialog` flow can be initiated by app code:

```js
/* from the renderer thread */
const electron = require('@electron/remote');

/* this function will show the open dialog and try to parse the workbook */
async function importFile() {
  /* show Save As dialog */
  const result = await electron.dialog.showOpenDialog({
    title: 'Select a file',
    filters: [{
      name: "Spreadsheets",
      extensions: ["xlsx", "xls", "xlsb", /* ... other formats ... */]
    }]
  });
  /* result.filePaths is an array of selected files */
  if(result.filePaths.length == 0) throw new Error("No file was selected!");
  // highlight-next-line
  return XLSX.readFile(result.filePaths[0]);
}
```

:::note

In older versions of Electron, `showOpenDialog` returned the path directly:

```js
var dialog = require('electron').remote.dialog;

function importFile(workbook) {
  var result = dialog.showOpenDialog({ properties: ['openFile'] });
  return XLSX.readFile(result[0]);
}
```

:::

### Electron Breaking Changes

The first version of this demo used Electron 1.7.5.  The current demo includes
the required changes for Electron 19.0.5.

There are no Electron-specific workarounds in the library, but Electron broke
backwards compatibility multiple times.  A summary of changes is noted below.

:::caution

Electron 6.x changed the `dialog` API. Methods like `showSaveDialog` originally
returned an array of strings, but now returns a `Promise`.  This change was not
documented. [Electron issue](https://github.com/electron/electron/issues/24438)

Electron 9.0.0 and later require the preference `nodeIntegration: true` in order
to `require('xlsx')` in the renderer process.

Electron 12.0.0 and later also require `worldSafeExecuteJavascript: true` and
`contextIsolation: true`.

Electron 14+ must use `@electron/remote` instead of `remote`.  An `initialize`
call is required to enable Developer Tools in the window.

:::

## Tauri

The [NodeJS Module](../getting-started/installation/nodejs) can be imported
from JavaScript code.

This demo was tested against Tauri 1.0.5 on 2022 August 13.

:::note

Tauri currently does not provide the equivalent of NodeJS `fs` module.  The raw
`@tauri-apps/api` methods used in the examples are not expected to change.

:::

`http` and `dialog` must be explicitly allowed in `tauri.conf.json`:

```json title="tauri.conf.json"
    "allowlist": {
      "all": true,
      "http": {
        "all": true,
        "request": true,
        "scope": ["https://**"]
      },
      "dialog": {
        "all": true
      }
```

The "Complete Example" creates an app that looks like the screenshot:

![SheetJS Tauri MacOS screenshot](pathname:///tauri/macos.png)

<details><summary><b>Complete Example</b> (click to show)</summary>

0) [Read Tauri "Getting Started" guide and install dependencies.](https://tauri.app/v1/guides/getting-started/prerequisites)

1) Create a new Tauri app:

```bash
npm create tauri-app
```

When prompted:

- App Name: `SheetJSTauri`
- Window Title: `SheetJS + Tauri`
- UI recipe: `create-vite`
- Add "@tauri-apps/api": `Y`
- ViteJS template: `vue-ts`

2) Enter the directory:

```bash
cd SheetJSTauri
```

Open `package.json` with a text editor and add the highlighted lines:

```json title="package.json"
{
  "name": "SheetJSTauri",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "tauri": "tauri"
  },
  "dependencies": {
// highlight-next-line
    "@tauri-apps/api": "^1.0.2",
    "vue": "^3.2.37",
// highlight-next-line
    "xlsx": "https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz"
  },
  "devDependencies": {
// highlight-next-line
    "@tauri-apps/cli": "^1.0.5",
    "@vitejs/plugin-vue": "^3.0.3",
    "typescript": "^4.6.4",
    "vite": "^3.0.7",
    "vue-tsc": "^0.39.5"
  }
}
```

3) Install dependencies:

```bash
npm install --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

4) Enable operations by adding the highlighted lines to `tauri.conf.json`:

```json title="src-tauri/tauri.conf.json"
  "tauri": {
    "allowlist": {
// highlight-start
      "http": {
        "all": true,
        "request": true,
        "scope": ["https://**"]
      },
      "dialog": {
        "all": true
      },
// highlight-end
      "all": true
    }
```

In the same file, look for the `"identifier"` key and replace the value with `com.sheetjs.tauri`:

```json title="src-tauri/tauri.conf.json"
        "icons/icon.ico"
      ],
      // highlight-next-line
      "identifier": "com.sheetjs.tauri",
      "longDescription": "",
```


5) Download [`App.vue`](pathname:///tauri/App.vue) and replace `src/App.vue`
   with the downloaded script.

6) Build the app with

```bash
npm run tauri build
```

At the end, it will print the path to the generated program. Run the program!

</details>

### Reading Files

There are two steps to reading files: obtaining a path and reading binary data:

```js
import { read } from 'xlsx';
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';

const filters = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  // ... other desired formats ...
];

async function openFile() {
  /* show open file dialog */
  const selected = await open({
    title: "Open Spreadsheet",
    multiple: false,
    directory: false,
    filters
  });

  /* read data into a Uint8Array */
  const d = await readBinaryFile(selected);

  /* parse with SheetJS */
  const wb = read(d);
  return wb;
}
```

### Writing Files

There are two steps to writing files: obtaining a path and writing binary data:

```js
import { write } from 'xlsx';
import { save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';

const filters = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  // ... other desired formats ...
];

async function saveFile(wb) {
  /* show save file dialog */
  const selected = await save({
    title: "Save to Spreadsheet",
    filters
  });

  /* Generate workbook */
  const bookType = selected.slice(selected.lastIndexOf(".") + 1);
  const d = write(wb, {type: "buffer", bookType});

  /* save data to file */
  await writeBinaryFile(selected, d);
}
```

## Wails

The [NodeJS Module](../getting-started/installation/nodejs) can be imported
from JavaScript code.

This demo was tested against Wails `v2.0.0-beta.44.2` on 2022 August 31 using
the Svelte TypeScript starter.

:::caution

Wails currently does not provide the equivalent of NodeJS `fs` module.

The HTML File Input Element does not show a file picker.  This is a known bug.

All raw file operations must be performed in Go code.

:::


The "Complete Example" creates an app that looks like the screenshot:

![SheetJS Wails MacOS screenshot](pathname:///wails/macos.png)

<details><summary><b>Complete Example</b> (click to show)</summary>

0) [Read Wails "Getting Started" guide and install dependencies.](https://wails.io/docs/gettingstarted/installation)

1) Create a new Wails app:

```bash
wails init -n sheetjs-wails -t svelte-ts
```

2) Enter the directory:

```bash
cd sheetjs-wails
```

3) Install front-end dependencies:

```bash
cd frontend
curl -L -o src/assets/logo.png https://sheetjs.com/sketch1024.png
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
cd ..
```

4) Download source files:

- Download [`app.go`](pathname:///wails/app.go) and replace `app.go`
- Download [`App.svelte`](pathname:///wails/App.svelte) and replace
  `frontend/src/App.svelte`

5) Build the app with

```bash
wails build
```

At the end, it will print the path to the generated program. Run the program!

</details>

All operations must be run from Go code.  This example passes Base64 strings.

### Reading Files

The file picker and reading operations can be combined in one Go function.

#### Go

```go
import (
  "context"
// highlight-start
  "encoding/base64"
  "io/ioutil"
  "github.com/wailsapp/wails/v2/pkg/runtime"
// highlight-end
)

type App struct {
  ctx context.Context
}

// ReadFile shows an open file dialog and returns the data as Base64 string
func (a *App) ReadFile() string {
  // highlight-next-line
  selection, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
    Title: "Select File",
    Filters: []runtime.FileFilter{
      { DisplayName: "Excel Workbooks (*.xlsx)", Pattern: "*.xlsx", },
      // ... more filters for more file types
    },
  })
  if err != nil { return "" } // The demo app shows an error message
  // highlight-next-line
  data, err := ioutil.ReadFile(selection)
  if err != nil { return "" } // The demo app shows an error message
  // highlight-next-line
  return base64.StdEncoding.EncodeToString(data)
}
```

#### JS

Wails will automatically create `window.go.main.App.ReadFile` for use in JS:

```js title="frontend/src/App.svelte"
import { read, utils } from 'xlsx';

async function importFile(evt) {
// highlight-start
  const b64 = window['go']['main']['App']['ReadFile']();
  const wb = read(b64, { type: "base64" });
// highlight-end
  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
  html = utils.sheet_to_html(ws); // generate HTML and update state
}
```

### Writing Files

There is a multi-part dance since the library needs the file extension.

1) Show the save file picker in Go, pass back to JS

2) Generate the file data in JS, pass the data back to Go

3) Write to file in Go

##### Go

Two Go functions will be exposed.

- `SaveFile` will show the file picker and return the path:

```go
import (
  "context"
// highlight-start
  "github.com/wailsapp/wails/v2/pkg/runtime"
// highlight-end
)

type App struct {
  ctx context.Context
}

func (a *App) SaveFile() string {
// highlight-next-line
  selection, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
    Title: "Select File",
    DefaultFilename: "SheetJSWails.xlsx",
    Filters: []runtime.FileFilter{
      { DisplayName: "Excel Workbooks (*.xlsx)", Pattern: "*.xlsx", },
      // ... more filters for more file types
    },
  })
  if err != nil { return "" } // The demo app shows an error message
  return selection
}
```

- `WriteFile` performs the file write given a Base64 string and file path:

```go
import (
  "context"
// highlight-start
  "encoding/base64"
  "io/ioutil"
// highlight-end
)

type App struct {
  ctx context.Context
}

func (a *App) WriteFile(b64 string, path string) {
  // highlight-start
  buf, _ := base64.StdEncoding.DecodeString(b64);
  _ = ioutil.WriteFile(path, buf, 0644);
  // highlight-end
}
```

#### JS

Wails will automatically create bindings for use in JS:

```js
import { utils, write } from 'xlsx';

async function exportFile(wb) {
  /* generate workbook */
  const elt = tbl.getElementsByTagName("TABLE")[0];
  const wb = utils.table_to_book(elt);

  /* show save picker and get path */
  const path = await window['go']['main']['App']['SaveFile']();

  /* generate base64 string based on the path */
  const b64 = write(wb, { bookType: path.slice(path.lastIndexOf(".")+1), type: "base64" });

  /* write to file */
  await window['go']['main']['App']['WriteFile'](b64, path);
  // The demo shows a success message at this point
}
```

## NeutralinoJS

The [Standalone build](../getting-started/installation/standalone) can be added
to the entry `index.html`

This demo was tested against "binaries" `4.7.0` and "client" `3.6.0`

:::note

NeutralinoJS currently does not provide the equivalent of NodeJS `fs` module.
The raw `Neutralino.filesystem` and `Neutralino.os` methods are used.

:::

The `os` and `filesystem` modules must be enabled in `neutralino.conf.json`.
The starter already enables `os` so typically one line must be added:

```json title="neutralino.config.json"
  "nativeAllowList": [
    "app.*",
    "os.*",
// highlight-next-line
    "filesystem.*",
    "debug.log"
  ],
```

The "Complete Example" creates an app that looks like the screenshot:

![SheetJS NeutralinoJS MacOS screenshot](pathname:///neu/macos.png)

:::caution

At the time of writing, `filters` did not work as expected on MacOS.  They have
been omitted in the example and commented in the code snippets

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

The app core state will be the HTML table.  Reading files will add the table to
the window.  Writing files will parse the table into a spreadsheet.

1) Create a new NeutralinoJS app:

```bash
npx @neutralinojs/neu create sheetjs-neu
cd sheetjs-neu
```

2) Download the standalone script and place in `resources/js/main.js`:

```bash
curl -L -o resources/js/xlsx.full.min.js https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js
```

3) Add the highlighted lines to `neutralino.conf.json` in `nativeAllowList`:

```json title="neutralino.config.json"
  "nativeAllowList": [
    "app.*",
// highlight-start
    "os.*",
    "filesystem.*",
// highlight-end
    "debug.log"
  ],
```

4) Set up skeleton app and print version info:

- Edit `resources/index.html` and replace the `<body>` with the code below:

```html title="resources/index.html"
  <body>
    <div id="neutralinoapp">
      <h1>SheetJS × NeutralinoJS</h1>
      <button onclick="importData()">Import Data</button>
      <button onclick="exportData()">Export Data</button>
      <div id="info"></div>
    </div>
    <script src="js/neutralino.js"></script>
    <!-- Load the browser build and make XLSX available to main.js -->
    <script src="js/xlsx.full.min.js"></script>
    <script src="js/main.js"></script>
  </body>
```

- Append the following code to `resources/styles.css` to center the table:

```css title="resources/styles.css"
#info {
    width:100%;
    text-align: unset;
}
table {
    margin: 0 auto;
}
```

- Print the version number in the `showInfo` method of `resources/js/main.js`:

```js title="resources/js/main.js"
        ${NL_APPID} is running on port ${NL_PORT}  inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
// highlight-start
        <br/><br/>
        <span>SheetJS version ${XLSX.version}</span>
// highlight-end
        `;
```

5) Run the app:

```bash
npx @neutralinojs/neu run
```

You should see `SheetJS Version ` followed by the library version number.

6) Add the following code to the bottom of `resources/js/main.js`:

```js
(async() => {
  const ab = await (await fetch("https://sheetjs.com/pres.numbers")).arrayBuffer();
  const wb = XLSX.read(ab);
  const ws = wb.Sheets[wb.SheetNames[0]];
  document.getElementById('info').innerHTML = XLSX.utils.sheet_to_html(ws);
})();
```

Save the source file, close the app and re-run the command from step 5.

When the app loads, a table should show in the main screen.

7) Add `importFile` and `exportFile` to the bottom of `resources/js/main.js`:

```js
async function importData() {
  /* show open dialog */
  const [filename] = await Neutralino.os.showOpenDialog('Open a spreadsheet');

  /* read data */
  const ab = await Neutralino.filesystem.readBinaryFile(filename);
  const wb = XLSX.read(ab);

  /* make table */
  const ws = wb.Sheets[wb.SheetNames[0]];
  document.getElementById('info').innerHTML = XLSX.utils.sheet_to_html(ws);
}

async function exportData() {
    /* show save dialog */
  const filename = await Neutralino.os.showSaveDialog('Save to file');

  /* make workbook */
  const tbl = document.getElementById('info').querySelector("table");
  const wb = XLSX.utils.table_to_book(tbl);

  /* make file */
  const bookType = filename.slice(filename.lastIndexOf(".") + 1);
  const data = XLSX.write(wb, { bookType, type: "buffer" });
  await Neutralino.filesystem.writeBinaryFile(filename, data);
}
```

Save the source file, close the app and re-run the command from step 5.

When the app loads, click the "Import File" button and select a spreadsheet to
see the contents.  Click "Export File" and enter `SheetJSNeu.xlsx` to write.

8) Build production apps:

```bash
npx @neutralinojs/neu run
```

Platform-specific programs will be created in the `dist` folder.

</details>

### Reading Files

There are two steps to reading files: obtaining a path and reading binary data:

```js
const filters = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
]

async function openFile() {
  /* show open file dialog */
  const [filename] = await Neutralino.os.showOpenDialog(
    'Open a spreadsheet',
    { /* filters, */ multiSelections: false }
  );

  /* read data into an ArrayBuffer */
  const ab = await Neutralino.filesystem.readBinaryFile(filename);

  /* parse with SheetJS */
  const wb = XLSX.read(ab);
  return wb;
}
```

This method can be called from a button click or other event.

### Writing Files

There are two steps to writing files: obtaining a path and writing binary data:

```js
const filters = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
]

async function saveFile(wb) {
  /* show save file dialog */
  const filename = await Neutralino.os.showSaveDialog(
    'Save to file',
    { /* filters */ }
  );

  /* Generate workbook */
  const bookType = filename.slice(filename.lastIndexOf(".") + 1);
  const data = XLSX.write(wb, { bookType, type: "buffer" });

  /* save data to file */
  await Neutralino.filesystem.writeBinaryFile(filename, data);
}
```

## React Native Windows

The [NodeJS Module](../getting-started/installation/nodejs) can be imported
from the main app script.  File operations must be written in native code.

This demo was tested against `v0.69.6` on 2022 September 07 in Windows 10.

:::warning

There is no simple standalone executable file at the end of the process.

[The official documentation describes distribution strategies](https://microsoft.github.io/react-native-windows/docs/native-code#distribution)

:::

React Native Windows use [Turbo Modules](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules)

<details><summary><b>Complete Example</b> (click to show)</summary>

:::note

React Native Windows supports writing native code in C++ or C#.  This demo has
been tested against both application types.

:::

0) Follow the ["Getting Started" guide](https://microsoft.github.io/react-native-windows/docs/getting-started)

1) Create a new project using React Native `0.69`:

```powershell
npx react-native init SheetJSWin --template react-native@^0.69.0
cd .\SheetJSWin\
```

Create the Windows part of the application:

<Tabs groupId="rnwlang">
  <TabItem value="cs" label="C#">

```powershell
npx react-native-windows-init --no-telemetry --overwrite --language=cs
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```powershell
npx react-native-windows-init --no-telemetry --overwrite
```

  </TabItem>
</Tabs>

Install library:

```powershell
npm install --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

To ensure that the app works, launch the app:

```powershell
npx react-native run-windows --no-telemetry
```

<Tabs groupId="rnwlang">
  <TabItem value="cs" label="C#">

2) Create the file `windows\SheetJSWin\DocumentPicker.cs` with the following:

```csharp title="windows\SheetJSWin\DocumentPicker.cs"
using System;
using Microsoft.ReactNative.Managed;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Windows.ApplicationModel.Core;
using Windows.Security.Cryptography;
using Windows.Storage;
using Windows.Storage.Pickers;
using Windows.UI.Core;

namespace SheetJSWin {
  [ReactModule]
  class DocumentPicker {
    private ReactContext context;
    [ReactInitializer]
    public void Initialize(ReactContext reactContext) { context = reactContext; }

    [ReactMethod("PickAndRead")]
    public async void PickAndRead(IReactPromise<string> result) {
      context.Handle.UIDispatcher.Post(async() => { try {
        var picker = new FileOpenPicker();
        picker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
        picker.FileTypeFilter.Add(".xlsx");
        picker.FileTypeFilter.Add(".xls");

        var file = await picker.PickSingleFileAsync();
        if(file == null) throw new Exception("File not found");

        var buf = await FileIO.ReadBufferAsync(file);
        result.Resolve(CryptographicBuffer.EncodeToBase64String(buf));
      } catch(Exception e) { result.Reject(new ReactError { Message = e.Message }); }});
    }
  }
}
```

3) Add the highlighted line to `windows\SheetJSWin\SheetJSWin.csproj`. Look for
the `ItemGroup` that contains `ReactPackageProvider.cs`:

```xml title="windows\SheetJSWin\SheetJSWin.csproj"
<!-- highlight-next-line -->
    <Compile Include="DocumentPicker.cs" />
    <Compile Include="ReactPackageProvider.cs" />
  </ItemGroup>
```

  </TabItem>
  <TabItem value="cpp" label="C++">

4) Create the file `windows\SheetJSWin\DocumentPicker.h` with the following:

```cpp title="windows\SheetJSWin\DocumentPicker.h"
#pragma once

#include "pch.h"
#include <winrt/Windows.Storage.Pickers.h>
#include <winrt/Windows.Security.Cryptography.h>
#include "JSValue.h"
#include "NativeModules.h"

using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::Storage;
using namespace winrt::Windows::Storage::Pickers;
using namespace winrt::Windows::Security::Cryptography;

namespace SheetJSWin {
  REACT_MODULE(DocumentPicker);
  struct DocumentPicker {
    REACT_INIT(Initialize);
    void Initialize(const ReactContext& reactContext) noexcept {
      context = reactContext;
    }

    REACT_METHOD(PickAndRead);
    void PickAndRead(ReactPromise<winrt::hstring> promise) noexcept {
      auto prom = promise;
      context.UIDispatcher().Post([prom = std::move(prom)]()->winrt::fire_and_forget {
        auto p = prom;
        winrt::Windows::Storage::Pickers::FileOpenPicker picker;
        picker.SuggestedStartLocation(PickerLocationId::DocumentsLibrary);
        picker.FileTypeFilter().Append(L".xlsx");
        picker.FileTypeFilter().Append(L".xls");

        StorageFile file = co_await picker.PickSingleFileAsync();
        if(file == nullptr) { p.Reject("File not Found"); co_return; }

        auto buf = co_await FileIO::ReadBufferAsync(file);
        p.Resolve(CryptographicBuffer::EncodeToBase64String(buf));
        co_return;
      });
    }

    private:
      ReactContext context{nullptr};
  };
}
```

5) Add the highlighted line to `windows\SheetJSWin\ReactPackageProvider.cpp`:

```cpp title="windows\SheetJSWin\ReactPackageProvider.cpp"
#include "ReactPackageProvider.h"
// highlight-next-line
#include "DocumentPicker.h"
#include "NativeModules.h"
```

  </TabItem>
</Tabs>

Now the native module will be added to the app.

6) Remove `App.js` and save the following to `App.tsx`:

```tsx title="App.tsx"
import React, { useState, type Node } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { read, utils, version } from 'xlsx';
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const DocumentPicker = getEnforcing('DocumentPicker');

const App: () => Node = () => {

  const [ aoa, setAoA ] = useState(["SheetJS".split(""), "5433795".split("")]);

  return (
    <SafeAreaView style={styles.outer}>
      <Text style={styles.title}>SheetJS × React Native Windows {version}</Text>
      <TouchableHighlight onPress={async() => {
        try {
          const b64 = await DocumentPicker.PickAndRead();
          const wb = read(b64);
          setAoA(utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 } ));
        } catch(err) { alert(`Error: ${err.message}`); }
      }}><Text style={styles.button}>Click here to Open File!</Text></TouchableHighlight>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.table}>{aoa.map((row,R) => (
          <View style={styles.row} key={R}>{row.map((cell,C) => (
            <View style={styles.cell} key={C}><Text>{cell}</Text></View>
          ))}</View>
        ))}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cell: { flex: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly', padding: 10, backgroundColor: 'white', },
  table: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', },
  outer: { marginTop: 32, paddingHorizontal: 24, },
  title: { fontSize: 24, fontWeight: '600', },
  button: { marginTop: 8, fontSize: 18, fontWeight: '400', },
});

export default App;
```

7) Test the app again:

```powershell
npx react-native run-windows --no-telemetry
```

Download <https://sheetjs.com/pres.xlsx>, then click on "open file". Use the
file picker to select the `pres.xlsx` file and the app will show the data.

</details>

### Reading Files

Only the main UI thread can show file pickers.  This is similar to Web Worker
DOM access limitations in the Web platform.

This example defines a `PickAndRead` function that will show the file picker,
read the file contents, and return a Base64 string.

<Tabs groupId="rnwlang">
  <TabItem value="cs" label="C#">

```csharp
namespace SheetJSWin {
  [ReactModule]
  class DocumentPicker {
    /* The context must be stored when the module is initialized */
    private ReactContext context;
    [ReactInitializer]
    public void Initialize(ReactContext ctx) { context = ctx; }

    [ReactMethod("PickAndRead")]
    public async void PickAndRead(IReactPromise<string> result) {
      /* perform file picker action in the UI thread */
      // highlight-next-line
      context.Handle.UIDispatcher.Post(async() => { try {
        /* create file picker */
        var picker = new FileOpenPicker();
        picker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
        picker.FileTypeFilter.Add(".xlsx");
        picker.FileTypeFilter.Add(".xls");

        /* show file picker */
        // highlight-next-line
        var file = await picker.PickSingleFileAsync();
        if(file == null) throw new Exception("File not found");

        /* read data and return base64 string */
        var buf = await FileIO.ReadBufferAsync(file);
        // highlight-next-line
        result.Resolve(CryptographicBuffer.EncodeToBase64String(buf));
      } catch(Exception e) { result.Reject(new ReactError { Message = e.Message }); }});
    }
  }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
namespace SheetJSWin
{
  REACT_MODULE(DocumentPicker);
  struct DocumentPicker
  {
    /* The context must be stored when the module is initialized */
    REACT_INIT(Initialize);
    void Initialize(const ReactContext& reactContext) noexcept {
      context = reactContext;
    }

    REACT_METHOD(PickAndRead);
    void PickAndRead(ReactPromise<winrt::hstring> promise) noexcept {
      auto prom = promise;
      /* perform file picker action in the UI thread */
      // highlight-next-line
      context.UIDispatcher().Post([prom = std::move(prom)]()->winrt::fire_and_forget {
        auto p = prom; // promise -> prom -> p dance avoids promise destruction

        /* create file picker */
        winrt::Windows::Storage::Pickers::FileOpenPicker picker;
        picker.SuggestedStartLocation(PickerLocationId::DocumentsLibrary);
        picker.FileTypeFilter().Append(L".xlsx");
        picker.FileTypeFilter().Append(L".xls");

        /* show file picker */
        // highlight-next-line
        StorageFile file = co_await picker.PickSingleFileAsync();
        if(file == nullptr) { p.Reject("File not Found"); co_return; }

        /* read data and return base64 string */
        auto buf = co_await FileIO::ReadBufferAsync(file);
        // highlight-next-line
        p.Resolve(CryptographicBuffer::EncodeToBase64String(buf));
        co_return;
      });
    }

    private:
      ReactContext context{nullptr};
  };
}
```

  </TabItem>
</Tabs>

This module can be referenced from the Turbo Module Registry:

```js
import { read } from 'xlsx';
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const DocumentPicker = getEnforcing('DocumentPicker');


/* ... in some event handler ... */
async() => {
  const b64 = await DocumentPicker.PickAndRead();
  const wb = read(b64);
  // DO SOMETHING WITH `wb` HERE
}
```

## React Native MacOS

The [NodeJS Module](../getting-started/installation/nodejs) can be imported
from the main app script.  File operations must be written in native code.

This demo was tested against `v0.64.30` on 2022 September 10 in MacOS 12.4

:::note

At the time of writing, the latest supported React Native version was `v0.64.3`

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Follow the [React Native](https://reactnative.dev/docs/environment-setup)
   guide for React Native CLI on MacOS.

:::caution

NodeJS `v16` is required.  There are OS-specific tools for downgrading:

- [`nvm-windows`](https://github.com/coreybutler/nvm-windows/releases) Windows
- [`nvm`](https://github.com/nvm-sh/nvm/) Linux, MacOS, WSL, etc.

:::

1) Create a new project using React Native `0.64`:

```bash
npx react-native init SheetJSmacOS --template react-native@^0.64.0
cd SheetJSmacOS
```

Create the MacOS part of the application:

```bash
npx react-native-macos-init --no-telemetry
```

Install Library:

```
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

To ensure that the app works, launch the app:

```powershell
npx react-native run-macos
```

Close the running app from the dock and close the Metro terminal window.

2) Create the file `macos/SheetJSmacOS-macOS/RCTDocumentPicker.h`:

```objc title="macos/SheetJSmacOS-macOS/RCTDocumentPicker.h"
#import <React/RCTBridgeModule.h>
@interface RCTDocumentPicker : NSObject <RCTBridgeModule>
@end
```

Create the file `macos/SheetJSmacOS-macOS/RCTDocumentPicker.m`:

```objc title="macos/SheetJSmacOS-macOS/RCTDocumentPicker.m"
#import <Foundation/Foundation.h>
#import <React/RCTUtils.h>

#import "RCTDocumentPicker.h"

@implementation RCTDocumentPicker

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(PickAndRead:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTExecuteOnMainQueue(^{
    NSOpenPanel *panel = [NSOpenPanel openPanel];
    [panel setCanChooseDirectories:NO];
    [panel setAllowsMultipleSelection:NO];
    [panel setMessage:@"Select a spreadsheet to read"];

    [panel beginWithCompletionHandler:^(NSInteger result){
      if (result == NSModalResponseOK) {
        NSURL *selected = [[panel URLs] objectAtIndex:0];
        NSFileHandle *hFile = [NSFileHandle fileHandleForReadingFromURL:selected error:nil];
        if(hFile) {
          NSData *data = [hFile readDataToEndOfFile];
          resolve([data base64EncodedStringWithOptions:0]);
        } else reject(@"read_failure", @"Could not read selected file!", nil);
      } else reject(@"select_failure", @"No file selected!", nil);
    }];
  });
}
@end
```

3) Edit the project file `macos/SheetJSmacOS.xcodeproj/project.pbxproj`.

There are four places where lines must be added:

A) Immediately after `/* Begin PBXBuildFile section */`

```plist
/* Begin PBXBuildFile section */
// highlight-next-line
    4717DC6A28CC499A00A9BE56 /* RCTDocumentPicker.m in Sources */ = {isa = PBXBuildFile; fileRef = 4717DC6928CC499A00A9BE56 /* RCTDocumentPicker.m */; };
    13B07FBC1A68108700A75B9A /* AppDelegate.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB01A68108700A75B9A /* AppDelegate.m */; };
```

B) Immediately after `/* Begin PBXFileReference section */`

```plist
/* Begin PBXFileReference section */
// highlight-start
    4717DC6828CC495400A9BE56 /* RCTDocumentPicker.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; name = RCTDocumentPicker.h; path = "SheetJSMacOS-macOS/RCTDocumentPicker.h"; sourceTree = "<group>"; };
    4717DC6928CC499A00A9BE56 /* RCTDocumentPicker.m */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.objc; name = RCTDocumentPicker.m; path = "SheetJSMacOS-macOS/RCTDocumentPicker.m"; sourceTree = "<group>"; };
// highlight-end
    008F07F21AC5B25A0029DE68 /* main.jsbundle */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text; path = main.jsbundle; sourceTree = "<group>"; };
```

C) The goal is to add a reference to the `PBXSourcesBuildPhase` block for the
`macOS` target.  To determine this, look in the `PBXNativeTarget section` for
a block with the comment `SheetJSmacOS-macOS`:

```plist
/* Begin PBXNativeTarget section */
...
      productType = "com.apple.product-type.application";
    };
// highlight-next-line
    514201482437B4B30078DB4F /* SheetJSmacOS-macOS */ = {
      isa = PBXNativeTarget;
...
/* End PBXNativeTarget section */
```

Within the block, look for `buildPhases` and find the hex string for `Sources`:

```plist
      buildPhases = (
        1A938104A937498D81B3BD3B /* [CP] Check Pods Manifest.lock */,
        381D8A6F24576A6C00465D17 /* Start Packager */,
// highlight-next-line
        514201452437B4B30078DB4F /* Sources */,
        514201462437B4B30078DB4F /* Frameworks */,
        514201472437B4B30078DB4F /* Resources */,
        381D8A6E24576A4E00465D17 /* Bundle React Native code and images */,
        3689826CA944E2EF44FCBC17 /* [CP] Copy Pods Resources */,
      );
```

Search for that hex string (`514201452437B4B30078DB4F` in our example) in the
file and it should show up in a `PBXSourcesBuildPhase` section. Within `files`,
add the highlighted line:

```plist
    514201452437B4B30078DB4F /* Sources */ = {
      isa = PBXSourcesBuildPhase;
      buildActionMask = 2147483647;
      files = (
// highlight-next-line
        4717DC6A28CC499A00A9BE56 /* RCTDocumentPicker.m in Sources */,
        514201502437B4B30078DB4F /* ViewController.m in Sources */,
        514201582437B4B40078DB4F /* main.m in Sources */,
        5142014D2437B4B30078DB4F /* AppDelegate.m in Sources */,
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
```

D) The goal is to add file references to the "main group".  Search for
`/* Begin PBXProject section */` and there should be one Project object.
Within the project object, look for `mainGroup`:

```plist
/* Begin PBXProject section */
    83CBB9F71A601CBA00E9B192 /* Project object */ = {
      isa = PBXProject;
...
        Base,
      );
// highlight-next-line
      mainGroup = 83CBB9F61A601CBA00E9B192;
      productRefGroup = 83CBBA001A601CBA00E9B192 /* Products */;
...
/* End PBXProject section */
```

Search for that hex string (`83CBB9F61A601CBA00E9B192` in our example) in the
file and it should show up in a `PBXGroup` section.  Within `children`, add the
highlighted lines:

```plist
    83CBB9F61A601CBA00E9B192 = {
      isa = PBXGroup;
      children = (
// highlight-start
        4717DC6828CC495400A9BE56 /* RCTDocumentPicker.h */,
        4717DC6928CC499A00A9BE56 /* RCTDocumentPicker.m */,
// highlight-end
        5142014A2437B4B30078DB4F /* SheetJSmacOS-macOS */,
        13B07FAE1A68108700A75B9A /* SheetJSmacOS-iOS */,
```

4) Replace `App.js` with the following:

```tsx title="App.js"
import React, { useState, type Node } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { read, utils, version } from 'xlsx';
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const DocumentPicker = getEnforcing('DocumentPicker');

const App: () => Node = () => {

  const [ aoa, setAoA ] = useState(["SheetJS".split(""), "5433795".split("")]);

  return (
    <SafeAreaView style={styles.outer}>
      <Text style={styles.title}>SheetJS × React Native MacOS {version}</Text>
      <TouchableHighlight onPress={async() => {
        try {
          const b64 = await DocumentPicker.PickAndRead();
          const wb = read(b64);
          setAoA(utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 } ));
        } catch(err) { alert(`Error: ${err.message}`); }
      }}><Text style={styles.button}>Click here to Open File!</Text></TouchableHighlight>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.table}>{aoa.map((row,R) => (
          <View style={styles.row} key={R}>{row.map((cell,C) => (
            <View style={styles.cell} key={C}><Text>{cell}</Text></View>
          ))}</View>
        ))}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cell: { flex: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly', padding: 10, backgroundColor: 'white', },
  table: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', },
  outer: { marginTop: 32, paddingHorizontal: 24, },
  title: { fontSize: 24, fontWeight: '600', },
  button: { marginTop: 8, fontSize: 18, fontWeight: '400', },
});

export default App;
```

5) Test the app:

```bash
npx react-native run-macos
```

Download <https://sheetjs.com/pres.xlsx>, then click on "open file". Use the
file picker to select the `pres.xlsx` file and the app will show the data.

6) Make a release build:

```bash
xcodebuild -workspace macos/SheetJSmacOS.xcworkspace -scheme SheetJSmacOS-macOS -config Release
```

</details>

### Reading Files

Only the main UI thread can show file pickers.  This is similar to Web Worker
DOM access limitations in the Web platform.

This example defines a `PickAndRead` function that will show the file picker,
read the file contents, and return a Base64 string.

```objc
/* the resolve/reject is projected on the JS side as a Promise */
RCT_EXPORT_METHOD(PickAndRead:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  /* perform file picker action in the UI thread */
  // highlight-next-line
  RCTExecuteOnMainQueue(^{
    /* create file picker */
    NSOpenPanel *panel = [NSOpenPanel openPanel];
    [panel setCanChooseDirectories:NO];
    [panel setAllowsMultipleSelection:NO];
    [panel setMessage:@"Select a spreadsheet to read"];

    /* show file picker */
    // highlight-next-line
    [panel beginWithCompletionHandler:^(NSInteger result){
      if (result == NSModalResponseOK) {
        /* read data and return base64 string */
        NSURL *selected = [[panel URLs] objectAtIndex:0];
        NSFileHandle *hFile = [NSFileHandle fileHandleForReadingFromURL:selected error:nil];
        if(hFile) {
          NSData *data = [hFile readDataToEndOfFile];
          // highlight-next-line
          resolve([data base64EncodedStringWithOptions:0]);
        } else reject(@"read_failure", @"Could not read selected file!", nil);
      } else reject(@"select_failure", @"No file selected!", nil);
    }];
  });
}
```

This module is referenced in the same way as the React Native Windows example:

```js
import { read } from 'xlsx';
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const DocumentPicker = getEnforcing('DocumentPicker');


/* ... in some event handler ... */
async() => {
  const b64 = await DocumentPicker.PickAndRead();
  const wb = read(b64);
  // DO SOMETHING WITH `wb` HERE
}
```