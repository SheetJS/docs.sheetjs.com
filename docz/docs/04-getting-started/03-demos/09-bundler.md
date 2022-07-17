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
examples. Issues should be reported to the respective bundler projects.

## Parcel

Parcel Bundler should play nice with SheetJS out of the box.

Errors of the form `Could not statically evaluate fs call` stem from a 
[parcel bug](https://github.com/parcel-bundler/parcel/pull/523). Upgrade to
Parcel version 1.5.0 or later.

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
$ npm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
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