---
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

[After installing the module](../getting-started/installation/nodejs), bundling is easy:

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
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
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
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
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
const url = "https://sheetjs.com/data/executive.json";
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


## Dojo

Integration details are included [in the "AMD" installation](../getting-started/installation/amd#dojo-toolkit)

Complete Examples are included [in the "Dojo" demo](./legacy#dojo-toolkit)


## esbuild

The `xlsx.mjs` source file are written in a subset of ES6 that `esbuild`
understands and is able to transpile down for older browsers.

Both the `node` and `browser` platforms work out of the box.

<details><summary><b>Complete Example</b> (click to show)</summary>

<Tabs>
  <TabItem value="browser" label="Browser">

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `esbrowser.js`:

```js title="esbrowser.js"
// highlight-next-line
import { utils, version, writeFileXLSX } from 'xlsx/xlsx.mjs';

(async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
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
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
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
const url = "https://sheetjs.com/data/executive.json";
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

Parcel should play nice with SheetJS out of the box.

:::warning Parcel Bug

Errors of the form `Could not statically evaluate fs call` stem from a
[parcel bug](https://github.com/parcel-bundler/parcel/pull/523). Upgrade to
Parcel version 1.5.0 or later.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

This demo follows the [Presidents Example](../getting-started/example).

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
import { utils, version, writeFileXLSX } from 'xlsx';

document.getElementById("vers").innerText = version;
document.getElementById("xport").onclick = async() => {
  /* fetch JSON data and parse */
  const url = "https://sheetjs.com/data/executive.json";
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
  writeFileXLSX(workbook, "Presidents.xlsx");
};
</script>
<body>
```

2) Install the SheetJS node module:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
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

## RequireJS

[Standalone scripts](../getting-started/installation/standalone) comply with AMD `define`
semantics, enabling use in RequireJS out of the box.

To enable use of the alias `xlsx`, the RequireJS config should set an alias in
the `paths` property:

```js
require.config({
  baseUrl: ".",
  name: "app",
  paths: {
    // highlight-next-line
    xlsx: "xlsx.full.min"
  }
});
// highlight-next-line
require(["xlsx"], function(XLSX) {
  /* use XLSX here */
  console.log(XLSX.version);
});
```

The [Live demo](pathname:///requirejs/requirejs.html) loads RequireJS from the
CDN, uses it to load the standalone script from the SheetJS CDN, and uses the
`XLSX` variable to create a button click handler that creates a workbook.

The `r.js` optimizer also supports the standalone scripts.

## Rollup

Rollup requires `@rollup/plugin-node-resolve` to support NodeJS modules:

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} rollup @rollup/plugin-node-resolve
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} rollup @rollup/plugin-node-resolve
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} rollup @rollup/plugin-node-resolve
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `index.js`:

```js title="index.js"
// highlight-next-line
import { utils, version, writeFileXLSX } from 'xlsx/xlsx.mjs';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
});
```

3) Bundle the script:

```bash
npx rollup index.js --plugin @rollup/plugin-node-resolve --file bundle.js --format iife
```

4) Create a small HTML page that loads the script.  Save to `index.html`:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <h1>SheetJS Presidents Demo</h1>
    <button id="xport">Click here to export</button>
    <script type="module" src="./bundle.js"></script>
  </body>
</html>
```


5) Start a local HTTP server, then go to http://localhost:8080/

```bash
npx http-server .
```

Click on "Click here to export" to generate a file.

</details>

## Snowpack

Snowpack works with no caveats.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `index.js`:

```js title="index.js"
// highlight-next-line
import { utils, version, writeFileXLSX } from 'xlsx/xlsx.mjs';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
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

## SWC

SWC provides `spack` for bundling scripts.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the dependencies using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} regenerator-runtime @swc/cli @swc/core
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} regenerator-runtime @swc/cli @swc/core
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`} regenerator-runtime @swc/cli @swc/core
</code></pre>
  </TabItem>
</Tabs>

:::note

The `regenerator-runtime` dependency is used for transpiling `fetch` and is not
required if the interface code does not use `fetch` or Promises.

:::

2) Save the following to `index.js`:

```js title="index.js"
import { utils, version, writeFileXLSX } from 'xlsx';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
});
```

3) Create an `spack.config.js` config file:

```js title="spack.config.js"
const { config } = require('@swc/core/spack');

