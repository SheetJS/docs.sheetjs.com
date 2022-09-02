---
sidebar_position: 2
---

# Cell Object

Cell objects are plain JS objects with keys and values following the convention:

| Key | Description                                                            |
| --- | ---------------------------------------------------------------------- |
|     | **Core Cell Properties** ([More Info](#data-types))                    |
| `v` | raw value (number, string, Date object, boolean)                       |
| `t` | type: `b` Boolean, `e` Error, `n` Number, `d` Date, `s` Text, `z` Stub |
|     | **Number Formats** ([More Info](./features#number-formats))            |
| `z` | number format string associated with the cell (if requested)           |
| `w` | formatted text (if applicable)                                         |
|     | **Formulae** ([More Info](./features/formulae))                        |
| `f` | cell formula encoded as an A1-Style string (if applicable)             |
| `F` | range of enclosing array if formula is array formula (if applicable)   |
| `D` | if true, array formula is dynamic (if applicable)                      |
|     | **Other Cell Properties** ([More Info](./features))                    |
| `l` | cell hyperlink and tooltip ([More Info](./features/hyperlinks))        |
| `c` | cell comments ([More Info](./features/comments))                       |
| `r` | rich text encoding (if applicable)                                     |
| `h` | HTML rendering of the rich text (if applicable)                        |
| `s` | the style/theme of the cell (if applicable)                            |

Built-in export utilities (such as the CSV exporter) will use the `w` text if it
is available.  To change a value, be sure to delete `cell.w` (or set it to
`undefined`) before attempting to export.  The utilities will regenerate the `w`
text from the number format (`cell.z`) and the raw value if possible.

The actual array formula is stored in the `f` field of the first cell in the
array range.  Other cells in the range will omit the `f` field.

### Data Types

The raw value is stored in the `v` value property, interpreted based on the `t`
type property.  This separation allows for representation of numbers as well as
numeric text.  There are 6 valid cell types:

| Type | Description                                                           |
| :--: | :-------------------------------------------------------------------- |
| `b`  | Boolean: value interpreted as JS `boolean`                            |
| `e`  | Error: value is a numeric code and `w` property stores common name ** |
| `n`  | Number: value is a JS `number` **                                     |
| `d`  | Date: value is a JS `Date` object or string to be parsed as Date **   |
| `s`  | Text: value interpreted as JS `string` and written as text **         |
| `z`  | Stub: blank stub cell that is ignored by data processing utilities ** |

<details>
  <summary><b>Error values and interpretation</b> (click to show)</summary>

|  Value | Error Meaning   |
| -----: | :-------------- |
| `0x00` | `#NULL!`        |
| `0x07` | `#DIV/0!`       |
| `0x0F` | `#VALUE!`       |
| `0x17` | `#REF!`         |
| `0x1D` | `#NAME?`        |
| `0x24` | `#NUM!`         |
| `0x2A` | `#N/A`          |
| `0x2B` | `#GETTING_DATA` |

</details>

Type `n` is the Number type. This includes all forms of data that Excel stores
as numbers, such as dates/times and Boolean fields.  Excel exclusively uses data
that can be fit in an IEEE754 floating point number, just like JS Number, so the
`v` field holds the raw number.  The `w` field holds formatted text.  Dates are
stored as numbers by default and converted with `XLSX.SSF.parse_date_code`.

Type `d` is the Date type, generated only when the option `cellDates` is passed.
Since JSON does not have a natural Date type, parsers are generally expected to
store ISO 8601 Date strings like you would get from `date.toISOString()`.  On
the other hand, writers and exporters should be able to handle date strings and
JS Date objects.  Note that Excel disregards timezone modifiers and treats all
dates in the local timezone.  The library does not correct for this error.
Dates are covered in more detail [in the Dates section](./features/dates)

Type `s` is the String type.  Values are explicitly stored as text.  Excel will
interpret these cells as "number stored as text".  Generated Excel files
automatically suppress that class of error, but other formats may elicit errors.

Type `z` represents blank stub cells.  They are generated in cases where cells
have no assigned value but hold comments or other metadata. They are ignored by
the core library data processing utility functions.  By default these cells are
not generated; the parser `sheetStubs` option must be set to `true`.

