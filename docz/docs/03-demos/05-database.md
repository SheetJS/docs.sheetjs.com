---
title: Databases and SQL
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

Key-value stores, unstructured use of Document Databases, and other schema-less
databases are covered in the [NoSQL demo](./nosql).


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
const aoo = XLSX.utils.sheet_to_json(ws);
// highlight-next-line
await db.collection('coll').insertMany(aoo, { ordered: true });
```

:::

This example will fetch <https://sheetjs.com/data/cd.xls>, scan the columns of the
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
    })).filter(x => x).slice(0, 6);
  }
  const [url, setUrl] = React.useState("https://sheetjs.com/data/cd.xls");
  const set_url = React.useCallback((evt) => setUrl(evt.target.value));
  const [out, setOut] = React.useState("");
  const xport = React.useCallback(async() => {
    const ab = await (await fetch(url)).arrayBuffer();
    const wb = XLSX.read(ab), wsname = wb.SheetNames[0];
    setOut(generate_sql(wb.Sheets[wsname], wsname).join("\n"));
  });

  return ( <> {out && (<><a href={url}>{url}</a><pre>{out}</pre></>)}
    <b>URL: </b><input type="text" value={url} onChange={set_url} size="50"/>
    <br/><button onClick={xport}><b>Fetch!</b></button>
  </> );
}
```

### DSV Interchange

Many databases offer utilities for reading and writing CSV, pipe-separated
documents, and other simple data files. They enable workflows where the library
generates CSV data for the database to process or where the library parses CSV
files created by the database.

#### Worksheet to CSV

CSV data can be generated from worksheets using `XLSX.utils.sheet_to_csv`.

```js
// starting from a worksheet object
const csv = XLSX.utils.sheet_to_json(ws);

// whole workbook conversion
const csv_arr = wb.SheetNames.map(n => XLSX.utils.sheet_to_json(wb.Sheets[n]));
```

#### CSV to Worksheet

`XLSX.read` can read strings with CSV data.  It will generate single-sheet
workbooks with worksheet name `Sheet1`.

Where supported, `XLSX.readFile` can read files.

```js
// starting from a CSV string
const ws_str = XLSX.read(csv_str, {type: "string"}).Sheets.Sheet1;

// starting from a CSV binary string (e.g. `FileReader#readAsBinaryString`)
const ws_bstr = XLSX.read(csv_bstr, {type: "binary"}).Sheets.Sheet1;