module.exports = ({
  entry: {
    'web': __dirname + '/index.js',
  },
  output: {
    path: __dirname + '/lib'
  },
  module: {},
});
```

4) Build for production:

```bash
npx spack
```

This command will create the script `lib/web.js`

5) Create a small HTML page that loads the generated script:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <h1>SheetJS Presidents Demo</h1>
    <button id="xport">Click here to export</button>
    <script src="lib/web.js"></script>
  </body>
</html>
```

6) Start a local HTTP server, then go to http://localhost:8080/

```bash
npx http-server build/
```

Click on "Click here to export" to generate a file.

</details>

## SystemJS

With configuration, SystemJS supports both browser and NodeJS deployments.

:::caution

This demo was written against SystemJS 0.19, the most popular SystemJS version.
used with Angular applications.  In the years since the release, Angular and
other tools using SystemJS have switched to Webpack.

:::

<Tabs>
  <TabItem value="browser" label="Browser">

SystemJS fails by default because the library does not export anything in the
web browser.  The `meta` configuration option can be used to expose `XLSX`:

```js
SystemJS.config({
  meta: {
    'xlsx': {
      exports: 'XLSX' // <-- tell SystemJS to expose the XLSX variable
    }
  },
  map: {
    'xlsx': 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js',
    'fs': '',     // <--|
    'crypto': '', // <--| suppress native node modules
    'stream': ''  // <--|
  }
});
SystemJS.import('main.js'); // load `main.js`
```

The `main.js` script can freely `require("xlsx")`.

:::caution Web Workers

Web Workers can load the SystemJS library with `importScripts`, but the imported
code cannot assign the original worker's `onmessage` callback.  The recommended
approach is to expose a global from the required script,  For example, supposing
the shared name is `_cb`, the primary worker script would call the callback:

```js title="worker.js"
/* main worker script */
importScripts('system.js');

SystemJS.config({ /* ... browser config ... */ });

onmessage = function(evt) {
  SystemJS.import('workermain.js').then(function() { _cb(evt); });
};
```

The worker script would define and expose the function:

```js title="workermain.js"
/* Loaded with SystemJS import */
var XLSX = require('xlsx');

_cb = function(evt) { /* ... do work here ... */ };
```

:::

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

:::caution

While SystemJS works in NodeJS, the built-in `require` should be preferred.

:::

The NodeJS module main script is `xlsx/xlsx.js` and should be mapped:

```js
SystemJS.config({
  map: {
    "xlsx": "./node_modules/xlsx/xlsx.js"
  }
});
```

The standalone scripts require a hint that the script assigns a global:

```js
SystemJS.config({
  meta: {
    "standalone": { format: "global" }
  },
  map: {
    "standalone": "xlsx.full.min.js"
  }
});
```
  </TabItem>
</Tabs>

<details><summary><b>Complete Example</b> (click to show)</summary>

<Tabs>
  <TabItem value="browser" label="Browser">

