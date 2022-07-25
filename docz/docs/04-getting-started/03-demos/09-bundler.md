---
sidebar_position: 9
title: Bundlers
---

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

SheetJS predates ECMAScript modules and bundler tools like Webpack. As best
practices have evolved, stress testing SheetJS libraries have revealed bugs in
the respective bundlers.  This demo collects various notes and provides basic
examples.

:::note

Issues should be reported to the respective bundler projects.  Typically it is
considered a bundler bug if the tool cannot properly handle JS libraries.

:::


## Browserify

`browserify` is compatible with the library and should "just work" with the
`require` form in a main page or in a web worker:

```js
var XLSX = require("xlsx");
// ... use XLSX ...
```

[After installing the module](../../installation/nodejs), bundling is easy:

```bash
browserify app.js > browserify.js
uglifyjs browserify.js > browserify.min.js
```

Web Worker scripts can be bundled using the same approach.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Download the following files:

- [`app.js`](pathname:///browserify/app.js)
- [`index.html`](pathname:///browserify/index.html)
- [`xlsxworker.js`](pathname:///browserify/xlsxworker.js)

3) Bundle the scripts:

```bash
npx browserify app.js > browserify.js
npx browserify xlsxworker.js > worker.js
```

4) Spin up a local web server:

```
npx http-server
```

5) Access the site <http://localhost:8080/> and use the file input element to
select a spreadsheet.

</details>


## Bun

`bun bun` is capable of optimizing imported libraries in `node_modules`.  In
local testing, a bundled script can save tens of milliseconds per run.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following script to `bun.js`:

```js title="bun.js"
// highlight-next-line
import * as XLSX from 'xlsx/xlsx.mjs';
// highlight-next-line
import * as fs from 'fs';
// highlight-next-line
XLSX.set_fs(fs);

/* fetch JSON data and parse */
const url = "https://sheetjs.com/executive.json";
const raw_data = await (await fetch(url)).json();

/* filter for the Presidents */
const prez = raw_data.filter((row) => row.terms.some((term) => term.type === "prez"));

/* flatten objects */
const rows = prez.map((row) => ({
  name: row.name.first + " " + row.name.last,
  birthday: row.bio.birthday
}));

/* generate worksheet and workbook */
const worksheet = XLSX.utils.json_to_sheet(rows);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

/* fix headers */
XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

/* calculate column width */
const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
worksheet["!cols"] = [ { wch: max_width } ];

/* create an XLSX file and try to save to Presidents.xlsx */
XLSX.writeFile(workbook, "Presidents.xlsx");
```

3) Bundle the script with `bun bun`:

```bash
bun bun bun.js
```

This procedure will generate `node_modules.bun`.

4) Run the script

```bash
bun bun.js
```

</details>


## ESBuild

The `xlsx.mjs` source file are written in a subset of ES6 that ESBuild
understands and is able to transpile down for older browsers.

Both the `node` and `browser` platforms work out of the box.

<details><summary><b>Complete Example</b> (click to show)</summary>

<Tabs>
  <TabItem value="browser" label="Browser">

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `esbrowser.js`:

```js title="esbrowser.js"
// highlight-next-line
import { set_fs, utils, version, writeFile } from 'xlsx/xlsx.mjs';

(async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/executive.json";
const raw_data = await (await fetch(url)).json();

/* filter for the Presidents */
const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

/* flatten objects */
const rows = prez.map(row => ({
  name: row.name.first + " " + row.name.last,
  birthday: row.bio.birthday
}));

/* generate worksheet and workbook */
const worksheet = utils.json_to_sheet(rows);
const workbook = utils.book_new();
utils.book_append_sheet(workbook, worksheet, "Dates");

/* fix headers */
utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

/* calculate column width */
const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
worksheet["!cols"] = [ { wch: max_width } ];

/* create an XLSX file and try to save to Presidents.xlsx */
writeFile(workbook, "Presidents.xlsx");
})();
```

3) Create a small HTML page that loads the script.  Save to `index.html`:

```html title="index.html"
<body><script src="esb.browser.js"></script></body>
```

4) Create bundle:

```bash
npx esbuild esbrowser.js --bundle --outfile=esb.browser.js
```

5) Start a local HTTP server, then go to http://localhost:8080/

