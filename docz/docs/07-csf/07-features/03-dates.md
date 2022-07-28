---
sidebar_position: 3
---

# Dates and Times

Lotus 1-2-3, Excel, and other spreadsheet software do not have a true concept
of date or time.  Instead, dates and times are stored as offsets from an epoch.
The magic behind date interpretations is hidden in functions or number formats.

SheetJS attempts to create a friendly JS date experience while also exposing
options to use the traditional date codes


## How Spreadsheets Understand Time

Excel stores dates as numbers.  When displaying dates, the format code should
include special date and time tokens like `yyyyy` for long year. `EDATE` and
other date functions operate on and return date numbers.

For date formats like `yyyy-mm-dd`, the integer part represents the number of
days from a starting epoch.  For example, the date `19-Feb-17` is stored as the
number `42785` with a number format of `d-mmm-yy`.

The fractional part of the date code serves as the time marker.  Excel assumes
each day has exactly 86400 seconds.  For example, the date code `0.25` has a
time component corresponding to 6:00 AM.

For absolute time formats like `[hh]:mm`, the integer part represents a whole
number of 24-hour (or 1440 minute) intervals.  The value `1.5` in the format
`[hh]:mm` is interpreted as 36 hours 0 minutes.

### Date and Time Number Formats

Assuming a cell has a formatted date, re-formatting as "General" will reveal
the underlying value.  Alternatively, the `TEXT` function can be used to return
the date code.

The following table covers some common formats:

<details open><summary><b>Common Date-Time Formats</b> (click to hide)</summary>

| Fragment | Interpretation               |
|:---------|:-----------------------------|
| `yy`     | Short (2-digit) year         |
| `yyyy`   | Long (4-digit) year          |
| `m`      | Short (1-digit) month        |
| `mm`     | Long (2-digit) month         |
| `mmm`    | Short (3-letter) month name  |
| `mmmm`   | Full month name              |
| `mmmmm`  | First letter of month name   |
| `d`      | Short (1-digit) day of month |
| `dd`     | Long (2-digit) day of month  |
| `ddd`    | Short (3-letter) day of week |
| `dddd`   | Full day of week             |
| `h`      | Short (1-digit) hours        |
| `hh`     | Long (2-digit) hours         |
| `m`      | Short (1-digit) minutes      |
| `mm`     | Long (2-digit) minutes       |
| `s`      | Short (1-digit) seconds      |
| `ss`     | Long (2-digit) seconds       |
| `A/P`    | Meridien ("A" or "P")        |
| `AM/PM`  | Meridien ("AM" or "PM")      |

:::note

`m` and `mm` are context-dependent.  It is interpreted as "minutes" when the
previous or next date token represents a time (hours or seconds):

```
yyyy-mm-dd hh:mm:ss
     ^^       ^^
    month    minutes
```

:::

</details>

### 1904 and 1900 Date Systems

The interpretation of date codes requires a shared understanding of date code
`0`, otherwise known as the "epoch".  Excel supports two epochs:

- The default epoch is "January 0 1900". The `0` value is 00:00 on December 31
  of the year 1899, but it is formatted as January 0 1900.

- Enabling "1904 Date System" sets the default epoch to "January 1 1904".  The
  `0` value is 00:00 on January 1 of the year 1904.

The workbook's epoch can be determined by examining the workbook's `wb.Workbook.WBProps.date1904` property:

```js
if(!!(((wb.Workbook||{}).WBProps||{}).date1904)) {
  /* uses 1904 date system */
} else {
  /* uses 1900 date system */
}
```

:::note Why does the 1904 date system exist?

1900 was not a leap year.  For the Gregorian calendar, the general rules are:
- every multiple of 400 is a leap year
- every multiple of 100 that is not a multiple of 400 is not a leap year
- every multiple of 4 that is not a multiple of 100 is a leap year
- all other years are not leap years.

Lotus 1-2-3 erroneously treated 1900 as a leap year. This can be verified with
the `@date` function:

```
@date(0,2,28) -> 59    // Lotus accepts 2/28/1900
@date(0,2,29) -> 60    // <--2/29/1900 was not a real date
@date(0.2,30) -> ERR   // Lotus rejects 2/30/1900
```

