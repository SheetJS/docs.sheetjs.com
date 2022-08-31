---
title: Desktop Applications
---

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

The [NodeJS Module](../getting-started/installation/nodejs) can be imported from the main or
the renderer thread.

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

async function saveFile() {
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
