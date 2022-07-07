# Spreadsheet Features

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Even for basic features like date storage, the official Excel formats store the
same content in different ways.  The parsers are expected to convert from the
underlying file format representation to the Common Spreadsheet Format.  Writers
are expected to convert from CSF back to the underlying file format.

The following topics are covered in sub-pages:

<ul>{useCurrentSidebarCategory().items.map((item, index) => {
  const listyle = (item.customProps?.icon) ? {
    listStyleImage: `url("${item.customProps.icon}")`
  } : {};
  return (<li style={listyle} {...(item.customProps?.class ? {className: item.customProps.class}: {})}>
    <a href={item.href}>{item.label}</a>{item.customProps?.summary && (" - " + item.customProps.summary)}
  </li>);
})}</ul>

## Row and Column Properties

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**Row Properties**: XLSX/M, XLSB, BIFF8 XLS, XLML, SYLK, DOM, ODS

**Column Properties**: XLSX/M, XLSB, BIFF8 XLS, XLML, SYLK, DOM

</details>


Row and Column properties are not extracted by default when reading from a file
and are not persisted by default when writing to a file. The option
`cellStyles: true` must be passed to the relevant read or write function.

_Column Properties_

The `!cols` array in each worksheet, if present, is a collection of `ColInfo`
objects which have the following properties:

```typescript
type ColInfo = {
  /* visibility */
  hidden?: boolean; // if true, the column is hidden

  /* column width is specified in one of the following ways: */
  wpx?:    number;  // width in screen pixels
  width?:  number;  // width in Excel "Max Digit Width", width*256 is integral
  wch?:    number;  // width in characters

  /* other fields for preserving features from files */
  level?:  number;  // 0-indexed outline / group level
  MDW?:    number;  // Excel "Max Digit Width" unit, always integral
};
```

_Row Properties_

The `!rows` array in each worksheet, if present, is a collection of `RowInfo`
objects which have the following properties:

```typescript
type RowInfo = {
  /* visibility */
  hidden?: boolean; // if true, the row is hidden

  /* row height is specified in one of the following ways: */
  hpx?:    number;  // height in screen pixels
  hpt?:    number;  // height in points

  level?:  number;  // 0-indexed outline / group level
};
```

_Outline / Group Levels Convention_

The Excel UI displays the base outline level as `1` and the max level as `8`.
Following JS conventions, SheetJS uses 0-indexed outline levels wherein the base
outline level is `0` and the max level is `7`.

<details>
  <summary><b>Why are there three width types?</b> (click to show)</summary>

There are three different width types corresponding to the three different ways
spreadsheets store column widths:

SYLK and other plain text formats use raw character count. Contemporaneous tools
like Visicalc and Multiplan were character based.  Since the characters had the
same width, it sufficed to store a count.  This tradition was continued into the
BIFF formats.

SpreadsheetML (2003) tried to align with HTML by standardizing on screen pixel
count throughout the file.  Column widths, row heights, and other measures use
pixels.  When the pixel and character counts do not align, Excel rounds values.

XLSX internally stores column widths in a nebulous "Max Digit Width" form.  The
Max Digit Width is the width of the largest digit when rendered (generally the
"0" character is the widest).  The internal width must be an integer multiple of
the the width divided by 256.  ECMA-376 describes a formula for converting
between pixels and the internal width.  This represents a hybrid approach.

Read functions attempt to populate all three properties.  Write functions will
try to cycle specified values to the desired type.  In order to avoid potential
conflicts, manipulation should delete the other properties first.  For example,
when changing the pixel width, delete the `wch` and `width` properties.
</details>

<details>
  <summary><b>Implementation details</b> (click to show)</summary>

_Row Heights_

Excel internally stores row heights in points.  The default resolution is 72 DPI
or 96 PPI, so the pixel and point size should agree.  For different resolutions
they may not agree, so the library separates the concepts.

Even though all of the information is made available, writers are expected to
follow the priority order:

1) use `hpx` pixel height if available
2) use `hpt` point height if available

_Column Widths_

Given the constraints, it is possible to determine the MDW without actually
inspecting the font!  The parsers guess the pixel width by converting from width
to pixels and back, repeating for all possible MDW and selecting the MDW that
minimizes the error.  XLML actually stores the pixel width, so the guess works
in the opposite direction.

Even though all of the information is made available, writers are expected to
follow the priority order:

1) use `width` field if available
2) use `wpx` pixel width if available
3) use `wch` character count if available

</details>

## Number Formats

The `cell.w` formatted text for each cell is produced from `cell.v` and `cell.z`
format.  If the format is not specified, the Excel `General` format is used.
The format can either be specified as a string or as an index into the format
table.  Parsers are expected to populate `workbook.SSF` with the number format
table.  Writers are expected to serialize the table.

The following example creates a custom format from scratch:

```js
var wb = {
  SheetNames: ["Sheet1"],
  Sheets: {
    Sheet1: {
      "!ref":"A1:C1",
      A1: { t:"n", v:10000 },                    // <-- General format
      B1: { t:"n", v:10000, z: "0%" },           // <-- Builtin format
      C1: { t:"n", v:10000, z: "\"T\"\ #0.00" }  // <-- Custom format
    }
  }
}
```

The rules are slightly different from how Excel displays custom number formats.
In particular, literal characters must be wrapped in double quotes or preceded
by a backslash. For more info, see the Excel documentation article
`Create or delete a custom number format` or ECMA-376 18.8.31 (Number Formats)


<details>
  <summary><b>Default Number Formats</b> (click to show)</summary>

The default formats are listed in ECMA-376 18.8.30:

| ID | Format                     |
|---:|:---------------------------|
|  0 | `General`                  |
|  1 | `0`                        |
|  2 | `0.00`                     |
|  3 | `#,##0`                    |
|  4 | `#,##0.00`                 |
|  9 | `0%`                       |
| 10 | `0.00%`                    |
| 11 | `0.00E+00`                 |
| 12 | `# ?/?`                    |
| 13 | `# ??/??`                  |
| 14 | `m/d/yy` (see below)       |
| 15 | `d-mmm-yy`                 |
| 16 | `d-mmm`                    |
| 17 | `mmm-yy`                   |
| 18 | `h:mm AM/PM`               |
| 19 | `h:mm:ss AM/PM`            |
| 20 | `h:mm`                     |
| 21 | `h:mm:ss`                  |
| 22 | `m/d/yy h:mm`              |
| 37 | `#,##0 ;(#,##0)`           |
| 38 | `#,##0 ;[Red](#,##0)`      |
| 39 | `#,##0.00;(#,##0.00)`      |
| 40 | `#,##0.00;[Red](#,##0.00)` |
| 45 | `mm:ss`                    |
| 46 | `[h]:mm:ss`                |
| 47 | `mmss.0`                   |
| 48 | `##0.0E+0`                 |
| 49 | `@`                        |

</details>

Format 14 (`m/d/yy`) is localized by Excel: even though the file specifies that
number format, it will be drawn differently based on system settings.  It makes
sense when the producer and consumer of files are in the same locale, but that
is not always the case over the Internet.  To get around this ambiguity, parse
functions accept the `dateNF` option to override the interpretation of that
specific format string.


## Cell Comments

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**Simple Notes/Comments**: XLSX/M, XLSB, BIFF8 XLS (read only), XLML, ODS (read only)

**Threaded Comments**: XLSX/M, XLSB (read only)

</details>

Cell comments are objects stored in the `c` array of cell objects.  The actual
contents of the comment are split into blocks based on the comment author.  The
`a` field of each comment object is the author of the comment and the `t` field
is the plain text representation.

For example, the following snippet appends a cell comment into cell `A1`:

```js
if(!ws.A1.c) ws.A1.c = [];
ws.A1.c.push({a:"SheetJS", t:"I'm a little comment, short and stout!"});
```

Note: XLSB enforces a 54 character limit on the Author name.  Names longer than
54 characters may cause issues with other formats.

To mark a comment as normally hidden, set the `hidden` property:

```js
if(!ws.A1.c) ws.A1.c = [];
ws.A1.c.push({a:"SheetJS", t:"This comment is visible"});

if(!ws.A2.c) ws.A2.c = [];
ws.A2.c.hidden = true;
ws.A2.c.push({a:"SheetJS", t:"This comment will be hidden"});
```


_Threaded Comments_

Introduced in Excel 365, threaded comments are plain text comment snippets with
author metadata and parent references. They are supported in XLSX and XLSB.

To mark a comment as threaded, each comment part must have a true `T` property:

```js
if(!ws.A1.c) ws.A1.c = [];
ws.A1.c.push({a:"SheetJS", t:"This is not threaded"});

if(!ws.A2.c) ws.A2.c = [];
ws.A2.c.hidden = true;
ws.A2.c.push({a:"SheetJS", t:"This is threaded", T: true});
ws.A2.c.push({a:"JSSheet", t:"This is also threaded", T: true});
```

There is no Active Directory or Office 365 metadata associated with authors in a thread.

## Sheet Visibility

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**Hidden Sheets**: XLSX/M, XLSB, BIFF8/BIFF5 XLS, XLML

**Very Hidden Sheets**: XLSX/M, XLSB, BIFF8/BIFF5 XLS, XLML

</details>

Excel enables hiding sheets in the lower tab bar.  The sheet data is stored in
the file but the UI does not readily make it available.  Standard hidden sheets
are revealed in the "Unhide" menu.  Excel also has "very hidden" sheets which
cannot be revealed in the menu.  It is only accessible in the VB Editor!

