---
sidebar_position: 1
title: Addresses and Ranges
---

## Cell Addresses

Cell address objects are stored as `{c:C, r:R}` where `C` and `R` are 0-indexed
column and row numbers, respectively.  For example, the cell address `B5` is
represented by the object `{c:1, r:4}`.

## Cell Ranges

Cell range objects are stored as `{s:S, e:E}` where `S` is the first cell and
`E` is the last cell in the range.  The ranges are inclusive.  For example, the
range `A3:B7` is represented by the object `{s:{c:0, r:2}, e:{c:1, r:6}}`.

### Column and Row Ranges

A column range (spanning every row) is represented with the starting row `0` and
the ending row `1048575`:

```js
{ s: { c: 0, r: 0 }, e: { c: 0, r: 1048575 } } // A:A
{ s: { c: 1, r: 0 }, e: { c: 2, r: 1048575 } } // B:C
```

A row range (spanning every column) is represented with the starting col `0` and
the ending col `16383`:

```js
{ s: { c: 0, r: 0 }, e: { c: 16383, r: 0 } } // 1:1
{ s: { c: 0, r: 1 }, e: { c: 16383, r: 2 } } // 2:3
```

# Common Spreadsheet Address Styles

## A1-Style

A1-style is the default address style in Lotus 1-2-3 and Excel.

Columns are specified with letters, counting from `A` to `Z`, then `AA` to `ZZ`,
then `AAA`.  Some sample values, along with SheetJS column indices, are listed:

| Ordinal | A1 Name | SheetJS |
|:--------|:--------|--------:|
| First   | `A`     |     `0` |
| Second  | `B`     |     `1` |
| 26th    | `Z`     |    `25` |
| 27th    | `AA`    |    `26` |
| 702st   | `ZZ`    |   `701` |
| 703rd   | `AAA`   |   `702` |
| 16384th | `XFD`   | `16383` |

Rows are specified with numbers, starting from `1` for the first row.  SheetJS
APIs that take row indices start from `0` (ECMAScript convention).

A cell address is the concatenation of column text and row number.  For example,
the cell in the third column and fourth row is "C4".

A cell range is represented as the top-left cell of the range, followed by `:`,
followed by the bottom-right cell of the range. For example, the range `"C2:D4"`
includes 6 cells marked with ▒ in the table below:

<table><tbody>
  <tr><th> </th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
  <tr><th>1</th><td> </td><td> </td><td> </td><td> </td><td> </td></tr>
  <tr><th>2</th><td> </td><td> </td><td>▒</td><td>▒</td><td> </td></tr>
  <tr><th>3</th><td> </td><td> </td><td>▒</td><td>▒</td><td> </td></tr>
  <tr><th>4</th><td> </td><td> </td><td>▒</td><td>▒</td><td> </td></tr>
  <tr><th>5</th><td> </td><td> </td><td> </td><td> </td><td> </td></tr>
</tbody></table>

A column range is represented by the left-most column, followed by `:`, followed
by the right-most column.  For example, the range `C:D` represents the third and
fourth columns.

A row range is represented by the top-most row, followed by `:`, followed by the
bottom-most column.  For example, `2:4` represents the second/third/fourth rows.

### A1 Utilities

#### Column Names

_Get the SheetJS index from an A1-Style column_

```js
var col_index = XLSX.utils.decode_col("D");
```

The argument is expected to be a string representing a column.

_Get the A1-Style column string from a SheetJS index_

```js
var col_name = XLSX.utils.encode_col(3);
```

The argument is expected to be a SheetJS column (non-negative integer).

#### Row Names

_Get the SheetJS index from an A1-Style row_

```js
var row_index = XLSX.utils.decode_row("4");
```

The argument is expected to be a string representing a row.

_Get the A1-Style row string from a SheetJS index_

```js
var row_name = XLSX.utils.encode_row(3);
```

The argument is expected to be a SheetJS column (non-negative integer).

#### Cell Addresses

_Generate a SheetJS cell address from an A1-Style address string_

```js
var address = XLSX.utils.decode_cell("A2");
```

The argument is expected to be a string representing a single cell address.

_Generate an A1-style address string from a SheetJS cell address_

```js
var a1_addr = XLSX.utils.encode_cell({r:1, c:0});
```

The argument is expected to be a SheetJS cell address

#### Cell Ranges

_Generate a SheetJS cell range from an A1-style range string_

```js
var range = XLSX.utils.decode_range("A1:D3");
```

The argument is expected to be a string representing a range or a single cell
address.  The single cell address is interpreted as a single cell range, so
`XLSX.utils.decode_range("D3")` is the same as `XLSX.utils.decode_range("D3:D3")`

_Generate an A1-style address string from a SheetJS cell address_

```js
var a1_range = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: 3, r: 2 } });
```

The argument is expected to be a SheetJS cell range.
