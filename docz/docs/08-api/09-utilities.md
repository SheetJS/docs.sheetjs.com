---
sidebar_position: 9
---


# Utility Functions

The `sheet_to_*` functions accept a worksheet and an optional options object.

The `*_to_sheet` functions accept a data object and an optional options object.

The `sheet_add_*` functions accept worksheet, data, and optional options.

The examples are based on the following worksheet:

<table>
<tr><td>S</td><td>h</td><td>e</td><td>e</td><td>t</td><td>J</td><td>S</td></tr>
<tr><td>1</td><td>2</td><td> </td><td> </td><td>5</td><td>6</td><td>7</td></tr>
<tr><td>2</td><td>3</td><td> </td><td> </td><td>6</td><td>7</td><td>8</td></tr>
<tr><td>3</td><td>4</td><td> </td><td> </td><td>7</td><td>8</td><td>9</td></tr>
<tr><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>0</td></tr>
</table>


### Array of Arrays Input

**Create a worksheet from an array of arrays**

```js
var ws = XLSX.utils.aoa_to_sheet(aoa, opts);
```

`XLSX.utils.aoa_to_sheet` takes an array of arrays of JS values and returns a
worksheet resembling the input data.  Numbers, Booleans and Strings are stored
as the corresponding styles.  Dates are stored as date or numbers.  Array holes
and explicit `undefined` values are skipped.  `null` values may be stubbed. All
other values are stored as strings.  The function takes an options argument:

| Option Name | Default | Description                                          |
| :---------- | :-----: | :--------------------------------------------------- |
|`dateNF`     |  FMT 14 | Use specified date format in string output           |
|`cellDates`  |  false  | Store dates as type `d` (default is `n`)             |
|`sheetStubs` |  false  | Create cell objects of type `z` for `null` values    |
|`nullError`  |  false  | If true, emit `#NULL!` error cells for `null` values |

The example worksheet can be generated with:

```js
var ws = XLSX.utils.aoa_to_sheet([
  ["S", "h", "e", "e", "t", "J", "S"],
  [  1,   2,    ,    ,   5,   6,   7],
  [  2,   3,    ,    ,   6,   7,   8],
  [  3,   4,    ,    ,   7,   8,   9],
  [  4,   5,   6,   7,   8,   9,   0]
]);
```

**Add data from an array of arrays to an existing worksheet**

```js
XLSX.utils.sheet_add_aoa(ws, aoa, opts);
```

`XLSX.utils.sheet_add_aoa` takes an array of arrays of JS values and updates an
existing worksheet object.  It follows the same process as `aoa_to_sheet` and
accepts an options argument:

| Option Name | Default | Description                                          |
| :---------- | :-----: | :--------------------------------------------------- |
|`dateNF`     |  FMT 14 | Use specified date format in string output           |
|`cellDates`  |  false  | Store dates as type `d` (default is `n`)             |
|`sheetStubs` |  false  | Create cell objects of type `z` for `null` values    |
|`nullError`  |  false  | If true, emit `#NULL!` error cells for `null` values |
|`origin`     |         | Use specified cell as starting point (see below)     |

`origin` is expected to be one of:

| `origin`         | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| (cell object)    | Use specified cell (cell object)                          |
| (string)         | Use specified cell (A1-Style cell)                        |
| (number >= 0)    | Start from the first column at specified row (0-indexed)  |
| -1               | Append to bottom of worksheet starting on first column    |
| (default)        | Start from cell `A1`                                      |


The example worksheet can be built up in the order `A1:G1, A2:B4, E2:G4, A5:G5`:

```js
/* Initial row */
var ws = XLSX.utils.aoa_to_sheet([ "SheetJS".split("") ]);

/* Write data starting at A2 */
XLSX.utils.sheet_add_aoa(ws, [[1,2], [2,3], [3,4]], {origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_aoa(ws, [[5,6,7], [6,7,8], [7,8,9]], {origin:{r:1, c:4}});

/* Append row */
XLSX.utils.sheet_add_aoa(ws, [[4,5,6,7,8,9,0]], {origin: -1});
```

### Array of Objects Input

**Create a worksheet from an array of objects**

```js
var ws = XLSX.utils.json_to_sheet(aoo, opts);
```

`XLSX.utils.json_to_sheet` takes an array of objects and returns a worksheet
with automatically-generated "headers" based on the keys of the objects.  The
default column order is determined by the first appearance of the field using
`Object.keys`.  The function accepts an options argument:

