---
sidebar_position: 2
---

# Hyperlinks

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**Cell Hyperlinks**: XLSX/M, XLSB, BIFF8 XLS, XLML, ODS, HTML

**Tooltips**: XLSX/M, XLSB, BIFF8 XLS, XLML

</details>

Hyperlinks are stored in the `l` key of cell objects.  The `Target` field of the
hyperlink object is the target of the link, including the URI fragment. Tooltips
are stored in the `Tooltip` field and are displayed when hovering over the text.

For example, the following snippet creates a link from cell `A3` to
<https://sheetjs.com> with the tip `"Find us @ SheetJS.com!"`:

```js
ws["A1"].l = { Target: "https://sheetjs.com", Tooltip: "Find us @ SheetJS.com!" };
```

Note that Excel does not automatically style hyperlinks.  They will be displayed
using default style. <a href="https://sheetjs.com/pro">SheetJS Pro Basic</a>
extends this export with support for hyperlink styling.

## Remote Links

HTTP / HTTPS links can be used directly:

```js
ws["A2"].l = { Target: "https://docs.sheetjs.com/docs/csf/features/hyperlinks" };
ws["A3"].l = { Target: "http://localhost:7262/yes_localhost_works" };
```

Excel also supports `mailto` email links with subject line:

```js
ws["A4"].l = { Target: "mailto:ignored@dev.null" };
ws["A5"].l = { Target: "mailto:ignored@dev.null?subject=Test Subject" };
```

## Local Links

Links to absolute paths should use the `file://` URI scheme:

```js
ws["B1"].l = { Target: "file:///SheetJS/t.xlsx" }; /* Link to /SheetJS/t.xlsx */
ws["B2"].l = { Target: "file:///c:/SheetJS.xlsx" }; /* Link to c:\SheetJS.xlsx */
```

Links to relative paths can be specified without a scheme:

```js
ws["B3"].l = { Target: "SheetJS.xlsb" }; /* Link to SheetJS.xlsb */
ws["B4"].l = { Target: "../SheetJS.xlsm" }; /* Link to ../SheetJS.xlsm */
```

:::caution

Relative Paths have undefined behavior in the SpreadsheetML 2003 format.  Excel
2019 will treat a `..\` parent mark as two levels up.

:::

## Internal Links

Links where the target is a cell or range or defined name in the same workbook
("Internal Links") are marked with a leading hash character:

```js
ws["C1"].l = { Target: "#E2" }; /* Link to cell E2 */
ws["C2"].l = { Target: "#Sheet2!E2" }; /* Link to cell E2 in sheet Sheet2 */
ws["C3"].l = { Target: "#SomeDefinedName" }; /* Link to Defined Name */
```

## HTML

The HTML DOM parser will process `<a>` links in the table:

```jsx live
/* The live editor requires this function wrapper */
function ExportHyperlink(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */
    const table = document.getElementById("TableLink");
    const wb = XLSX.utils.table_to_book(table);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSHyperlink1.xlsx");
  });

  return (<>
    <button onClick={xport}><b>Export XLSX!</b></button>
    <table id="TableLink"><tbody><tr><td>
      Do not click here, for it is link-less.
    </td></tr><tr><td>
      <a href="https://sheetjs.com">Click here for more info</a>
    </td></tr></tbody></table>
  </>);
}
```
