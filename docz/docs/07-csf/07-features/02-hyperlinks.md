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

:::note

Excel does not automatically style hyperlinks.  They will be displayed using
the default cell style. <a href="https://sheetjs.com/pro">SheetJS Pro Basic</a>
extends this export with support for hyperlink styling.

:::

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportSimpleLink(props) { return ( <button onClick={() => {
  /* Create worksheet */
  var ws = XLSX.utils.aoa_to_sheet([ [ "Link", "No Link" ] ]);
  /* Add link */
  ws["A1"].l = {
    Target: "https://sheetjs.com",
    Tooltip: "Find us @ SheetJS.com!"
  };

  /* Export to file (start a download) */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "SheetJSSimpleLink.xlsx");
}}><b>Export XLSX!</b></button> ); }
```

</details>

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

<details><summary><b>Live Example</b> (click to show)</summary>

**This demo creates a XLSX spreadsheet with a `mailto` email link. The email
address input in the form never leaves your machine.**

```jsx live
/* The live editor requires this function wrapper */
function ExportRemoteLink(props) {
  const [email, setEmail] = React.useState("ignored@dev.null");
  const set_email = React.useCallback((evt) => setEmail(evt.target.value));

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Create worksheet */
    var ws = XLSX.utils.aoa_to_sheet([ [ "HTTPS", "mailto" ] ]);
    /* Add links */
    ws["A1"].l = { Target: "https://sheetjs.com" };
    ws["B1"].l = { Target: `mailto:${email}` };

    /* Export to file (start a download) */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSRemoteLink.xlsx");
  });

  return (<>
    <b>Email: </b><input type="text" value={email} onChange={set_email} size="50"/>
    <br/><button onClick={xport}><b>Export XLSX!</b></button>
  </>);
}
```

</details>

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
ws["C3"].l = { Target: "#SheetJSDName" }; /* Link to Defined Name */
```

<details><summary><b>Live Example</b> (click to show)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportInternalLink(props) { return ( <button onClick={() => {
  /* Create empty workbook */
  var wb = XLSX.utils.book_new();

  /* Create worksheet */
  var ws = XLSX.utils.aoa_to_sheet([ [ "Same", "Cross", "Name" ] ]);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  /* Create links */
  ws["A1"].l = { Target: "#B2:D4", Tooltip: "Same-Sheet" };
  ws["B1"].l = { Target: "#Sheet2!B2:D4", Tooltip: "Cross-Sheet" };
  ws["C1"].l = { Target: "#SheetJSDN", Tooltip: "Defined Name" };

  /* Create stub Sheet2 */
  var ws2 = XLSX.utils.aoa_to_sheet([["This is Sheet2"]]);
  XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");

  /* Create defined name */
  wb.Workbook = {
    Names: [{Name: "SheetJSDN", Ref:"Sheet2!A1:B2"}]
  }

  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SheetJSInternalLink.xlsx");
}}><b>Export XLSX!</b></button> ); }
```

</details>

:::caution

Some third-party tools like Google Sheets do not correctly parse hyperlinks in
XLSX documents.  A workaround was added in library version 0.18.12.

:::

## HTML

The HTML DOM parser will process `<a>` links in the table:

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
/* The live editor requires this function wrapper */
function ExportHyperlink(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */
    const table = document.getElementById("TableLink");
    const wb = XLSX.utils.table_to_book(table);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSHTMLHyperlink.xlsx");
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

</details>
