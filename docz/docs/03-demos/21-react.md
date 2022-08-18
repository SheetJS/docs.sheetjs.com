---
sidebar_position: 21
title: ReactJS
---

[ReactJS](https://reactjs.org/) is a JS library for building user interfaces.

This demo tries to cover common React data flow ideas and strategies. React
familiarity is assumed.

Other demos cover general React deployments, including:

- [Static Site Generation powered by NextJS](./content#nextjs)
- [iOS and Android applications powered by React Native](./mobile#react-native)
- [React Data Grid UI component](./grid#react-data-grid)


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

```tsx title="src/SheetJSReactAoO.tsx"
import React, { useEffect, useState } from "react";
import { read, utils } from 'xlsx';

interface President { Name: string; Index: number; }

export default function SheetJSReactAoO() {
  /* the component state is an array of presidents */
  const [pres, setPres] = useState<President[]>([]);

  /* Fetch and update the state once */
  useEffect(() => { (async() => {
    const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
    // highlight-start
    const wb = read(f); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const data = utils.sheet_to_json<President>(ws); // generate objects
    setPres(data); // update state
    // highlight-end
  })(); }, []);

  return (<table><thead><th>Name</th><th>Index</th></thead><tbody>
    { /* generate row for each president */
// highlight-start
      pres.map(pres => (<tr>
        <td>{pres.Name}</td>
        <td>{pres.Index}</td>
      </tr>))
// highlight-end
    }
  </tbody></table>);
}
```

### HTML

The main disadvantage of the Array of Objects approach is the specific nature
of the columns.  For more general use, passing around an Array of Arrays works.
However, this does not handle merge cells well!

The `sheet_to_html` function generates HTML that is aware of merges and other
worksheet features.  React `dangerouslySetInnerHTML` attribute allows code to
set the `innerHTML` attribute, effectively inserting the code into the page:

```tsx title="src/SheetJSReactHTML.tsx"
import React, { useEffect, useState } from "react";
import { read, utils } from 'xlsx';

export default function SheetJSReactHTML() {
  /* the component state is an HTML string */
  const [html, setHtml] = useState<string>("");

  /* Fetch and update the state once */
  useEffect(() => { (async() => {
    const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
    const wb = read(f); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    // highlight-start
    const data = utils.sheet_to_html(ws); // generate HTML
    setHtml(data); // update state
    // highlight-end
  })(); }, []);

  // highlight-next-line
  return ( <div dangerouslySetInnerHTML={{ __html: html }} />);
}
```

### Rows and Columns

Some data grids and UI components split worksheet state in two parts: an array
of column attribute objects and an array of row objects.  The former is used to
generate column headings and for indexing into the row objects.

The safest approach is to use an array of arrays for state and to generate
column objects that map to A1-style column headers.

The [React Data Grid demo](./grid#rows-and-columns-state) uses this approach
with the following column and row structure:

```js
/* rows are generated with a simple array of arrays */
const rows = utils.sheet_to_json(worksheet, { header: 1 });

/* column objects are generated based on the worksheet range */
const range = utils.decode_range(ws["!ref"]||"A1");
const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
  /* for an array of arrays, the keys are "0", "1", "2", ... */
  key: String(i),
  /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */
  name: XLSX.utils.encode_col(i)
}));

```

![Column labels for headers](pathname:///react/cols.png)



## Legacy Deployments

[The Standalone Scripts](../getting-started/installation/standalone) play nice
with legacy deployments that do not use a bundler.

[The legacy demo](pathname:///react/index.html) shows a simple React component
transpiled in the browser using Babel standalone library.