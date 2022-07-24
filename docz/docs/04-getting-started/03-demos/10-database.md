---
sidebar_position: 9
title: Databases
---

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


"Database" is a catch-all term referring to traditional RDBMS as well as K/V
stores, document databases, and other "NoSQL" storages. There are many external
database systems as well as browser APIs like WebSQL and `localStorage`

This demo discusses general strategies and provides examples for a variety of
database systems.  The examples are merely intended to demonstrate very basic
functionality.


## Structured Tables

Database tables are a common import and export target for spreadsheets.  One
common representation of a database table is an array of JS objects whose keys
are column headers and whose values are the underlying data values. For example,

| Name         | Index |
| :----------- | ----: |
| Barack Obama |    44 |
| Donald Trump |    45 |
| Joseph Biden |    46 |

is naturally represented as an array of objects

```js
[
  { Name: "Barack Obama", Index: 44 },
  { Name: "Donald Trump", Index: 45 },
  { Name: "Joseph Biden", Index: 46 }
]
```

The `sheet_to_json` and `json_to_sheet` helper functions work with objects of
similar shape, converting to and from worksheet objects.  The corresponding
worksheet would include a header row for the labels:

```
XXX|      A       |   B   |
---+--------------+-------+
 1 | Name         | Index |
 2 | Barack Obama |    44 |
 3 | Donald Trump |    45 |
 3 | Joseph Biden |    46 |
```


### Building Worksheets from Structured Tables

There are NodeJS connector libraries for many popular RDBMS systems.  Libraries
have facilities for connecting to a database, executing queries, and obtaining
results as arrays of JS objects that can be passed to `json_to_sheet`.  The main
differences surround API shape and supported data types.

For example, `better-sqlite3` is a connector library for SQLite. The result of
a `SELECT` query is an array of objects suitable for `json_to_sheet`:

```js
var aoo = db.prepare("SELECT * FROM 'Presidents' LIMIT 100000").all();
// highlight-next-line
var worksheet = XLSX.utils.json_to_sheet(aoo);
```

Other databases will require post-processing.  For example, MongoDB results
include the Object ID (usually stored in the `_id` key).  This can be removed
before generating a worksheet:

```js
const aoo = await db.collection('coll').find({}).toArray();
// highlight-next-line
aoo.forEach((x) => delete x._id);
const ws = XLSX.utils.json_to_sheet(aoo);
```

### Building Schemas from Worksheets

When a strict schema is needed, the `sheet_to_json` helper function generates
arrays of JS objects that can be scanned to determine the column "types".

:::note

Document databases like MongoDB tend not to require schemas. Arrays of objects
can be used directly without setting up a schema:

```js
const aoa = XLSX.utils.sheet_to_json(ws);
// highlight-next-line
await db.collection('coll').insertMany(aoa, { ordered: true });
```

:::

This example will fetch <https://sheetjs.com/cd.xls>, scan the columns of the
first worksheet to determine data types, and generate 6 PostgreSQL statements.

<details><summary><b>Explanation</b> (click to show)</summary>

The relevant `generate_sql` function takes a worksheet name and a table name:

```js
// define mapping between determined types and PostgreSQL types
const PG = { "n": "float8", "s": "text", "b": "boolean" };

function generate_sql(ws, wsname) {

  // generate an array of objects from the data
  const aoo = XLSX.utils.sheet_to_json(ws);

  // types will map column headers to types, while hdr holds headers in order
  const types = {}, hdr = [];

  // loop across each row object
  aoo.forEach(row => 
    // Object.entries returns a row of [key, value] pairs.  Loop across those
    Object.entries(row).forEach(([k,v]) => {

      // If this is first time seeing key, mark unknown and append header array
      if(!types[k]) { types[k] = "?"; hdr.push(k); }

      // skip null and undefined
      if(v == null) return;

      // check and resolve type
      switch(typeof v) {
        case "string": // strings are the broadest type
          types[k] = "s"; break;
        case "number": // if column is not string, number is the broadest type
          if(types[k] != "s") types[k] = "n"; break;
        case "boolean": // only mark boolean if column is unknown or boolean
          if("?b".includes(types[k])) types[k] = "b"; break;
        default: types[k] = "s"; break; // default to string type
      }
    })
  );

  // The final array consists of the CREATE TABLE query and a series of INSERTs
  return [
    // generate CREATE TABLE query and return batch
    `CREATE TABLE \`${wsname}\` (${hdr.map(h => 
      // column name must be wrapped in backticks
      `\`${h}\` ${PG[types[h]]}`
    ).join(", ")});`
  ].concat(aoo.map(row => { // generate INSERT query for each row
    // entries will be an array of [key, value] pairs for the data in the row
    const entries = Object.entries(row);
    // fields will hold the column names and values will hold the values
    const fields = [], values = [];
    // check each key/value pair in the row
    entries.forEach(([k,v]) => {
      // skip null / undefined
      if(v == null) return;
      // column name must be wrapped in backticks
      fields.push(`\`${k}\``);
      // when the field type is numeric, `true` -> 1 and `false` -> 0
      if(types[k] == "n") values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);
      // otherwise, 
      else values.push(`'${v.toString().replaceAll("'", "''")}'`);
    })
    if(fields.length) return `INSERT INTO \`${wsname}\` (${fields.join(", ")}) VALUES (${values.join(", ")})`;
  })).filter(x => x); // filter out skipped rows
}
```

</details>

```jsx live
function SheetJSQLWriter() {
  // define mapping between determined types and PostgreSQL types
  const PG = { "n": "float8", "s": "text", "b": "boolean" };
  function generate_sql(ws, wsname) {
    const aoo = XLSX.utils.sheet_to_json(ws);
    const types = {}, hdr = [];
    // loop across each key in each column
    aoo.forEach(row => Object.entries(row).forEach(([k,v]) => {
      // set up type if header hasn't been seen
      if(!types[k]) { types[k] = "?"; hdr.push(k); }
      // check and resolve type
      switch(typeof v) {
        case "string": types[k] = "s"; break;
        case "number": if(types[k] != "s") types[k] = "n"; break;
        case "boolean": if("?b".includes(types[k])) types[k] = "b"; break;
        default: types[k] = "s"; break;
      }
    }));
    return [
      // generate CREATE TABLE query and return batch
      `CREATE TABLE \`${wsname}\` (${hdr.map(h => `\`${h}\` ${PG[types[h]]}`).join(", ")});`
    ].concat(aoo.map(row => {
      const entries = Object.entries(row);
      const fields = [], values = [];
      entries.forEach(([k,v]) => {
        if(v == null) return;
        fields.push(`\`${k}\``);
        if(types[k] == "n") values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);
        else values.push(`'${v.toString().replaceAll("'", "''")}'`);
      })
      if(fields.length) return `INSERT INTO \`${wsname}\` (${fields.join(", ")}) VALUES (${values.join(", ")})`;
    })).filter(x => x).slice(0, 5);
  }
  const [url, setUrl] = React.useState("https://sheetjs.com/cd.xls");
  const set_url = React.useCallback((evt) => setUrl(evt.target.value));
  const [out, setOut] = React.useState("");
  const xport = React.useCallback(async() => {
    console.log(url);
    const ab = await (await fetch(url)).arrayBuffer();
    const wb = XLSX.read(ab), wsname = wb.SheetNames[0];
    setOut(generate_sql(wb.Sheets[wsname], wsname).join("\n"));
  });

  return ( <> {out && (<pre>{out}</pre>)}
    <b>URL: </b><input type="text" value={url} onChange={set_url} size="50"/>
    <br/><button onClick={xport}><b>Fetch!</b></button>
  </> );
}
```


## SQL

### SQLite

Most platforms offer a simple way to query SQLite databases.

The following example shows how to query for each table in an SQLite database,
query for the data for each table, add each non-empty table to a workbook, and
export as XLSX.

[The Northwind database is available in SQLite form](https://github.com/jpwhite3/northwind-SQLite3/raw/master/Northwind_large.sqlite.zip).
Download and expand the zip archive to reveal `Northwind_large.sqlite`

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

[The `better-sqlite3` module](https://www.npmjs.com/package/better-sqlite3)
provides a very simple API for working with SQLite databases.  `Statement#all`
runs a prepared statement and returns an array of JS objects.