// starting from a CSV file in NodeJS or Bun or Deno
const ws_file = XLSX.readFile("test.csv").Sheets.Sheet1;
```

## Databases

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
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz better-sqlite3
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
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
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
[Firefox](https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/)
never supported Web SQL. Safari 13 dropped support. As of the time of writing,
the current Chrome version (103) supports WebSQL.

::::

WebSQL was a popular SQL-based in-browser database available on Chrome.  In
practice, it is powered by SQLite, and most simple SQLite-compatible queries
work as-is in WebSQL.

The public demo <http://sheetjs.com/sql> generates a database from workbook.

Importing data from spreadsheets is straightforward using the `generate_sql`
helper function from ["Building Schemas"](#building-schemas-from-worksheets):

```js
const db = openDatabase('sheetql', '1.0', 'SheetJS WebSQL Test', 2097152);
const stmts = generate_sql(ws, wsname);
// NOTE: tx.executeSql and db.transaction use callbacks. This wraps in Promises
for(var i = 0; i < stmts.length; ++i) await new Promise((res, rej) => {
  db.transaction(tx =>
    tx.executeSql(stmts[i], [],
      (tx, data) => res(data), // if the query is successful, return the data
      (tx, err) => rej(err) // if the query fails, reject with the error
  ));
});
```

The result of a SQL SELECT statement is a `SQLResultSet`.  The `rows` property
is a `SQLResultSetRowList`.  It is an "array-like" structure that has `length`
and properties like `0`, `1`, etc.  However, this is not a real Array object.
A real Array can be created using `Array.from`:

```js
const db = openDatabase('sheetql', '1.0', 'SheetJS WebSQL Test', 2097152);
db.readTransaction(tx =>
  tx.executeSQL("SELECT * FROM DatabaseTable", [], (tx, data) => {
    // data.rows is "array-like", so `Array.from` can make it a real array
    const aoo = Array.from(data.rows);
    const ws = XLSX.utils.json_to_sheet(aoo);
    // ... it is recommended to perform an export here OR wrap in a Promise
  })
);
```

The following demo generates a database with 5 fixed SQL statements. Queries
can be changed in the Live Editor.  The WebSQL database can be inspected in the
"WebSQL" section of the "Application" Tab of Developer Tools:

![WebSQL view in Developer Tools](pathname:///files/websql.png)

```jsx live
function SheetQL() {
  const [out, setOut] = React.useState("");
  const queries = [
    'DROP TABLE IF EXISTS Presidents',
    'CREATE TABLE Presidents (Name TEXT, Idx REAL)',
    'INSERT INTO Presidents  (Name, Idx) VALUES ("Barack Obama", 44)',
    'INSERT INTO Presidents  (Name, Idx) VALUES ("Donald Trump", 45)',
    'INSERT INTO Presidents  (Name, Idx) VALUES ("Joseph Biden", 46)'
  ];
  const xport = React.useCallback(async() => {
    // prep database
    const db = openDatabase('sheetql', '1.0', 'SheetJS WebSQL Test', 2097152);

    for(var i = 0; i < queries.length; ++i) await new Promise((res, rej) => {
      db.transaction((tx) => {
        tx.executeSql(queries[i], [], (tx, data) => res(data), (tx, err) => rej(err));
      });
    });

    // pull data and generate rows
    db.readTransaction(tx => {
      tx.executeSql("SELECT * FROM Presidents", [], (tx, data) => {
        const aoo = Array.from(data.rows);
        setOut("QUERY RESULT:\n" + aoo.map(r => JSON.stringify(r)).join("\n") + "\n")
        const ws = XLSX.utils.json_to_sheet(aoo);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Presidents");
        XLSX.writeFile(wb, "SheetQL.xlsx");
      });
    });
  });
  return ( <pre>{out}<button onClick={xport}><b>Fetch!</b></button></pre> );
}
```

### LocalStorage and SessionStorage

The Storage API, encompassing `localStorage` and `sessionStorage`, describes
simple key-value stores that only support string values and keys.

Arrays of objects can be stored using `JSON.stringify` using row index as key:

```js
const aoo = XLSX.utils.sheet_to_json(ws);
for(var i = 0; i < aoo.length; ++i) localStorage.setItem(i, JSON.stringify(aoo[i]));
```

Recovering the array of objects is possible by using `JSON.parse`:

```js
const aoo = [];
for(var i = 0; i < localStorage.length; ++i) aoo.push(JSON.parse(localStorage.getItem(i)));
const ws = XLSX.utils.json_to_sheet(aoo);
```

This example will fetch <https://sheetjs.com/data/cd.xls>, fill `localStorage` with
rows, then generate a worksheet from the rows and write to a new file.

:::caution

This example is for illustration purposes. If array of objects is available, it
is strongly recommended to convert that array to a worksheet directly.

:::

```jsx live
function SheetJStorage() {
  const [url, setUrl] = React.useState("https://sheetjs.com/data/cd.xls");
  const set_url = React.useCallback((evt) => setUrl(evt.target.value));
  const [out, setOut] = React.useState("");
  const xport = React.useCallback(async() => {
    // get first worksheet data as array of objects
    const ab = await (await fetch(url)).arrayBuffer();
    const wb = XLSX.read(ab), wsname = wb.SheetNames[0];
    const aoo = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);

    // reset and populate localStorage
    localStorage.clear();
    for(var i = 0; i < aoo.length; ++i) localStorage.setItem(i, JSON.stringify(aoo[i]));

    // create new array of objects from localStorage
    const new_aoo = [];
    for(var i = 0; i < localStorage.length; ++i) {
      const row = JSON.parse(localStorage.getItem(i));
      new_aoo.push(row);
    }

    setOut(`Number of rows in LocalStorage: ${localStorage.length}`);

    // create and export workbook
    const new_ws = XLSX.utils.json_to_sheet(new_aoo);
    const new_wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_wb, new_ws, "Sheet1");
    XLSX.writeFile(new_wb, "SheetJStorage.xlsx");
  });

  return ( <> {out && (<><a href={url}>{url}</a><pre>{out}</pre></>)}
    <b>URL: </b><input type="text" value={url} onChange={set_url} size="50"/>
    <br/><button onClick={xport}><b>Fetch!</b></button>
  </> );
}
```


### IndexedDB

`localForage` is a IndexedDB wrapper that presents an async Storage interface.

Arrays of objects can be stored using `JSON.stringify` using row index as key:

```js
const aoo = XLSX.utils.sheet_to_json(ws);
for(var i = 0; i < aoo.length; ++i) await localForage.setItem(i, JSON.stringify(aoo[i]));
```

Recovering the array of objects is possible by using `JSON.parse`:

```js
const aoo = [];
for(var i = 0; i < localForage.length; ++i) aoo.push(JSON.parse(await localForage.getItem(i)));
const wb = XLSX.utils.json_to_sheet(aoo);
```

### Other SQL Databases

The `generate_sql` function from ["Building Schemas from Worksheets"](#building-schemas-from-worksheets)
can be adapted to generate SQL statements for a variety of databases, including:

**PostgreSQL**

The `pg` connector library was tested against the `generate_sql` output as-is.

The `rows` property of a query result is an array of objects that plays nice
with `json_to_sheet`:

```js
const aoa = await connection.query(`SELECT * FROM DataTable`).rows;
const worksheet = XLSX.utils.json_to_sheet(aoa);
```

**MySQL / MariaDB**

The `mysql2` connector library was tested.  The differences are shown below,
primarily stemming from the different quoting requirements and field types.

<details><summary><b>Differences</b> (click to show)</summary>

```js
// highlight-start
// define mapping between determined types and MySQL types
const PG = { "n": "REAL", "s": "TEXT", "b": "TINYINT" };
// highlight-end

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
    // highlight-next-line
    `CREATE TABLE ${wsname} (${hdr.map(h =>
      // highlight-next-line
      `${h} ${PG[types[h]]}`
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
      // highlight-next-line
      fields.push(`${k}`);
      // when the field type is numeric, `true` -> 1 and `false` -> 0
      if(types[k] == "n") values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);
      // otherwise,
      // highlight-next-line
      else values.push(`"${v.toString().replaceAll('"', '""')}"`);
    })
    if(fields.length) return `INSERT INTO \`${wsname}\` (${fields.join(", ")}) VALUES (${values.join(", ")})`;
  })).filter(x => x); // filter out skipped rows
}
```

</details>

The first property of a query result is an array of objects that plays nice
with `json_to_sheet`:

```js
const aoa = await connection.query(`SELECT * FROM DataTable`)[0];
const worksheet = XLSX.utils.json_to_sheet(aoa);
```


### Query Builders

Query builders are designed to simplify query generation and normalize field
types and other database minutiae.

**Knex**

The result of a `SELECT` statement is an array of objects:

```js
const aoo = await connection.select("*").from("DataTable");
const worksheet = XLSX.utils.json_to_sheet(aoa);
```

Knex wraps primitive types when creating a table. `generate_sql` takes a `knex`
connection object and uses the API:

<details><summary><b>Generating a Table</b> (click to show)</summary>

```js
// define mapping between determined types and Knex types
const PG = { "n": "float", "s": "text", "b": "boolean" };

