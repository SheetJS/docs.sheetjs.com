---
title: Svelte
---

[Svelte](https://svelte.dev/) is a JS library for building user interfaces.

This demo tries to cover common Svelte data flow ideas and strategies. Svelte
familiarity is assumed.

Other demos cover general Svelte deployments, including:

- [iOS applications powered by CapacitorJS](./mobile#capacitorjs)
- [Desktop application powered by Wails](./desktop#wails)


## Installation

[The "Frameworks" section](../getting-started/installation/frameworks) covers
installation with Yarn and other package managers.

The library can be imported directly from Svelte files with:

```js
import { read, utils, writeFile } from 'xlsx';
```


## Internal State

The various SheetJS APIs work with various data shapes.  The preferred state
depends on the application.

### Array of Objects

Typically, some users will create a spreadsheet with source data that should be
loaded into the site.  This sheet will have known columns.  For example, our
[presidents sheet](https://sheetjs.com/pres.xlsx) has "Name" / "Index" columns:

![`pres.xlsx` data](pathname:///pres.png)

This naturally maps to an array of typed objects, as in the TS example below:

```ts
import { read, utils } from 'xlsx';

interface President {
  Name: string;
  Index: number;
}

const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
const wb = read(f);
const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
console.log(data);
```

`data` will be an array of objects:

```js
[
  { Name: "Bill Clinton", Index: 42 },
  { Name: "GeorgeW Bush", Index: 43 },
  { Name: "Barack Obama", Index: 44 },
  { Name: "Donald Trump", Index: 45 },
  { Name: "Joseph Biden", Index: 46 }
]
```

A component will typically map over the data. The following example generates
a TABLE with a row for each President:

```html title="src/SheetJSSvelteAoO.svelte"
<script>
import { onMount } from 'svelte';
import { read, utils, writeFileXLSX } from 'xlsx';

/* the component state is an array of presidents */
let pres = [];

/* Fetch and update the state once */
onMount(async() => {
  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
  const wb = read(f); // parse the array buffer
  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
  // highlight-start
  pres = utils.sheet_to_json(ws); // generate objects and update state
  // highlight-end
});

/* get state data and export to XLSX */
function exportFile() {
  // highlight-next-line
  const ws = utils.json_to_sheet(pres);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, "SheetJSSvelteAoO.xlsx");
}
</script>

<main>
  <table><thead><th>Name</th><th>Index</th></thead><tbody>
  <!-- highlight-start -->
  {#each pres as p}<tr>
    <td>{p.Name}</td>
    <td>{p.Index}</td>
  </tr>{/each}
  <!-- highlight-end -->
  </tbody><tfoot><td colSpan={2}>
  <button on:click={exportFile}>Export XLSX</button>
  </td></tfoot></table>
</main>
```

### HTML

The main disadvantage of the Array of Objects approach is the specific nature
of the columns.  For more general use, passing around an Array of Arrays works.
However, this does not handle merge cells well!

The `sheet_to_html` function generates HTML that is aware of merges and other
worksheet features.  Svelte `@html` tag allows raw HTML strings:

```html title="src/SheetJSSvelteHTML.svelte"
<script>
import { onMount } from 'svelte';
import { read, utils, writeFileXLSX } from 'xlsx';

let html = "";
let tbl;

/* Fetch and update the state once */
onMount(async() => {
  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
  const wb = read(f); // parse the array buffer
  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
  // highlight-start
  html = utils.sheet_to_html(ws); // generate HTML and update state
  // highlight-end
});

/* get state data and export to XLSX */
function exportFile() {
  // highlight-start
  const elt = tbl.getElementsByTagName("TABLE")[0];
  const wb = utils.table_to_book(elt);
  // highlight-end
  writeFileXLSX(wb, "SheetJSSvelteHTML.xlsx");
}
</script>

<main>
  <button on:click={exportFile}>Export XLSX</button>
  <!-- highlight-start -->
  <div bind:this={tbl}>{@html html}</div>
  <!-- highlight-end -->
</main>
```