Excel extends the tradition in the default date system.  The 1904 date system
starts the count in 1904, skipping the bad date.

:::

### Relative Epochs

The epoch is based on the system timezone.  The epoch in New York is midnight
in Eastern time, while the epoch in Seattle is midnight in Pacific time.

This design has the advantage of uniform time display: "12 PM" is 12 PM
irrespective of the timezone of the viewer.  However, this design precludes any
international coordination (there is no way to create a value that represents
an absolute time) and makes JavaScript processing somewhat ambiguous (since
JavaScript Date objects are timezone-aware)

This is a deficiency of the spreadsheet software. Excel has no native concept
of universal time.

The library attempts to normalize the dates.  All times are specified in the
local time zone.  SheetJS cannot magically fix the technical problems with
Excel and other spreadsheet software, but this represents .


## How Files Store Dates and Times

XLS, XLSB, and most binary formats store the raw date codes.  Special number
formats are used to indicate that the values are intended to be dates/times.

CSV and other plaintext formats typically store actual formatted date values.
They are interpreted as dates and times in the user timezone.

XLSX actually supports both!  Typically dates are stored as `n` numeric cells,
but the format supports a special type `d` where the data is an ISO 8601 date
string. This is not used in the default Excel XLSX export and third-party
support is poor.

ODS does support absolute time values but drops the actual timezone indicator
when parsing.  In that sense, LibreOffice follows the same behavior as Excel.


## How SheetJS handles Dates and Times

The default behavior for all parsers is to generate number cells.  Passing the
`cellDates` to true will force the parsers to store dates:

```js
// cell A1 will be { t: 'n', v: 44721 }
var wb_sans_date = XLSX.read("6/9/2022", {type:"binary"});

// cell A1 will be { t: 'd', v: <Date object representing June 9 2022> }
var wb_with_date = XLSX.read("6/9/2022", {type:"binary", cellDates: true});
```

When writing, date cells are automatically translated back to numeric cells
with an appropriate number format.

The actual values stored in cells are intended to be correct from the
perspective of an Excel user in the current timezone.

The value formatter understands date formats and converts when relevant.

### Utility Functions

Utility functions that deal with JS data accept a `cellDates` argument which
dictates how dates should be handled.

Functions that create a worksheet will adjust date cells and use a number
format like `m/d/yy` to mark dates:

```js
// Cell A1 will be a numeric cell whose value is the date code
var ws = XLSX.utils.aoa_to_sheet([[new Date()]]);

// Cell A1 will be a date cell
var ws = XLSX.utils.aoa_to_sheet([[new Date()]], { cellDates: true });
```

Functions that create an array of JS objects with raw values will keep the
native representation:

```js
// Cell A1 is numeric -> output is a number
var ws = XLSX.utils.aoa_to_sheet([[new Date()]]);
var A1 = XLSX.utils.sheet_to_json(ws, { header: 1 })[0][0];

// Cell A1 is a date -> output is a date
var ws = XLSX.utils.aoa_to_sheet([[new Date()]], { cellDates: true });
var A1 = XLSX.utils.sheet_to_json(ws, { header: 1 })[0][0];
```

### Number Formats

By default, the number formats are not emitted.  For Excel-based file formats,
passing the option `cellNF: true` adds the `z` field.

The helper function `XLSX.SSF.is_date` parses formats and returns `true` if the
format represents a date or time:

```js
XLSX.SSF.is_date("yyyy-mm-dd"); // true

XLSX.SSF.is_date("0.00"); // false
```

<details><summary><b>Live Demo</b> (click to show)</summary>

```jsx live
function SSFIsDate() {
  const [format, setFormat] = React.useState("yyyy-mm-dd");
  const cb = React.useCallback((evt) => {
    setFormat(evt.target.value);
  });
  const is_date = XLSX.SSF.is_date(format);
  return (<>
    <div>Format <b>|{format}|</b> is {is_date ? "" : "not"} a date/time</div>
    <input type="text" onChange={cb}/>
  </>)
}
```

</details>