async function generate_sql(knex, ws, wsname) {

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

  await knex.schema.dropTableIfExists(wsname);
  await knex.schema.createTable(wsname, (table) => { hdr.forEach(h => { table[PG[types[h]] || "text"](h); }); });
  for(let i = 0; i < aoo.length; ++i) {
    if(!aoo[i] || !Object.keys(aoo[i]).length) continue;
    try { await knex.insert(aoo[i]).into(wsname); } catch(e) {}
  }
  return knex;
}
```

</details>


### MongoDB Structured Collections

MongoDB is a popular document-oriented database engine.

It is straightforward to treat collections as worksheets.  Each object maps to
a row in the table.

The official NodeJS connector is [`mongodb` on NPM](https://npm.im/mongodb).

Worksheets can be generated from collections by using `Collection#find`.  A
`projection` can suppress the object ID field:

```js
/* generate a worksheet from a collection */
const aoo = await collection.find({}, {projection:{_id:0}}).toArray();
const ws = utils.json_to_sheet(aoo);
```

Collections can be populated with data from a worksheet using `insertMany`:

```js
/* import data from a worksheet to a collection */
const aoo = XLSX.utils.sheet_to_json(ws);
await collection.insertMany(aoo, {ordered: true});
```

<details><summary><b>Complete Example</b> (click to show)</summary>

:::caution

When this demo was last tested, the `mongodb` module did not work with Node 18.
It was verified in Node 16.16.0.

:::

1) Install the dependencies:

```bash
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz mongodb
```

2) Start a MongoDB server on `localhost` (follow official instructions)

3) Save the following to `SheetJSMongoCRUD.mjs` (the key step is highlighted):

```js title="SheetJSMongoCRUD.mjs"
import { writeFile, set_fs, utils } from 'xlsx/xlsx.mjs';
import * as fs from 'fs'; set_fs(fs);
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/sheetjs';
const db_name = 'sheetjs';

(async() => {
/* Connect to mongodb server */
const client = await MongoClient.connect(url, { useUnifiedTopology: true });

/* Sample data table */
const db = client.db(db_name);
try { await db.collection('pres').drop(); } catch(e) {}
const pres = db.collection('pres');
await pres.insertMany([
  { name: "Barack Obama", idx: 44 },
  { name: "Donald Trump", idx: 45 },
  { name: "Joseph Biden", idx: 46 }
], {ordered: true});

// highlight-start
/* Export database to XLSX */
const wb = utils.book_new();
const aoo = await pres.find({}, {projection:{_id:0}}).toArray();
const ws = utils.json_to_sheet(aoo);
utils.book_append_sheet(wb, ws, "Presidents");
writeFile(wb, "SheetJSMongoCRUD.xlsx");
// highlight-end

/* Close connection */
client.close();
})();
```

4) Run `node SheetJSMongoCRUD.mjs` and open `SheetJSMongoCRUD.xlsx`

</details>