```bash
npx http-server .
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `esbnode.js`:

```js title="esbnode.js"
// highlight-next-line
import { set_fs, utils, version, writeFile } from 'xlsx/xlsx.mjs';
// highlight-next-line
import * as fs from 'fs';
// highlight-next-line
set_fs(fs);

(async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/executive.json";
const raw_data = await (await fetch(url)).json();

/* filter for the Presidents */
const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

/* flatten objects */
const rows = prez.map(row => ({
  name: row.name.first + " " + row.name.last,
  birthday: row.bio.birthday
}));

/* generate worksheet and workbook */
const worksheet = utils.json_to_sheet(rows);
const workbook = utils.book_new();
utils.book_append_sheet(workbook, worksheet, "Dates");

/* fix headers */
utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

/* calculate column width */
const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
worksheet["!cols"] = [ { wch: max_width } ];

/* create an XLSX file and try to save to Presidents.xlsx */
writeFile(workbook, "Presidents.xlsx");
})();
```

3) Create bundle:

```bash
npx esbuild esbnode.js --bundle --platform=node --outfile=esb.node.js
```

4) Run the bundle:

```bash
node esb.node.js
```

  </TabItem>
</Tabs>

</details>

## Parcel

Parcel Bundler should play nice with SheetJS out of the box.

:::warning Parcel Bug

Errors of the form `Could not statically evaluate fs call` stem from a
[parcel bug](https://github.com/parcel-bundler/parcel/pull/523). Upgrade to
Parcel version 1.5.0 or later.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

This demo follows the [Presidents Example](../../example).

1) Save the following to `index.html`:

```html title="index.html"
<body>
<h3>SheetJS <span id="vers"></span> export demo</h3>
<button id="xport">Click to Export!</button>
<!-- the script tag must be marked as `type="module"` -->
<!-- highlight-next-line -->
<script type="module">
// ESM-style import from "xlsx"
// highlight-next-line
import { utils, version, writeFile } from 'xlsx';

document.getElementById("vers").innerText = version;
document.getElementById("xport").onclick = async() => {
  /* fetch JSON data and parse */
  const url = "https://sheetjs.com/executive.json";
  const raw_data = await (await fetch(url)).json();

  /* filter for the Presidents */
  const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

  /* flatten objects */
  const rows = prez.map(row => ({
    name: row.name.first + " " + row.name.last,
    birthday: row.bio.birthday
  }));

  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Dates");

  /* fix headers */
  utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  /* calculate column width */
  const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  worksheet["!cols"] = [ { wch: max_width } ];

  /* create an XLSX file and try to save to Presidents.xlsx */
  writeFile(workbook, "Presidents.xlsx");
};
</script>
<body>
```

2) Install the SheetJS node module:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

3) Run the Parcel CLI tool:

```bash
npx -y parcel index.html
```

4) Access the page listed in the output (typically `http://localhost:1234`) and
click the "Click to Export!" button to generate a file.

</details>

## Snowpack

Snowpack works with no caveats.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `index.js`:

```js title="index.js"
// highlight-next-line
import { set_fs, utils, version, writeFile } from 'xlsx/xlsx.mjs';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/executive.json";
const raw_data = await (await fetch(url)).json();

/* filter for the Presidents */
const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

/* flatten objects */
const rows = prez.map(row => ({
  name: row.name.first + " " + row.name.last,
  birthday: row.bio.birthday
}));

/* generate worksheet and workbook */
const worksheet = utils.json_to_sheet(rows);
const workbook = utils.book_new();
utils.book_append_sheet(workbook, worksheet, "Dates");

/* fix headers */
utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

/* calculate column width */
const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
worksheet["!cols"] = [ { wch: max_width } ];

/* create an XLSX file and try to save to Presidents.xlsx */
writeFile(workbook, "Presidents.xlsx");
});
```

3) Create a small HTML page that loads the script.  Save to `index.html`:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <h1>SheetJS Presidents Demo</h1>
    <button id="xport">Click here to export</button>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

:::note

Unlike other bundlers, Snowpack requires a full page including `HEAD` element.

:::

4) Build for production:

```bash
npx snowpack build
```

5) Start a local HTTP server, then go to http://localhost:8080/

```bash
npx http-server build/
```

Click on "Click here to export" to generate a file.

</details>
