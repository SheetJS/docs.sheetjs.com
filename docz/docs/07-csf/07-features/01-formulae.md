---
sidebar_position: 1
---

# Formulae

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details><summary><b>Formulae File Format Support</b> (click to show)</summary>

The parser will translate from the storage representation to A1-Style strings,
while the writer will translate from A1-Style strings to the file format.

| Formats           | Parse | Write | Array | Dynamic | Storage Representation |
|:------------------|:-----:|:-----:|:-----:|:-------:|:-----------------------|
| XLSX / XLSM       |   ✔   |   ✔   |   ✔   |    ✔    | A1-Style strings       |
| XLSB              |   ✔   |       |   ✔   |    ✔    | BIFF parsed tokens     |
| XLS               |   ✔   |       |   ✔   |    *    | BIFF parsed tokens     |
| XLML              |   ✔   |   ✔   |   ✔   |    *    | RC-style strings       |
| SYLK              |   ✔   |   ✔   |       |    *    | A1/RC-style strings    |
| CSV / TXT         |   ✔   |   ✔   |   *   |    *    | A1-Style strings       |
| ODS / FODS / UOS  |   ✔   |   ✔   |       |    *    | OpenFormula strings    |
| WK\*              |   ✔   |       |       |    *    | Lotus parsed tokens    |
| WQ\* / WB\* / QPW |       |       |       |    *    | Quattro Pro tokens     |
| NUMBERS           |       |       |       |    *    | Numbers parsed tokens  |

Asterisks (*) mark features that are not supported by the file formats. There is
no way to mark a dynamic array formula in the XLS file format.

</details>

SheetJS supports reading and writing formulae for a number of file formats. When
supported, formulae will always be exported.

By default, formulae are not always imported.  To ensure formula parsing, the
option `cellFormula: true` should be passed to the parser.

<Tabs>
  <TabItem value="browser" label="Browser">

Typically file data will be available as an `ArrayBuffer`, either downloaded
with `fetch` / `XMLHttpRequest` or user-submitted with a File Input element.
`cellFormula: true` should be added to the second options argument:

