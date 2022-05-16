---
sidebar_position: 2
hide_table_of_contents: true
---

# Zen of SheetJS

SheetJS design and development is guided by a few key principles.

### Data processing should fit in any workflow

The library does not impose a separate lifecycle.  It fits nicely in websites
and apps built using any framework.  The plain JS data objects play nice with
Web Workers and future APIs.

### JavaScript is a powerful language for data processing

The ["Common Spreadsheet Format"](../csf/general) is a simple object
representation of the core concepts of a workbook.  The various functions in the
library provide low-level tools for working with the object.

For friendly JS processing, there are utility functions for converting parts of
a worksheet to/from an Array of Arrays.  The [Complete example](../03-example.mdx)
combines powerful JS Array methods with a network request library to download
data, select the information we want and create a workbook file:

### File formats are implementation details

The parser covers a wide gamut of common spreadsheet file formats to ensure that
"HTML-saved-as-XLS" files work as well as actual XLS or XLSX files.

The writer supports a number of common output formats for broad compatibility
with the data ecosystem.

To the greatest extent possible, data processing code should not have to worry
about the specific file formats involved.

