/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
let sheetjs = try SheetJSCore();

/* Print the SheetJS library version */
try print(sheetjs.version());

/* Read file */
let wb: SJSWorkbook = try sheetjs.readFile(file: CommandLine.arguments[1]);

/* Convert the first worksheet to CSV and print */
let ws: SJSWorksheet = try wb.getSheetAtIndex(idx: 0);
let csv: String = try ws.toCSV();
print(csv);

/* write an XLSX file to SheetJSwift.xlsx */
let wbout: String = try wb.writeBStr(bookType: "xlsx");
try wbout.write(toFile: "SheetJSwift.xlsx", atomically: false, encoding: String.Encoding.isoLatin1);