```js
/* using read in the browser, `cellFormula` is in the second argument */
const ab = await (await fetch("test.xlsx")).arrayBuffer();
const workbook = XLSX.read(ab, { cellFormula: true });
// ------------------------------^^^^^^^^^^^^^^^^^
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

Typically file data will be available as a `Buffer` from a network request / API
or stored in the file system.  `cellFormula: true` should be added to the second
options argument to `read` or `readFile`:

**`XLSX.read`**

```js
/* using read in NodeJS, `cellFormula` is in the second argument */
const ab = await (await fetch("test.xlsx")).arrayBuffer();
const workbook = XLSX.read(ab, { cellFormula: true });
// ------------------------------^^^^^^^^^^^^^^^^^
```

**`XLSX.readFile`**

```js
/* using readFile in NodeJS, add `cellFormula` to the second argument */
const workbook = XLSX.readFile("test.xlsx", { cellFormula: true });
// -------------------------------------------^^^^^^^^^^^^^^^^^
```

  </TabItem>
  <TabItem value="bun" label="Bun">

Typically file data will be available as a `Uint8Array` from a network request
or stored in the file system. `cellFormula: true` should be set in the options
argument to `read` or `readFile`:

**`XLSX.read`**

```js
/* using read in Bun, `cellFormula` is in the second argument */
const ab = await (await fetch("test.xlsx")).arrayBuffer();
const workbook = XLSX.read(ab, { cellFormula: true });
// ------------------------------^^^^^^^^^^^^^^^^^
```

**`XLSX.readFile`**

```js
/* using readFile in Bun, add `cellFormula` to the second argument */
const workbook = XLSX.readFile("test.xlsx", { cellFormula: true });
// -------------------------------------------^^^^^^^^^^^^^^^^^
```

  </TabItem>
  <TabItem value="deno" label="Deno">

Typically file data will be available as a `Uint8Array` or `ArrayBuffer` from
API or stored in the file system.  `cellFormula: true` should be set in the
options argument to `read` or `readFile`:

**`XLSX.read`**

```js
/* using read in Deno, `cellFormula` is in the second argument */
const ab = await (await fetch("test.xlsx")).arrayBuffer();
const workbook = XLSX.read(ab, { cellFormula: true });
// ------------------------------^^^^^^^^^^^^^^^^^
```

**`XLSX.readFile`**

```js
/* using readFile in Deno, add `cellFormula` to the second argument */
const workbook = XLSX.readFile("test.xlsx", { cellFormula: true });
// -------------------------------------------^^^^^^^^^^^^^^^^^
```

  </TabItem>
</Tabs>

## A1-Style Formulae

The A1-Style formula string is stored in the `f` field of the cell object.
Spreadsheet software typically represent formulae with a leading `=` sign, but
SheetJS formulae omit the `=`.

["A1-Style"](../general#a1-style) describes A1-Style in more detail.

<details open><summary><b>Live Example</b> (click to hide)</summary>

For example, consider [this test file](pathname:///files/concat.xlsx):

![Screenshot](pathname:///files/concat.png)

The following code block fetches the file, parses and prints info on cell `D1`:

```jsx live
/* The live editor requires this function wrapper */
function ConcatFormula(props) {
  const [text, setText] = React.useState([]);

  /* Fetch and display formula */
  React.useEffect(async() => {
    /* Fetch file */
    const ab = await (await fetch("/files/concat.xlsx")).arrayBuffer();

    /* Parse file */
    const wb = XLSX.read(ab, {cellFormula: true});
    const ws = wb.Sheets[wb.SheetNames[0]];

    /* Look at cell D1 */
    const addr = "D1";
    const { t, v, f } = ws[addr];
    setText(`\
CELL ADDRESS: ${addr}\n\
CELL FORMULA: ${f}\n\
VALUE (TYPE): "${v}" ("${t}")\n\
`);
  }, []);

  return (<pre>{text}</pre>);
}
```

</details>

## Single-Cell Formulae

For simple formulae, the `f` key of the desired cell can be set to the actual
formula text.  This worksheet represents `A1=1`, `A2=2`, and `A3=A1+A2`:

```js
var worksheet = {
  "!ref": "A1:A3", // Worksheet range A1:A3
  A1: { t: "n", v: 1 }, // A1 is a number (1)
  A2: { t: "n", v: 2 }, // A2 is a number (2)
  A3: { t: "n", v: 3, f: "A1+A2" } // A3 =A1+A2
};
```

Utilities like `aoa_to_sheet` will accept cell objects in lieu of values:

```js
var worksheet = XLSX.utils.aoa_to_sheet([
  [ 1 ], // A1
  [ 2 ], // A2
  [ {t: "n", v: 3, f: "A1+A2"} ] // A3
]);
```

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportSimpleFormula(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Create worksheet with A1=1, A2=2, A3=A1+A2 */
    var ws = XLSX.utils.aoa_to_sheet([
      [ 1 ], // A1
      [ 2 ], // A2
      [ {t: "n", v: 3, f: "A1+A2"} ] // A3
    ]);

    /* Export to file (start a download) */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSFormula1.xlsx");
  });

  return (<button onClick={xport}><b>Export XLSX!</b></button>);
}
```

</details>

Cells with formula entries but no value will be serialized in a way that Excel
and other spreadsheet tools will recognize.  This library will not automatically
compute formula results!  For example, the following worksheet will include the
`BESSELJ` function but the result will not be available in JavaScript:

```js
var worksheet = XLSX.utils.aoa_to_sheet([
  [ 3.14159, 2 ], // Row "1"
  [ { t: "n", f: "BESSELJ(A1,B1)" } ] // Row "2" will be calculated on file open
])
```