The visibility setting is stored in the `Hidden` property of sheet props array.

| Value | Definition  | VB Editor "Visible" Property |
|:-----:|:------------|:-----------------------------|
|   0   | Visible     | `-1 - xlSheetVisible`        |
|   1   | Hidden      | ` 0 - xlSheetHidden`         |
|   2   | Very Hidden | ` 2 - xlSheetVeryHidden`     |

If the respective Sheet entry does not exist or if the `Hidden` property is not
set, the worksheet is visible.

**List all worksheets and their visibilities**

```js
wb.Workbook.Sheets.map(function(x) { return [x.name, x.Hidden] })
// [ [ 'Visible', 0 ], [ 'Hidden', 1 ], [ 'VeryHidden', 2 ] ]
```

**Check if worksheet is visible**

Non-Excel formats do not support the Very Hidden state.  The best way to test
if a sheet is visible is to check if the `Hidden` property is logical truth:

```js
wb.Workbook.Sheets.map(function(x) { return [x.name, !x.Hidden] })
// [ [ 'Visible', true ], [ 'Hidden', false ], [ 'VeryHidden', false ] ]
```

<details>
  <summary><b>Live Example</b> (click to show)</summary>


[This test file](pathname:///files/sheet_visibility.xlsx) has three sheets:

- "Visible" is visible
- "Hidden" is hidden
- "VeryHidden" is very hidden

![Screenshot](pathname:///files/sheet_visibility.png)

**Live demo**

```jsx live
function Visibility(props) {
  const [sheets, setSheets] = React.useState([]);
  const names = [ "Visible", "Hidden", "Very Hidden" ];

  React.useEffect(async() => {
    const f = await fetch("/files/sheet_visibility.xlsx");
    const ab = await f.arrayBuffer();
    const wb = XLSX.read(ab);

    /* State will be set to the `Sheets` property array */
    setSheets(wb.Workbook.Sheets);
  }, []);

  return (<table>
    <thead><tr><th>Name</th><th>Value</th><th>Hidden</th></tr></thead>
    <tbody>{sheets.map((x,i) => (<tr key={i}>

      <td>{x.name}</td>

      <td>{x.Hidden} - {names[x.Hidden]}</td>

      <td>{!x.Hidden ? "No" : "Yes"}</td>

    </tr>))}</tbody></table>);
}

```



</details>

## VBA and Macros

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**VBA Modules**: XLSM, XLSB, BIFF8 XLS

</details>

VBA Macros are stored in a special data blob that is exposed in the `vbaraw`
property of the workbook object when the `bookVBA` option is `true`.  They are
supported in `XLSM`, `XLSB`, and `BIFF8 XLS` formats.  The supported format
writers automatically insert the data blobs if it is present in the workbook and
associate with the worksheet names.

The `vbaraw` property stores raw bytes. [SheetJS Pro](https://sheetjs.com/pro)
offers a special component for extracting macro text from the VBA blob, editing
the VBA project, and exporting new VBA blobs.

#### Round-tripping Macro Enabled Files

In order to preserve macro when reading and writing files, the `bookVBA` option
must be set to true when reading and when writing.  In addition, the output file
format must support macros.  `XLSX` notably does not support macros, and `XLSM`
should be used in its place:

```js
/* Reading data */
var wb = XLSX.read(data, { bookVBA: true }); // read file and distill VBA blob
var vbablob = wb.vbaraw;
```

#### Code Names

By default, Excel will use `ThisWorkbook` or a translation `DieseArbeitsmappe`
for the workbook.  Each worksheet will be identified using the default `Sheet#`
naming pattern even if the worksheet names have changed.

A custom workbook code name will be stored in `wb.Workbook.WBProps.CodeName`.
For exports, assigning the property will override the default value.

Worksheet and Chartsheet code names are in the worksheet properties object at
`wb.Workbook.Sheets[i].CodeName`.  Macrosheets and Dialogsheets are ignored.

The readers and writers preserve the code names, but they have to be manually
set when adding a VBA blob to a different workbook.

#### Macrosheets

Older versions of Excel also supported a non-VBA "macrosheet" sheet type that
stored automation commands.  These are exposed in objects with the `!type`
property set to `"macro"`.

Under the hood, Excel treats Macrosheets as normal worksheets with special
interpretation of the function expressions.

#### Detecting Macros in Workbooks

The `vbaraw` field will only be set if macros are present.  Macrosheets will be
explicitly flagged.  Combining the two checks yields a simple function:

```js
function wb_has_macro(wb/*:workbook*/)/*:boolean*/ {
  if(!!wb.vbaraw) return true;
  const sheets = wb.SheetNames.map((n) => wb.Sheets[n]);
  return sheets.some((ws) => !!ws && ws['!type']=='macro');
}
```

