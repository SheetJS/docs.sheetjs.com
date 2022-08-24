---
pagination_prev: csf/index
sidebar_position: 5
title: API Reference
---

## Interface Summary

`XLSX` is the exposed variable in the browser and the exported node variable

`XLSX.version` is the version of the library (added by the build script).

`XLSX.SSF` is an embedded version of the [format library](https://github.com/SheetJS/sheetjs/tree/master/packages/ssf).

`XLSX.CFB` is an embedded version of the [container library](https://github.com/sheetjs/js-cfb).

## Parsing functions

`XLSX.read(data, read_opts)` attempts to parse `data`.

`XLSX.readFile(filename, read_opts)` attempts to read `filename` and parse.

Parse options are described in the [Parsing Options](./parse-options) section.

## Writing functions

`XLSX.write(wb, write_opts)` attempts to write the workbook `wb`.

`XLSX.writeXLSX(wb, write_opts)` attempts to write the workbook in XLSX format.

`XLSX.writeFile(wb, filename, write_opts)` attempts to write `wb` to `filename`.
In browser-based environments, it will attempt to force a client-side download.

`XLSX.writeFileXLSX(wb, filename, write_opts)` attempts to write an XLSX file.

`XLSX.writeFileAsync(filename, wb, o, cb)` attempts to write `wb` to `filename`.
If `o` is omitted, the writer will use the third argument as the callback.

Write options are described in the [Writing Options](./write-options) section.

## Utilities

Utilities are available in the `XLSX.utils` object.

The following are described in [A1 Utilities](../csf/general#a1-utilities)

**Cell and cell address manipulation:**

- `encode_row / decode_row` converts between 0-indexed rows and 1-indexed rows.
- `encode_col / decode_col` converts between 0-indexed columns and column names.
- `encode_cell / decode_cell` converts cell addresses.
- `encode_range / decode_range` converts cell ranges.

The following are described in the [Utility Functions](./utilities):

**Constructing:**

- `book_new` creates an empty workbook
- `book_append_sheet` adds a worksheet to a workbook

**Importing:**

- `aoa_to_sheet` converts an array of arrays of JS data to a worksheet.
- `json_to_sheet` converts an array of JS objects to a worksheet.
- `table_to_sheet` converts a DOM TABLE element to a worksheet.
- `sheet_add_aoa` adds an array of arrays of JS data to an existing worksheet.
- `sheet_add_json` adds an array of JS objects to an existing worksheet.
- `sheet_add_dom` adds data from a DOM TABLE element to an existing worksheet.

**Exporting:**

- `sheet_to_json` converts a worksheet object to an array of JSON objects.
- `sheet_to_csv` generates delimiter-separated-values output.
- `sheet_to_txt` generates UTF16 formatted text.
- `sheet_to_html` generates HTML output.
- `sheet_to_formulae` generates a list of the formulae (with value fallbacks).

**Miscellaneous**

- `format_cell` generates the text value for a cell (using number formats).
- `sheet_set_array_formula` adds an array formula to a worksheet

## Platform-Specific Functions

### NodeJS Streaming Write functions

`XLSX.stream` contains a set of streaming write functions for NodeJS streams:

- `to_csv(sheet, opts)` streams CSV rows
- `to_html(sheet, opts)` streams an HTML table incrementally
- `to_json(sheet, opts)` streams JS objects (object-mode stream)

### ESM Helpers

Due to broad inconsistencies in ESM implementations, the `mjs` build does not
import any dependencies.  Instead, they must be manually passed to the library:

`XLSX.set_cptable` sets the internal `codepage` instance.  This provides support
for different language encodings.

`XLSX.set_fs` set `fs` instance (using `readFileSync` and `writeFileSync`). This
provides NodeJS ESM support for `XLSX.readFile` and `XLSX.writeFile`.

`XLSX.utils.set_readable` supplies a NodeJS `stream.Readable` constructor.  This
provides NodeJS ESM support for the streaming operations.