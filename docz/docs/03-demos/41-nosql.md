---
title: NoSQL Data Stores
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

So-called "Schema-less" databases allow for arbitrary keys and values within the
entries in the database.  K/V stores and Objects add additional restrictions.

:::note

These data stores are capable of storing structured data.  Those use cases are
covered in the [Database demo](./database).

:::

## Arbitrary Data to Spreadsheets

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

## Data Stores

### Redis

Redis has 5 core data types: "String", List", "Set", "Sorted Set", and "Hash".
Since the keys and values are limited to simple strings (and numbers), it is
possible to store complete databases in a single worksheet.

![SheetJSRedis.xlsx](pathname:///nosql/sheetjsredis.png)

#### Mapping

The first row holds the data type and the second row holds the property name.

<Tabs>
  <TabItem value="strings" label="Strings">

Strings can be stored in a unified String table. The first column holds keys
and the second column holds values:

```
XXX|    A    |   B   |
---+---------+-------+
 1 | Strings |       |
 2 |         |       |
 3 | Hello   | World |
 4 | Sheet   | JS    |
```

The SheetJS array-of-arrays representation of the string table is an array of
key/value pairs:

```js
let aoa = ["Strings"]; aoa.length = 2; // [ "Strings", empty ]
const keys = await client.KEYS("*");
for(let key of keys) {
  const type = await client.TYPE(key);
  if(type == "string") aoa.push([key, await client.GET(key)]);
}
```

  </TabItem>
  <TabItem value="list" label="Lists">

Lists are unidimensional and can be stored in their own columns.

```
XXX|    C    |
---+---------+
 1 | List    |
 2 | List1   |
 3 | List1V1 |
 4 | List1V2 |
```

The SheetJS array-of-arrays representation of lists is a column of values.

```js
if(type == "list") {
  let values = await client.LRANGE(key, 0, -1);
  aoa = [ ["List"], [key] ].concat(values.map(v => [v]));
}
```

  </TabItem>
  <TabItem value="set" label="Sets">

Sets are unidimensional and can be stored in their own columns.

```
XXX|   D   |
---+-------+
 1 | Set   |
 2 | Set1  |
 3 | Set1A |
 4 | Set1B |
```

The SheetJS array-of-arrays representation of sets is a column of values.

```js
if(type == "set") {
  let values = await client.SMEMBERS(key);
  aoa = [ ["Set"], [key] ].concat(values.map(v => [v]));
}
```

  </TabItem>
  <TabItem value="zset" label="Sorted Sets">

Sorted Sets have an associated score which can be stored in the second column.

```
XXX|    E    | F |
---+---------+---+
 1 | Sorted  |   |
 2 | ZSet1   |   |
 3 | Key1    | 1 |
 4 | Key2    | 2 |
```

The SheetJS array-of-arrays representation is an array of key/score pairs.

```js
if(type == "zset") {
  let values = await client.ZRANGE_WITHSCORES(key, 0, -1);
  aoa = [ ["Sorted"], [key] ].concat(values.map(v => [v.value, v.score]));
}
```

  </TabItem>
  <TabItem value="hashes" label="Hashes">

Hashes are stored like the string table, with key and value columns in order.

```
XXX|   G   |   H   |
---+-------+-------+
 1 | Hash  |       |
 2 | Hash1 |       |
 3 | Key1  | Val1  |
 4 | Key2  | Val2  |
```

The SheetJS array-of-arrays representation is an array of key/value pairs.

```js
if(type == "hash") {
  let values = await client.HGETALL(key);
  aoa = [ ["Hash"], [key] ].concat(Object.entries(values));
}
```

  </TabItem>
</Tabs>

#### Example

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Set up and start a local Redis server

1) Download the following scripts:

- [`SheetJSRedis.mjs`](pathname:///nosql/SheetJSRedis.mjs)
- [`SheetJSRedisTest.mjs`](pathname:///nosql/SheetJSRedisTest.mjs)

2) Install dependencies and run:

```bash
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz redis
node SheetJSRedisTest.mjs
```

Inspect the output and compare with the data in `SheetJSRedisTest.mjs`.

Open `SheetJSRedis.xlsx` and verify the columns have the correct data

</details>


### PouchDB

`Database#allDocs` is the standard approach for bulk data export. The generated
row objects have an additional `_id` and `_rev` keys that should be removed.

Nested objects must be flattened. The ["Tutorial"](../getting-started/example)
includes an example of constructing a simple array.

```js
function export_pouchdb_to_xlsx(db) {
  /* fetch all rows, including the underlying data */
  db.allDocs({include_docs: true}, function(err, doc) {
    
    /* pull the individual data rows */
    const aoo = doc.rows.map(r => {
      /* `rest` will include every field from `r` except for _id and _rev */
      const { _id, _rev, ...rest } = r;
      return rest;
    });

    /* generate worksheet */
    const ws = XLSX.utils.json_to_sheet(aoo);

    /* generate workbook and export */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSPouch.xlsx");
  });
}
```

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Download the "Working Version" from the Getting Started guide.

[ZIP](https://github.com/nickcolley/getting-started-todo/archive/master.zip)

The ZIP file should have `MD5` checksum `ac4da7cb0cade1be293ba222462f109c`:

```bash
curl -LO https://github.com/nickcolley/getting-started-todo/archive/master.zip
md5sum master.zip || md5 master.zip
### the checksum will be printed
```

If the download is unavailable, a mirror is available at
<https://docs.sheetjs.com/pouchdb/master.zip>

1) Unzip the `master.zip` file and enter the folder:

```bash
unzip master.zip
cd getting-started-todo-master
```

2) Edit `index.html` to reference the SheetJS library and add a button:

```html title="index.html"
  <body>
<!-- highlight-start -->
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <button id="xport">Export!</button>
<!-- highlight-end -->
    <section id="todoapp">
```

3) Just before the end of `app.js`, add a `click` event listener:

```js title="app.js"
  if (remoteCouch) {
    sync();
  }

  // highlight-start
  document.getElementById("xport").addEventListener("click", function() {
    db.allDocs({include_docs: true}, function(err, doc) {
      const aoo = doc.rows.map(r => {
        const { _id, _rev, ... rest } = r.doc;
        return rest;
      });
      const ws = XLSX.utils.json_to_sheet(aoo);
      const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "SheetJSPouch.xlsx");
    });
  });
  // highlight-end
})();
```

4) Start a local web server:

```bash
npx http-server .
```

Access `http://localhost:8080` from your browser.  Add a few items and click
the "Export!" button to generate a new file.

</details>
