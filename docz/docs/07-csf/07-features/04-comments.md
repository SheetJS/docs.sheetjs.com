---
sidebar_position: 4
---

# Cell Comments

<details>
  <summary><b>Format Support</b> (click to show)</summary>

**Simple Notes/Comments**: XLSX/M, XLSB, BIFF8 XLS (read only), XLML, ODS (read only)

**Threaded Comments**: XLSX/M, XLSB (read only)

</details>

## Basic Structure

Cell comments are objects stored in the `c` array of cell objects.

The comment content is split into parts based on the comment author.

The `a` field of each comment part is the author of the comment and the `t`
field is the plain text representation.

For example, the following snippet appends a cell comment into cell `A1`:

```js
var cell = ws["A1"];

/* create comment array if it does not exist */
if(!cell.c) ws.A1.c = [];

/* create a comment part */
var comment_part = {
  a:"SheetJS",
  t:"I'm a little comment, short and stout!"
};

/* Add comment part to the comment array */
cell.c.push(comment_part);
```

:::note XLSB Author limits

XLSB enforces a 54 character limit on the Author name.  Names longer than 54
characters may cause issues with other formats.

:::

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
function SheetJSComments1() {
  return (<button onClick={() => {
    var ws = XLSX.utils.aoa_to_sheet([["SheetJS"]]);

    if(!ws.A1.c) ws.A1.c = [];
    ws.A1.c.push({a:"SheetJS", t:"I'm a little comment, short and stout!"});

    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSComments1.xlsx");
  }}>Click me to generate a sample file</button>);
}
```

</details>

## Visibility

To mark a comment as normally hidden, set the `hidden` property:

```js
if(!cell.c) cell.c = [];
// highlight-next-line
cell.c.hidden = true;
cell.c.push({a:"SheetJS", t:"This comment will be hidden"});
```

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
function SheetJSComments2() {
  return (<button onClick={() => {
    var ws = XLSX.utils.aoa_to_sheet([["SheetJS"], [5433795]]);

    if(!ws.A1.c) ws.A1.c = [];
    ws.A1.c.push({a:"SheetJS", t:"This comment is visible"});

    if(!ws.A2.c) ws.A2.c = [];
    ws.A2.c.hidden = true;
    ws.A2.c.push({a:"SheetJS", t:"This comment will be hidden"});

    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSComments2.xlsx");
  }}>Click me to generate a sample file</button>);
}

```

</details>

## Threaded Comments

Introduced in Excel 365, threaded comments are plain text comment snippets with
author metadata and parent references. They are supported in XLSX and XLSB.

To mark a comment as threaded, each comment part must have a true `T` property:

```js
if(!cell.c) cell.c = [];

var part1 = {
  a:"SheetJS",
  t:"This is threaded",
// highlight-next-line
  T: true
};
cell.c.push(part1);

var part2 = {
  a:"JSSheet",
  t:"This is also threaded",
};
// The next line uses Object Spread syntax to add T: true
// highlight-next-line
cell.c.push({ ...part2, T: true});
```

There is no Active Directory or Office 365 metadata associated with authors.

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
function SheetJSComments2() {
  return (<button onClick={() => {
    var ws = XLSX.utils.aoa_to_sheet([["SheetJS"], [5433795]]);

    /* normal comment */
    if(!ws.A1.c) ws.A1.c = [];
    ws.A1.c.push({a:"SheetJS", t:"This is not threaded"});

    /* hidden threaded comment */
    if(!ws.A2.c) ws.A2.c = [];
    ws.A2.c.hidden = true;

    /* add parts */
    ws.A2.c.push({a:"SheetJS", t:"This is threaded", T: true});

    var part = {a:"JSSheet", t:"This is also threaded"};
    ws.A2.c.push({...part, T: true});

    /* create workbook and export */
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SheetJSThreadedComments.xlsx");
  }}>Click me to generate a sample file</button>);
}

```

</details>