1) Install the dependencies:

```bash
$ npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz better-sqlite3
```

2) Save the following to `node.mjs`:

```js title="node.mjs"
/* Load SQLite3 connector library */
import Database from "better-sqlite3";

/* Load SheetJS library */
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
XLSX.set_fs(fs);

/* Initialize database */
var db = Database("Northwind_large.sqlite");

/* Create new workbook */
var wb = XLSX.utils.book_new();

/* Get list of table names */
var sql = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
var result = sql.all();

/* Loop across each name */
result.forEach(function(row) {
  /* Get first 100K rows */
	var aoo = db.prepare("SELECT * FROM '" + row.name + "' LIMIT 100000").all();
	if(aoo.length > 0) {
    /* Create Worksheet from the row objects */
    var ws = XLSX.utils.json_to_sheet(aoo, {dense: true});
    /* Add to Workbook */
    XLSX.utils.book_append_sheet(wb, ws, row.name);
  }
});

/* Write File */
XLSX.writeFile(wb, "node.xlsx");
```

3) Run `node node.mjs` and open `node.xlsx`

  </TabItem>
  <TabItem value="bun" label="Bun">

Bun ships with a built-in high-performance module `bun:sqlite`.

1) Install the dependencies:

```bash
$ npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

2) Save the following to `bun.mjs`:

```js title="bun.mjs"
/* Load SQLite3 connector library */
import { Database } from "bun:sqlite";

/* Load SheetJS library */
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
XLSX.set_fs(fs);

/* Initialize database */
var db = Database.open("Northwind_large.sqlite");

/* Create new workbook */
var wb = XLSX.utils.book_new();

/* Get list of table names */
var sql = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
var result = sql.all();

/* Loop across each name */
result.forEach(function(row) {
  /* Get first 100K rows */
	var aoo = db.prepare("SELECT * FROM '" + row.name + "' LIMIT 100000").all();
	if(aoo.length > 0) {
    /* Create Worksheet from the row objects */
    var ws = XLSX.utils.json_to_sheet(aoo, {dense: true});
    /* Add to Workbook */
    XLSX.utils.book_append_sheet(wb, ws, row.name);
  }
});

/* Write File */
XLSX.writeFile(wb, "bun.xlsx");
```

3) Run `bun bun.mjs` and open `bun.xlsx`

  </TabItem>
</Tabs>


### WebSQL

:::warning

This information is included for legacy deployments.  Web SQL is deprecated.

<https://caniuse.com/sql-storage> has up-to-date info on browser support.

::::

WebSQL was a popular SQL-based in-browser database available on Chrome.  In
practice, it is powered by SQLite, and most simple SQLite-compatible queries
work as-is in WebSQL.

The public demo <http://sheetjs.com/sql> generates a database from workbook.


## Objects, K/V and "Schema-less" Databases

So-called "Schema-less" databases allow for arbitrary keys and values within the
entries in the database.  K/V stores and Objects add additional restrictions.

There is no natural way to translate arbitrarily shaped schemas to worksheets
in a workbook.  One common trick is to dedicate one worksheet to holding named
keys.  For example, considering the JS object:

```json
{
  "title": "SheetDB",
  "metadata": {
    "author": "SheetJS",
    "code": 7262
  },
  "data": [
    { "Name": "Barack Obama", "Index": 44 },
    { "Name": "Donald Trump", "Index": 45 },
  ]
}
```

A dedicated worksheet should store the one-off named values:

```
XXX|        A        |    B    |
---+-----------------+---------+
 1 | Path            | Value   |
 2 | title           | SheetDB |
 3 | metadata.author | SheetJS |
 4 | metadata.code   |    7262 |
```
