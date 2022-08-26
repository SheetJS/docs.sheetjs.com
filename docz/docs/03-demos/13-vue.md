---
title: VueJS
---

[VueJS](https://vuejs.org/) is a JS library for building user interfaces.

This demo covers common VueJS data flow ideas and strategies.  Single-File
Components (SFC) and VueJS familiarity is assumed.

Other demos cover general VueJS deployments, including:

- [Static Site Generation powered by NuxtJS](./content#nuxtjs)
- [iOS and Android applications powered by Quasar](./mobile#quasar)
- [`vue3-table-lite` UI component](./grid#vue3-table-lite)


## Installation

[The "Frameworks" section](../getting-started/installation/frameworks) covers
installation with Yarn and other package managers.

The library can be imported directly from JS or JSX code with:

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

```html title="src/SheetJSVueAoO.vue"
<script setup>
import { ref, onMounted } from "vue";
import { read, utils, writeFileXLSX } from 'xlsx';

const rows = ref([]);

onMounted(async() => {
  /* Download from https://sheetjs.com/pres.numbers */
  const f = await fetch("https://sheetjs.com/pres.numbers");
  const ab = await f.arrayBuffer();

  /* parse workbook */
  const wb = read(ab);

  /* update data */
  rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
});

/* get state data and export to XLSX */
function exportFile() {
  const ws = utils.json_to_sheet(rows.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, "SheetJSVueAoO.xlsx");
}
</script>

<template>
  <table><thead><th>Name</th><th>Index</th></thead><tbody>
    <tr v-for="(row, idx) in rows" :key="idx">
      <td>{{ row.Name }}</td>
      <td>{{ row.Index }}</td>
    </tr>
  </tbody><tfoot><td colSpan={2}>
    <button @click="exportFile">Export XLSX</button>
  </td></tfoot></table>
</template>
```

### HTML

The main disadvantage of the Array of Objects approach is the specific nature
of the columns.  For more general use, passing around an Array of Arrays works.
However, this does not handle merge cells well!

The `sheet_to_html` function generates HTML that is aware of merges and other
worksheet features.  VueJS `v-html` attribute allows assignment of `innerHTML`
attribute, effectively inserting the code into the page:

```html title="src/SheetJSVueHTML.vue"
<script setup>
import { ref, onMounted } from "vue";
import { read, utils, writeFileXLSX } from 'xlsx';

const html = ref("");
const tableau = ref();

onMounted(async() => {
  /* Download from https://sheetjs.com/pres.numbers */
  const f = await fetch("https://sheetjs.com/pres.numbers");
  const ab = await f.arrayBuffer();

  /* parse workbook */
  const wb = read(ab);

  /* update data */
  html.value = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
});

/* get live table and export to XLSX */
function exportFile() {
  const wb = utils.table_to_book(tableau.value.getElementsByTagName("TABLE")[0])
  writeFileXLSX(wb, "SheetJSVueHTML.xlsx");
}
</script>

<template>
  <div v-html="html"></div>
  <button @click="exportFile">Export XLSX</button>
</template>
```

### Rows and Columns

Some data grids and UI components split worksheet state in two parts: an array
of column attribute objects and an array of row objects.  The former is used to
generate column headings and for indexing into the row objects.

The safest approach is to use an array of arrays for state and to generate
column objects that map to A1-Style column headers.

The [`vue3-table-lite` demo](./grid#rows-and-columns-bindings) generates rows
and columns objects with the following structure:

```js
/* rows are generated with a simple array of arrays */
rows.value = utils.sheet_to_json(worksheet, { header: 1 });

/* column objects are generated based on the worksheet range */
const range = utils.decode_range(ws["!ref"]||"A1");
columns.value = Array.from({ length: range.e.c + 1 }, (_, i) => ({
  /* for an array of arrays, the keys are "0", "1", "2", ... */
  field: String(i),
  /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */
  label: XLSX.utils.encode_col(i)
}));
```


## Legacy Deployments

[The Standalone Scripts](../getting-started/installation/standalone) play nice
with legacy deployments that do not use a bundler.

The legacy demos show a simple VueJS component.  It is written in ES5 syntax.
The pages are not minified and "View Source" should be used to inspect.

- [VueJS version 2](pathname:///vue/index2.html)
- [VueJS version 3](pathname:///vue/index3.html)

There is a shared component [`SheetJS-vue.js`](pathname:///vue/SheetJS-vue.js)

:::caution

The entire demo is designed to run in Internet Explorer and does not reflect
modern design patterns.

:::