| Option Name | Default | Description                                          |
| :---------- | :-----: | :--------------------------------------------------- |
|`header`     |         | Use specified field order (default `Object.keys`) ** |
|`dateNF`     |  FMT 14 | Use specified date format in string output           |
|`cellDates`  |  false  | Store dates as type `d` (default is `n`)             |
|`skipHeader` |  false  | If true, do not include header row in output         |
|`nullError`  |  false  | If true, emit `#NULL!` error cells for `null` values |

:::caution

All fields from each row will be written! `header` hints at a particular order
but is not exclusive. To remove fields from the export, filter the data source.

Some data sources have special options to filter properties.  For example,
MongoDB will add the `_id` field when finding data from a collection:

```js
const aoo_with_id = await coll.find({}).toArray();
const ws = XLSX.utils.json_to_sheet(aoo_with_id); // includes _id column
```

This can be filtered out through the `projection` property:

```js
const aoo = await coll.find({}, {projection:{_id:0}}).toArray(); // no _id !
const ws = XLSX.utils.json_to_sheet(aoo);
```

If a data source does not provide a filter option, it can be filtered manually:

```js
const aoo = data.map(obj => Object.fromEntries(Object.entries(obj).filter(r => headers.indexOf(r[0]) > -1)));
```

:::

- If `header` is an array, missing keys will be added in order of first use.
- Cell types are deduced from the type of each value.  For example, a `Date`
  object will generate a Date cell, while a string will generate a Text cell.
- Null values will be skipped by default.  If `nullError` is true, an error cell
  corresponding to `#NULL!` will be written to the worksheet.

The example sheet cannot be reproduced using plain objects since JS object keys
must be unique. After replacing the second `e` and `S` with `e_1` and `S_1`:

```js
var ws = XLSX.utils.json_to_sheet([
  { S:1, h:2,    ,      , t:5, J:6, S_1:7 },
  { S:2, h:3,    ,      , t:6, J:7, S_1:8 }
  { S:3, h:4,    ,      , t:7, J:8, S_1:9 }
  { S:4, h:5, e:6, e_1:7, t:8, J:9, S_1:0 }
], {header:["S","h","e","e_1","t","J","S_1"]});
```

Alternatively, a different set of unique headers can be used with `skipHeader`:

```js
var ws = XLSX.utils.json_to_sheet([
  { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
  { A:  1, B:  2,      ,      , E:  5, F:  6, G:  7  },
  { A:  2, B:  3,      ,      , E:  6, F:  7, G:  8  }
  { A:  3, B:  4,      ,      , E:  7, F:  8, G:  9  },
  { A:  4, B:  5, C:  6, D:  7, E:  8, F:  9, G:  0  },
], {header:["A","B","C","D","E","F","G"], skipHeader:true});
```

**Add data from an array of objects to an existing worksheet**

```js
XLSX.utils.sheet_add_json(ws, aoo, opts);
```

`XLSX.utils.sheet_add_json` takes an array of objects and updates an existing
worksheet object.  It follows the same process as `json_to_sheet` and accepts
an options argument:

| Option Name | Default | Description                                          |
| :---------- | :-----: | :--------------------------------------------------- |
|`header`     |         | Use specified column order (default `Object.keys`)   |
|`dateNF`     |  FMT 14 | Use specified date format in string output           |
|`cellDates`  |  false  | Store dates as type `d` (default is `n`)             |
|`skipHeader` |  false  | If true, do not include header row in output         |
|`nullError`  |  false  | If true, emit `#NULL!` error cells for `null` values |
|`origin`     |         | Use specified cell as starting point (see below)     |

`origin` is expected to be one of:

| `origin`         | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| (cell object)    | Use specified cell (cell object)                          |
| (string)         | Use specified cell (A1-Style cell)                        |
| (number >= 0)    | Start from the first column at specified row (0-indexed)  |
| -1               | Append to bottom of worksheet starting on first column    |
| (default)        | Start from cell `A1`                                      |


This example worksheet can be built up in the order `A1:G1, A2:B4, E2:G4, A5:G5`:

```js
/* Initial row */
var ws = XLSX.utils.json_to_sheet([
  { A: "S", B: "h", C: "e", D: "e", E: "t", F: "J", G: "S" }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true});

/* Write data starting at A2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }
], {skipHeader: true, origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 5, B: 6, C: 7 }, { A: 6, B: 7, C: 8 }, { A: 7, B: 8, C: 9 }
], {skipHeader: true, origin: { r: 1, c: 4 }, header: [ "A", "B", "C" ]});

/* Append row */
XLSX.utils.sheet_add_json(ws, [
  { A: 4, B: 5, C: 6, D: 7, E: 8, F: 9, G: 0 }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true, origin: -1});
```