If the actual results are needed in JS, [SheetJS Pro](https://sheetjs.com/pro)
offers a formula calculator component for evaluating expressions, updating
values and dependent cells, and refreshing entire workbooks.


## Array Formulae

_Assign an array formula_

```js
XLSX.utils.sheet_set_array_formula(worksheet, range, formula);
```

Array formulae are stored in the top-left cell of the array block.  All cells
of an array formula have a `F` field corresponding to the range.  A single-cell
formula can be distinguished from a plain formula by the presence of `F` field.

The following snippet sets cell `C1` to the array formula `{=SUM(A1:A3*B1:B3)}`:

```js
// API function
XLSX.utils.sheet_set_array_formula(worksheet, "C1", "SUM(A1:A3*B1:B3)");

// ... OR raw operations
worksheet["C1"] = { t: "n", f: "SUM(A1:A3*B1:B3)", F: "C1:C1" };
```

For a multi-cell array formula, every cell has the same array range but only the
first cell specifies the formula.  Consider `D1:D3=A1:A3*B1:B3`:

```js
// API function
XLSX.utils.sheet_set_array_formula(worksheet, "D1:D3", "A1:A3*B1:B3");

// ... OR raw operations
worksheet["D1"] = { t: "n", F: "D1:D3", f: "A1:A3*B1:B3" };
worksheet["D2"] = { t: "n", F: "D1:D3" };
worksheet["D3"] = { t: "n", F: "D1:D3" };
```

Utilities and writers are expected to check for the presence of a `F` field and
ignore any possible formula element `f` in cells other than the starting cell.
They are not expected to perform validation of the formulae!

<details><summary><b>Live Example</b> (click to show)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportArrayFormulae(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Starting data */
    var D = [
      [ "A", "B", , "Cell AF", "Expected", , "Range AF", "Expected" ],
      [  1,   2 ],
      [  3,   4 ],
      [  5,   6 ]
    ];
    /* Add expected values */
    let sum = 0;
    for(let i = 1; i < D.length; ++i) sum += (D[i][7] = D[i][0] * D[i][1]);
    D[1][4] = sum;

    /* Create worksheet */
    var ws = XLSX.utils.aoa_to_sheet(D);

    /* D2 single-cell array formula */
    XLSX.utils.sheet_set_array_formula(ws, "D2", "SUM(A2:A4*B2:B4)");

    /* G2:G4 range array formula */
    XLSX.utils.sheet_set_array_formula(ws, "G2:G4", "A2:A4*B2:B4");

    /* Export to file (start a download) */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSArrayFormulae.xlsx");
  });

  return (<button onClick={xport}><b>Export XLSX!</b></button>);
}
```

</details>


### Dynamic Array Formulae

_Assign a dynamic array formula_

```js
XLSX.utils.sheet_set_array_formula(worksheet, range, formula, true);
```

Released in 2020, Dynamic Array Formulae are supported in the XLSX/XLSM and XLSB
file formats.  They are represented like normal array formulae but have special
cell metadata indicating that the formula should be allowed to adjust the range.

An array formula can be marked as dynamic by setting the cell `D` property to
true.  The `F` range is expected but can be the set to the current cell:

```js
// API function
XLSX.utils.sheet_set_array_formula(worksheet, "C1", "_xlfn.UNIQUE(A1:A3)", 1);

// ... OR raw operations
worksheet["C1"] = { t: "s", f: "_xlfn.UNIQUE(A1:A3)", F:"C1", D: 1 }; // dynamic
```

<details><summary><b>Live Example</b> (click to show)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportDynamicArrayFormulae(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Starting data */
    var D = [
      [ "A", , "Static", "Expected", , "Dynamic", "Expected" ],
      [  1,  ,         , 1         , ,          ,          1 ],
      [  2,  ,         ,           , ,          ,          2 ],
      [  1, ]
    ];

    /* Create worksheet */
    var ws = XLSX.utils.aoa_to_sheet(D);

    /* C2 static formula */
    XLSX.utils.sheet_set_array_formula(ws, "C2", "_xlfn.UNIQUE(A2:A4)");

    /* F2 dynamic formula */
    XLSX.utils.sheet_set_array_formula(ws, "F2", "_xlfn.UNIQUE(A2:A4)", 1);

    /* Export to file (start a download) */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSDynamicFormulae.xlsx");
  });

  return (<button onClick={xport}><b>Export XLSX!</b></button>);
}
```

</details>

## Localization

SheetJS operates at the file level.  Excel stores formula expressions using the
English (United States) function names.  For non-English users, Excel uses a
localized set of function names.

For example, when the computer language and region is set to Spanish, Excel
interprets `=CONTAR(A1:C3)` as if `CONTAR` is the `COUNT` function.  However,
in the actual file, Excel stores `COUNT(A1:C3)`.

Function arguments are separated with commas. For example, the Spanish Excel
formula `=CONTAR(A1:C3;B4:D6)` is equivalent to the SheetJS formula string
`COUNT(A1:A3,B4:D6)`

