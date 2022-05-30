#target photoshop
#include "xlsx.extendscript.js";

function main_write() {
  /* Show File Picker */
  var thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");
  if(!thisFile) { alert("File not found!"); return; }

  /* Create new Worksheet */
  var ws = XLSX.utils.aoa_to_sheet([
    ["Author", activeDocument.info.author]
  ]);

  /* Create new Workbook and add worksheet */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  /* Write file to disk */
  XLSX.writeFile(wb, thisFile.absoluteURI);
  alert("Created File " + thisFile.absoluteURI);
}

main_write();