The [Live demo](pathname:///systemjs/systemjs.html) loads SystemJS from the
CDN, uses it to load the standalone script from the SheetJS CDN and emulate
a `require` implementation when loading [`main.js`](pathname:///systemjs/main.js)

"View Source" works on the main HTML page and the `main.js` script.

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

1) Install the dependencies:

<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz systemjs@0.19`}
</code></pre>

2) Save the following script to `SheetJSystem.js`:

```js title="SheetJSystem.js"
const SystemJS = require('systemjs');

// highlight-start
SystemJS.config({
  map: {
    'xlsx': 'node_modules/xlsx/xlsx.js',
    'fs': '@node/fs',
    'crypto': '@node/crypto',
    'stream': '@node/stream'
  }
});
// highlight-end

SystemJS.import('xlsx').then(async function(XLSX) {

  /* fetch JSON data and parse */
  const url = "https://sheetjs.com/data/executive.json";
  const raw_data = await (await fetch(url)).json();

  /* filter for the Presidents */
  const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

  /* flatten objects */
  const rows = prez.map(row => ({
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

});
```

3) Run in NodeJS:

```bash
node SheetJSystem.js
```

If the demo worked, `Presidents.xlsx` will be created.

:::note

As it uses `fetch`, this demo requires Node 18.

:::

  </TabItem>
</Tabs>

</details>

## Vite

:::caution

ViteJS adopted nascent `package.json` patterns. Version 0.18.10 implements the
patterns required for ViteJS 3.0.3. These patterns are evolving and a future
version of ViteJS may require more packaging changes.

:::

ViteJS 3.0.3 is known to work with SheetJS version 0.18.10.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a new ViteJS project:

```
npm create vite@latest
cd sheetjs-vite # (project name)
npm i
```

When prompted for **Project Name**, type **`sheetjs-vite`**

When prompted for **Framework**, select **`vue`** then **`vue-ts`**

2) Add the SheetJS dependency:

<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>

3) Replace `src\components\HelloWorld.vue` with:

```html title="src\components\HelloWorld.vue"
<script setup lang="ts">
import { version, utils, writeFileXLSX } from 'xlsx';

interface President {
  terms: { "type": "prez" | "viceprez"; }[];
  name: { first: string; last: string; }
  bio: { birthday: string; }
}

async function xport() {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
const raw_data: President[] = await (await fetch(url)).json();

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
writeFileXLSX(workbook, "Presidents.xlsx");
}

</script>

<template>
  <button type="button" @click="xport">Export with SheetJS version {{ version }}</button>
</template>
```

4) Run `npm run dev` and test functionality by opening a web browser to
http://localhost:5173/ and clicking the button

5) Run `npx vite build` and verify the generated pages work by running a local
web server in the `dist` folder:

```
npx http-server dist/
```

Access http://localhost:8080 in your web browser.

</details>

## Webpack

The ECMAScript Module build has no `require` or `import` statements and does
not use `process` or any variable that Webpack could interpret as a NodeJS
feature.  Various `package.json` fields have been added to appease various
Webpack versions starting from the `2.x` series.

:::note CommonJS and ESM

Webpack bundled the CommonJS build in older versions of the library.  Version
`0.18.1` changed the NodeJS module package so that Webpack uses the ESM build.

The ESM build does not include the codepage support library for XLS reading.
[As described in the installation instructions](../getting-started/installation/frameworks),
the codepage dependency should be imported explicitly:

```js
import * as XLSX from 'xlsx';
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
set_cptable(cptable);
```

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `index.js`:

```js title="index.js"
// highlight-next-line
import { utils, version, writeFileXLSX } from 'xlsx/xlsx.mjs';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
});
```

3) Create a small `webpack.config.js` script that writes to `index.min.js`:

```js title="webpack.config.js"
module.exports = {
  /* entry point index.js */
  entry: './index.js',

  /* write to index.min.js */
  output: { path:__dirname, filename: './index.min.js' }
}
```

4) Build for production.  The command depends on the version of webpack:

<Tabs>
  <TabItem value="23" label="2.x and 3.x">

**Webpack 2.x**

```bash
npx webpack@2.x -p
```

**Webpack 3.x**

```bash
npx webpack@3.x -p
```

:::caution

The minifier that ships with Webpack 2.x does not handle `async` functions. The
unminified code generated by Webpack will work for the purposes of the demo. It
is strongly recommended to upgrade to a newer version of Webpack.  If that is
not feasible, the example should be replaced with a traditional Promise chain.

:::

  </TabItem>
  <TabItem value="4+" label="4.x, 5.x and beyond" default>

:::warning Pinning specific versions of webpack

The webpack tooling is not designed for switching between versions. A specific
version above 4.0 can be pinned by locally installing webpack and the CLI tool.

:::

**Webpack 4.x**

```bash
npm install --save webpack@4.x webpack-cli
npx webpack --mode=production
```

**Webpack 5.x**

```bash
npm install --save webpack@5.x webpack-cli
npx webpack --mode=production
```

**Webpack latest**

```bash
npm install --save webpack webpack-cli
npx webpack --mode=production
```

  </TabItem>
</Tabs>


5) Create a small HTML page that loads the script.  Save to `index.html`:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <h1>SheetJS Presidents Demo</h1>
    <button id="xport">Click here to export</button>
    <script src="./index.min.js"></script>
  </body>
</html>
```

6) Start a local HTTP server and go to http://localhost:8080/

```bash
npx http-server .
```

Click on "Click here to export" to generate a file.

</details>

## WMR

WMR follows the same structure as Snowpack

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

2) Save the following to `index.js`:

```js title="index.js"
// highlight-next-line
import { utils, version, writeFileXLSX } from 'xlsx/xlsx.mjs';

document.getElementById("xport").addEventListener("click", async() => {
/* fetch JSON data and parse */
const url = "https://sheetjs.com/data/executive.json";
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
writeFileXLSX(workbook, "Presidents.xlsx");
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

4) Build for production:

```bash
npx wmr build
```

5) Start a local HTTP server in `dist` folder and go to http://localhost:8080/

```bash
npx http-server dist/
```

Click on "Click here to export" to generate a file.

</details>