:::note

If the `header` option is an array, `sheet_add_json` and `sheet_to_json` will
append missing elements.

This design enables consistent header order across calls:

```jsx live
function SheetJSHeaderOrder() {
  /* Use shared header */
  const header = [];
  const ws1 = XLSX.utils.json_to_sheet([ {C: 2, D: 3}, ], {header});
  XLSX.utils.sheet_add_json(ws1, [ {D: 1, C: 4}, ], {header, origin: -1, skipHeader: true});

  /* only use header in first call */
  const ws2 = XLSX.utils.json_to_sheet([ {C: 2, D: 3}, ], {header:[]});
  XLSX.utils.sheet_add_json(ws2, [ {D: 1, C: 4}, ], {origin: -1, skipHeader: true});

  return (<pre>
    <b>Objects</b>
    {"\n[\n  { C: 2, D: 3 },\n  { D: 1, C: 4 } // different key order\n]\n"}<br/>
    <b>Worksheet when same `header` array is passed to `sheet_add_json`</b>
    <div dangerouslySetInnerHTML={{__html:XLSX.utils.sheet_to_html(ws1)}}/>
    <i>New contents of `header`</i><br/>
    {JSON.stringify(header)}<br/>
    <br/>
    <b>Worksheet when no `header` property is passed to `sheet_add_json`</b>
    <div dangerouslySetInnerHTML={{__html:XLSX.utils.sheet_to_html(ws2)}}/>
  </pre>)
}
```

:::

### HTML Table Input

**Create a worksheet or workbook from a TABLE element**

```js
var ws = XLSX.utils.table_to_sheet(elt, opts);
var wb = XLSX.utils.table_to_book(elt, opts);
```

`XLSX.utils.table_to_sheet` takes a table DOM element and returns a worksheet
resembling the input table.  Numbers are parsed.  All other data will be stored
as strings.

`XLSX.utils.table_to_book` produces a minimal workbook based on the worksheet.

Both functions accept options arguments:

| Option Name |  Default | Description                                         |
| :---------- | :------: | :-------------------------------------------------- |
|`raw`        |          | If true, every cell will hold raw strings           |
|`dateNF`     |  FMT 14  | Use specified date format in string output          |
|`cellDates`  |  false   | Store dates as type `d` (default is `n`)            |
|`sheetRows`  |    0     | If >0, read the first `sheetRows` rows of the table |
|`display`    |  false   | If true, hidden rows and cells will not be parsed   |


To generate the example sheet, assuming the table has ID `sheetjs`:

```js
var tbl = document.getElementById('sheetjs');
var ws = XLSX.utils.table_to_sheet(tbl);
```

:::note

`table_to_book` and `table_to_sheet` act on HTML DOM elements.  Starting from
an HTML string, there are two parsing approaches:

A) Table Phantasm: create a DIV with the desired HTML.

```js
/* create element from the source */
var elt = document.createElement("div");
elt.innerHTML = html_source;
document.body.appendChild(elt);

/* generate worksheet */
var ws = XLSX.utils.table_to_sheet(elt.getElementsByTagName("TABLE")[0]);

/* remove element */
document.body.removeChild(elt);
```

B) Raw HTML: use `XLSX.read` to read the text in the same manner as CSV.

```js
var wb = XLSX.read(html_source, { type: "string" });
var ws = wb.Sheets[wb.SheetNames[0]];
```

:::

**Add data from a TABLE element to an existing worksheet**

```js
XLSX.utils.sheet_add_dom(ws, elt, opts);
```

`XLSX.utils.sheet_add_dom` takes a table DOM element and updates an existing
worksheet object.  It follows the same process as `table_to_sheet` and accepts
an options argument:

| Option Name |  Default | Description                                         |
| :---------- | :------: | :-------------------------------------------------- |
|`raw`        |          | If true, every cell will hold raw strings           |
|`dateNF`     |  FMT 14  | Use specified date format in string output          |
|`cellDates`  |  false   | Store dates as type `d` (default is `n`)            |
|`sheetRows`  |    0     | If >0, read the first `sheetRows` rows of the table |
|`display`    |  false   | If true, hidden rows and cells will not be parsed   |

`origin` is expected to be one of:

| `origin`         | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| (cell object)    | Use specified cell (cell object)                          |
| (string)         | Use specified cell (A1-Style cell)                        |
| (number >= 0)    | Start from the first column at specified row (0-indexed)  |
| -1               | Append to bottom of worksheet starting on first column    |
| (default)        | Start from cell `A1`                                      |


A common use case for `sheet_add_dom` involves adding multiple tables to a
single worksheet, usually with a few blank rows in between each table:

![Multi-Table Export in Excel](pathname:///files/multitable.png)

```jsx live
function MultiTable() {
  const headers = ["Table 1", "Table2", "Table 3"];

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(async () => {
    /* This function creates gap rows */
    function create_gap_rows(ws, nrows) {
      var ref = XLSX.utils.decode_range(ws["!ref"]);       // get original range
      ref.e.r += nrows;                                    // add to ending row
      ws["!ref"] = XLSX.utils.encode_range(ref);           // reassign row
    }

    /* first table */
    const ws = XLSX.utils.aoa_to_sheet([[headers[0]]]);
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table1'), {origin: -1});
    create_gap_rows(ws, 1); // one row gap after first table

    /* second table */
    XLSX.utils.sheet_add_aoa(ws, [[headers[1]]], {origin: -1});
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table2'), {origin: -1});
    create_gap_rows(ws, 2); // two rows gap after second table

    /* third table */
    XLSX.utils.sheet_add_aoa(ws, [[headers[2]]], {origin: -1});
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), {origin: -1});

    /* create workbook and export */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Export");
    XLSX.writeFile(wb, "SheetJSMultiTablexport.xlsx");
  });

  return (
    <>
      <button onClick={xport}><b>Export XLSX!</b></button><br/><br/>
      <b>{headers[0]}</b><br/>
      <table id="table1">
        <tr><td>A2</td><td>B2</td></tr>
        <tr><td>A3</td><td>B3</td></tr>
      </table>
      <b>{headers[1]}</b><br/>
      <table id="table2">
        <tr><td>A6</td><td>B6</td><td>C6</td></tr>
        <tr><td>A7</td><td>B7</td><td>C7</td></tr>
      </table>
      <br/>
      <b>{headers[2]}</b><br/>
      <table id="table3">
        <tr><td>A11</td><td>B11</td></tr>
        <tr><td>A12</td><td>B12</td></tr>
      </table>
    </>
  );
}
```

### Delimiter-Separated Output

```js
var csv = XLSX.utils.sheet_to_csv(ws, opts);
```

As an alternative to the `writeFile` CSV type, `XLSX.utils.sheet_to_csv` also
produces CSV output.  The function takes an options argument:

| Option Name  |  Default | Description                                        |
| :----------- | :------: | :------------------------------------------------- |
|`FS`          |  `","`   | "Field Separator"  delimiter between fields        |
|`RS`          |  `"\n"`  | "Record Separator" delimiter between rows          |
|`dateNF`      |  FMT 14  | Use specified date format in string output         |
|`strip`       |  false   | Remove trailing field separators in each record ** |
|`blankrows`   |  true    | Include blank lines in the CSV output              |
|`skipHidden`  |  false   | Skips hidden rows/columns in the CSV output        |
|`forceQuotes` |  false   | Force quotes around fields                         |

- `strip` will remove trailing commas from each line under default `FS/RS`
- `blankrows` must be set to `false` to skip blank lines.
- Fields containing the record or field separator will automatically be wrapped
  in double quotes; `forceQuotes` forces all cells to be wrapped in quotes.
- `XLSX.write` with `csv` type will always prepend the UTF-8 byte-order mark for
  Excel compatibility.  `sheet_to_csv` returns a JS string and omits the mark.
  Using `XLSX.write` with type `string` will also skip the mark.


Starting from the example worksheet:

```jsx live
function SheetJSCSVTest() {
  var ws = XLSX.utils.aoa_to_sheet([
    ["S", "h", "e", "e", "t", "J", "S"],
    [  1,   2,    ,    ,   5,   6,   7],
    [  2,   3,    ,    ,   6,   7,   8],
    [  3,   4,    ,    ,   7,   8,   9],
    [  4,   5,   6,   7,   8,   9,   0]
  ]);
  return ( <pre>
    <b>Worksheet (as HTML)</b>
    <div dangerouslySetInnerHTML={{__html: XLSX.utils.sheet_to_html(ws)}}/>
    <b>XLSX.utils.sheet_to_csv(ws)</b><br/>
    {XLSX.utils.sheet_to_csv(ws)}<br/><br/>
    <b>XLSX.utils.sheet_to_csv(ws, {'{'} FS: "\t" {'}'})</b><br/>
    {XLSX.utils.sheet_to_csv(ws, { FS: "\t" })}<br/><br/>
    <b>XLSX.utils.sheet_to_csv(ws, {'{'} FS: ":", RS: "|" {'}'})</b><br/>
    {XLSX.utils.sheet_to_csv(ws, { FS: ":", RS: "|" })}<br/>
  </pre> );
}
```

**UTF-16 Text Output**

```js
var txt = XLSX.utils.sheet_to_txt(ws, opts);
```

The `txt` output type uses the tab character as the field separator.  If the
`codepage` library is available (included in full distribution but not core),
the output will be encoded in `CP1200` and the UTF-16 BOM will be added.

`XLSX.utils.sheet_to_txt` takes the same arguments as `sheet_to_csv`.


### HTML Output

```js
var html = XLSX.utils.sheet_to_html(ws, opts);
```

As an alternative to the `writeFile` HTML type, `XLSX.utils.sheet_to_html` also
produces HTML output.  The function takes an options argument:

| Option Name |  Default | Description                                         |
| :---------- | :------: | :-------------------------------------------------- |
|`id`         |          | Specify the `id` attribute for the `TABLE` element  |
|`editable`   |  false   | If true, set `contenteditable="true"` for every TD  |
|`header`     |          | Override header (default `html body`)               |
|`footer`     |          | Override footer (default `/body /html`)             |

Starting from the example worksheet:

```jsx live
function SheetJSHTML() {
  var ws = XLSX.utils.aoa_to_sheet([
    ["S", "h", "e", "e", "t", "J", "S"],
    [  1,   2,    ,    ,   5,   6,   7],
    [  2,   3,    ,    ,   6,   7,   8],
    [  3,   4,    ,    ,   7,   8,   9],
    [  4,   5,   6,   7,   8,   9,   0]
  ]);
  return ( <pre>
    <b>XLSX.utils.sheet_to_html(ws)</b>
    <div dangerouslySetInnerHTML={{__html: XLSX.utils.sheet_to_html(ws)}}/>
  </pre> );
}
```

### Array Output

```js
var arr = XLSX.utils.sheet_to_json(ws, opts);

var aoa = XLSX.utils.sheet_to_json(ws, {header: 1, ...other_opts});
```

`XLSX.utils.sheet_to_json` generates different types of JS objects. The function
takes an options argument:

| Option Name |  Default | Description                                         |
| :---------- | :------: | :-------------------------------------------------- |
|`raw`        | `true`   | Use raw values (true) or formatted strings (false)  |
|`range`      |    **    | Override Range (see table below)                    |
|`header`     |          | Control output format (see table below)             |
|`dateNF`     |  FMT 14  | Use specified date format in string output          |
|`defval`     |          | Use specified value in place of null or undefined   |
|`blankrows`  |    **    | Include blank lines in the output **                |

- `raw` only affects cells which have a format code (`.z`) field or a formatted
  text (`.w`) field.
- If `header` is specified, the first row is considered a data row; if `header`
  is not specified, the first row is the header row and not considered data.
- When `header` is not specified, the conversion will automatically disambiguate
  header entries by affixing `_` and a count starting at `1`.  For example, if
  three columns have header `foo` the output fields are `foo`, `foo_1`, `foo_2`
- `null` values are returned when `raw` is true but are skipped when false.
- If `defval` is not specified, null and undefined values are skipped normally.
  If specified, all null and undefined points will be filled with `defval`
- When `header` is `1`, the default is to generate blank rows.  `blankrows` must
  be set to `false` to skip blank rows.
- When `header` is not `1`, the default is to skip blank rows.  `blankrows` must
  be true to generate blank rows

`range` is expected to be one of:

| `range`          | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| (number)         | Use worksheet range but set starting row to the value     |
| (string)         | Use specified range (A1-Style bounded range string)       |
| (default)        | Use worksheet range (`ws['!ref']`)                        |

`header` is expected to be one of:

| `header`         | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| `1`              | Generate an array of arrays                               |
| `"A"`            | Row object keys are literal column labels                 |
| array of strings | Use specified strings as keys in row objects              |
| (default)        | Read and disambiguate first row as keys                   |

- If header is not `1`, the row object will contain the non-enumerable property
  `__rowNum__` that represents the row of the sheet corresponding to the entry.
- If header is an array, the keys will not be disambiguated.  This can lead to
  unexpected results if the array values are not unique!

For the example worksheet:

```jsx live
function SheetJSToJSON() {
  /* original data */
  var ws = XLSX.utils.aoa_to_sheet([
    ["S", "h", "e", "e", "t", "J", "S"],
    [  1,   2,    ,    ,   5,   6,   7],
    [  2,   3,    ,    ,   6,   7,   8],
    [  3,   4,    ,    ,   7,   8,   9],
    [  4,   5,   6,   7,   8,   9,   0]
  ]);

  /* display JS objects with some whitespace */
  const aoo = o => o.map(r => "  " + JSON.stringify(r).replace(/,"/g, ', "').replace(/:/g, ": ").replace(/"([A-Za-z_]\w*)":/g, '$1:')).join("\n");
  const aoa = o => o.map(r => "  " + JSON.stringify(r).replace(/,/g, ', ').replace(/null/g, "")).join("\n");

  return ( <pre>
    <b>Worksheet (as HTML)</b>
    <div dangerouslySetInnerHTML={{__html: XLSX.utils.sheet_to_html(ws)}}/>
    <b>XLSX.utils.sheet_to_json(ws, {'{'} header: 1 {'}'}) [array of arrays]</b><br/>
    [<br/>{aoa(XLSX.utils.sheet_to_json(ws, { header: 1 }))}<br/>]<br/><br/>
    <b>XLSX.utils.sheet_to_json(ws) [objects with header disambiguation]</b><br/>
    [<br/>{aoo(XLSX.utils.sheet_to_json(ws))}<br/>]<br/><br/>
    <b>XLSX.utils.sheet_to_json(ws, {'{'} header: "A" {'}'}) [column names as keys]</b><br/>
    [<br/>{aoo(XLSX.utils.sheet_to_json(ws, { header: "A" }))}<br/>]<br/><br/>
    <b>XLSX.utils.sheet_to_json(ws, {'{'} header: ["A","E","I","O","U","6","9"] {'}'})</b><br/>
    [<br/>{aoo(XLSX.utils.sheet_to_json(ws, { header: ["A","E","I","O","U","6","9"] }))}<br/>]<br/>
  </pre> );
}
```

### Formulae Output

```js
var fmla_arr = XLSX.utils.sheet_to_formulae(ws);
```

`XLSX.utils.sheet_to_formulae` generates an array of commands that represent
how a person would enter data into an application.

Cells without formulae are written as `A1-cell-address=value`:

```
A1=1                   // A1 is the numeric value 1
B1=TRUE                // B1 is the logical value TRUE
```

String literals are prefixed with a `'` in accordance with Excel:

```
A5='A4+A3              // A5 is the string "A4+A3"
```

Cells with formulae are written as `A1-cell-address=formula`:

```
A5=A4+A3               // A5 is a cell with formula =A4+A3
```

Array formulae are written as `A1-range=formula`.  They do not include the
displayed curly braces:

```
A4:B4=A2:B2*A3:B3      // A4:B4 array formula {=A2:B2*A3:B3}
```

Single-cell array formulae are written with single-cell ranges:

```
C4:C4=SUM(A2:A3*B2:B3) // C4 array formula {=SUM(A2:A3*B2:B3)}
```

```jsx live
function SheetJSToJSON() {
  var ws = XLSX.utils.aoa_to_sheet([
    ["A", "B", "C"],
    [1, 2, { t: "n", f: "SUM(A2:B2)" }],
    [3, 4, { t: "n", f: "A3+B3" }]
  ]);
  XLSX.utils.sheet_set_array_formula(ws, "A4:B4", "A2:B2*A3:B3");
  XLSX.utils.sheet_set_array_formula(ws, "C4", "SUM(A2:A3*B2:B3)");

  var __html = `\
<i>Values</i>
[
  ["A", "B", "C"],
  [1,  2],
  [3,  4]
]
<i>Formulae</i>
C2     =SUM(A2:B2)
C3     =A3+B3
<i>Array Formulae</i>
A4:B4  {=A2:B2*A3:B3}
C4     {=SUM(A2:A3*B2:B3)}

`;

  return ( <pre>
    <b>Original worksheet</b>
    <div dangerouslySetInnerHTML={{__html}}/>
    <b>XLSX.utils.sheet_to_formulae(ws).join("\n")</b><br/>
    <br/>{XLSX.utils.sheet_to_formulae(ws).join("\n")}
  </pre> );
}
```
