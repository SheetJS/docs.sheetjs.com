---
sidebar_position: 9
title: Databases
---

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## SQLite

Most platforms offer a simple way to query `.sqlite` databases.

The following example shows how to query for each table in an SQLite database,
query for the data for each table, add each non-empty table to a workbook, and
export as XLSX.

[The Northwind database is available in SQLite form](https://github.com/jpwhite3/northwind-SQLite3/raw/master/Northwind_large.sqlite.zip).
Download and expand the zip archive to reveal `Northwind_large.sqlite`

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

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