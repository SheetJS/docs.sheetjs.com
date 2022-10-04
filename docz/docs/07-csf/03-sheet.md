---
sidebar_position: 3
---

# Sheet Objects

Excel supports 4 different types of "sheets":
- "worksheets": normal sheets
- "chartsheets": full-tab charts
- "macrosheets": legacy (pre-VBA) macros
- "dialogsheets": legacy (pre-VBA) dialog windows

## Generic Sheet Object

Generic sheets are plain JavaScript objects.  Each key that does not start with
`!` is an `A1`-style address whose corresponding value is a cell object.

`sheet[address]` returns the cell object for the specified address.

### Sheet Properties

Each key starts with `!`.  The properties are accessible as `sheet[key]`.

- `sheet['!ref']`: A-1 based range representing the sheet range. Functions that
  work with sheets should use this parameter to determine the range.  Cells that
  are assigned outside of the range are not processed.  In particular, when
  writing a sheet by hand, cells outside of the range are not included

  Functions that handle sheets should test for the presence of `!ref` field.
  If the `!ref` is omitted or is not a valid range, functions are free to treat
  the sheet as empty or attempt to guess the range.  The standard utilities that
  ship with this library treat sheets as empty (for example, the CSV output is
  empty string).

  When reading a worksheet with the `sheetRows` property set, the ref parameter
  will use the restricted range.  The original range is set at `ws['!fullref']`

- `sheet['!margins']`: Object representing the page margins.  The default values
  follow Excel's "normal" preset.  Excel also has a "wide" and a "narrow" preset
  but they are stored as raw measurements. The main properties are listed below:

<details>
  <summary><b>Page margin details</b> (click to show)</summary>

| key      | description            | "normal" | "wide" | "narrow" |
|----------|------------------------|:---------|:-------|:-------- |
| `left`   | left margin (inches)   | `0.7`    | `1.0`  | `0.25`   |
| `right`  | right margin (inches)  | `0.7`    | `1.0`  | `0.25`   |
| `top`    | top margin (inches)    | `0.75`   | `1.0`  | `0.75`   |
| `bottom` | bottom margin (inches) | `0.75`   | `1.0`  | `0.75`   |
| `header` | header margin (inches) | `0.3`    | `0.5`  | `0.3`    |
| `footer` | footer margin (inches) | `0.3`    | `0.5`  | `0.3`    |

```js
/* Set worksheet sheet to "normal" */
ws["!margins"]={left:0.7, right:0.7, top:0.75,bottom:0.75,header:0.3,footer:0.3}
/* Set worksheet sheet to "wide" */
ws["!margins"]={left:1.0, right:1.0, top:1.0, bottom:1.0, header:0.5,footer:0.5}
/* Set worksheet sheet to "narrow" */
ws["!margins"]={left:0.25,right:0.25,top:0.75,bottom:0.75,header:0.3,footer:0.3}
```
</details>

## Worksheet Object

In addition to the aforementioned sheet keys, worksheets also add:

- `ws['!cols']`: array of column properties objects.  Column widths are actually
  stored in files in a normalized manner, measured in terms of the "Maximum
  Digit Width" (the largest width of the rendered digits 0-9, in pixels).  When
  parsed, the column objects store the pixel width in the `wpx` field, character
  width in the `wch` field, and the maximum digit width in the `MDW` field.

- `ws['!rows']`: array of row properties objects as explained later in the docs.
  Each row object encodes properties including row height and visibility.

- `ws['!merges']`: array of range objects corresponding to the merged cells in
  the worksheet.  Plain text formats do not support merge cells.  CSV export
  will write all cells in the merge range if they exist, so be sure that only
  the first cell (upper-left) in the range is set.

- `ws['!outline']`: configure how outlines should behave.  Options default to
  the default settings in Excel 2019:

| key       | Excel feature                                 | default |
|:----------|:----------------------------------------------|:--------|
| `above`   | Disable "Summary rows below detail"           | `false` |
| `left`    | Disable "Summary rows to the right of detail" | `false` |

- `ws['!protect']`: object of write sheet protection properties.  The `password`
  key specifies the password for formats that support password-protected sheets
  (XLSX/XLSB/XLS).  The writer uses the XOR obfuscation method.  The following
  keys control the sheet protection -- set to `false` to enable a feature when
  sheet is locked or set to `true` to disable a feature:

<details>
  <summary><b>Worksheet Protection Details</b> (click to show)</summary>

| key                   | feature (true=disabled / false=enabled) | default    |
|:----------------------|:----------------------------------------|:-----------|
| `selectLockedCells`   | Select locked cells                     | enabled    |
| `selectUnlockedCells` | Select unlocked cells                   | enabled    |
| `formatCells`         | Format cells                            | disabled   |
| `formatColumns`       | Format columns                          | disabled   |
| `formatRows`          | Format rows                             | disabled   |
| `insertColumns`       | Insert columns                          | disabled   |
| `insertRows`          | Insert rows                             | disabled   |
| `insertHyperlinks`    | Insert hyperlinks                       | disabled   |
| `deleteColumns`       | Delete columns                          | disabled   |
| `deleteRows`          | Delete rows                             | disabled   |
| `sort`                | Sort                                    | disabled   |
| `autoFilter`          | Filter                                  | disabled   |
| `pivotTables`         | Use PivotTable reports                  | disabled   |
| `objects`             | Edit objects                            | enabled    |
| `scenarios`           | Edit scenarios                          | enabled    |

</details>

- `ws['!autofilter']`: AutoFilter object following the schema:

```typescript
type AutoFilter = {
  ref:string; // A-1 based range representing the AutoFilter table range
}
```

## Other Sheet Types

### Chartsheet Object

Chartsheets are represented as standard sheets.  They are distinguished with the
`!type` property set to `"chart"`.

The underlying data and `!ref` refer to the cached data in the chartsheet.  The
first row of the chartsheet is the underlying header.

### Macrosheet Object

Macrosheets are represented as standard sheets.  They are distinguished with the
`!type` property set to `"macro"`.

### Dialogsheet Object

Dialogsheets are represented as standard sheets. They are distinguished with the
`!type` property set to `"dialog"`.