[JSON Translation table](https://oss.sheetjs.com/notes/fmla/table.json).

<details open><summary><b>Function Name Translator</b> (click to show)</summary>

```jsx live
/* The live editor requires this function wrapper */
function Translator(props) {
  const [locales, setLocales] = React.useState([]);
  const [data, setData] = React.useState({});
  const [names, setNames] = React.useState([]);
  const [name, setName] = React.useState("Enter a function name");
  /* Fetch and display formula */
  React.useEffect(async() => {
    /* Fetch data */
    const json = await (await fetch("https://oss.sheetjs.com/notes/fmla/table.json")).json();
    setLocales(Object.keys(json));
    setData(json);
    setNames(json.en);
    setName(json.es[0])
  }, []);

  const update_name = React.useCallback(() => {
    const nameelt = document.getElementById("fmla");
    const idx = nameelt.options[nameelt.selectedIndex].value;
    const toelt = document.getElementById("tolocale");
    const tovalue = toelt.options[toelt.selectedIndex].value;
    setName(data[tovalue][idx]);
  });

  const update_from = React.useCallback(() => {
    const fromelt = document.getElementById("fromlocale");
    const fromvalue = fromelt.options[fromelt.selectedIndex].value;
    setNames(data[fromvalue]);
  });

  return (<>
    <b>Name: </b><select id="fmla" onChange={update_name}>
    {names.map((n, idx) => (<option value={idx}>{n}</option>))}
    </select><br/>
    <b>From: </b><select id="fromlocale" onChange={update_from}>
    {locales.map(l => (<option value={l} selected={l=="en"}>{l}</option>))}
    </select>
    <b> To: </b><select id="tolocale" onChange={update_name}>
    {locales.map(l => (<option value={l} selected={l=="es"}>{l}</option>))}
    </select><br/>
    <b> Translation: </b><pre id="out">{name}</pre>
  </>);
}
```

</details>

## Prefixed "Future Functions"

Functions introduced in newer versions of Excel are prefixed with `_xlfn.` when
stored in files.  When writing formula expressions using these functions, the
prefix is required for maximal compatibility:

```js
// Broadest compatibility
XLSX.utils.sheet_set_array_formula(worksheet, "C1", "_xlfn.UNIQUE(A1:A3)", 1);

// Can cause errors in spreadsheet software
XLSX.utils.sheet_set_array_formula(worksheet, "C1", "UNIQUE(A1:A3)", 1);
```

When reading a file, the `xlfn` option preserves the prefixes.

<details>
  <summary><b> Functions requiring `_xlfn.` prefix</b> (click to show)</summary>

This list is growing with each Excel release.

```
ACOT
ACOTH
AGGREGATE
ARABIC
BASE
BETA.DIST
BETA.INV
BINOM.DIST
BINOM.DIST.RANGE
BINOM.INV
BITAND
BITLSHIFT
BITOR
BITRSHIFT
BITXOR
BYCOL
BYROW
CEILING.MATH
CEILING.PRECISE
CHISQ.DIST
CHISQ.DIST.RT
CHISQ.INV
CHISQ.INV.RT
CHISQ.TEST
COMBINA
CONFIDENCE.NORM
CONFIDENCE.T
COT
COTH
COVARIANCE.P
COVARIANCE.S
CSC
CSCH
DAYS
DECIMAL
ERF.PRECISE
ERFC.PRECISE
EXPON.DIST
F.DIST
F.DIST.RT
F.INV
F.INV.RT
F.TEST
FIELDVALUE
FILTERXML
FLOOR.MATH
FLOOR.PRECISE
FORMULATEXT
GAMMA
GAMMA.DIST
GAMMA.INV
GAMMALN.PRECISE
GAUSS
HYPGEOM.DIST
IFNA
IMCOSH
IMCOT
IMCSC
IMCSCH
IMSEC
IMSECH
IMSINH
IMTAN
ISFORMULA
ISOMITTED
ISOWEEKNUM
LAMBDA
LET
LOGNORM.DIST
LOGNORM.INV
MAKEARRAY
MAP
MODE.MULT
MODE.SNGL
MUNIT
NEGBINOM.DIST
NORM.DIST
NORM.INV
NORM.S.DIST
NORM.S.INV
NUMBERVALUE
PDURATION
PERCENTILE.EXC
PERCENTILE.INC
PERCENTRANK.EXC
PERCENTRANK.INC
PERMUTATIONA
PHI
POISSON.DIST
QUARTILE.EXC
QUARTILE.INC
QUERYSTRING
RANDARRAY
RANK.AVG
RANK.EQ
REDUCE
RRI
SCAN
SEC
SECH
SEQUENCE
SHEET
SHEETS
SKEW.P
SORTBY
STDEV.P
STDEV.S
T.DIST
T.DIST.2T
T.DIST.RT
T.INV
T.INV.2T
T.TEST
UNICHAR
UNICODE
UNIQUE
VAR.P
VAR.S
WEBSERVICE
WEIBULL.DIST
XLOOKUP
XOR
Z.TEST
```

</details>
