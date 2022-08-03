---
sidebar_position: 16
title: Desktop Applications
---

Web technologies like JavaScript and HTML have been adapted to the traditional
app space.  Typically these frameworks bundle a JavaScript engine as well as a
windowing framework. SheetJS is compatible with many toolkits.

## NW.js

The [Standalone scripts](../../installation/standalone) can be referenced in a
`SCRIPT` tag from the entry point HTML page.

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
[drag and drop snippet](../../solutions/input#example-user-submissions) apply
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
