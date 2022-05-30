#target photoshop
#include "xlsx.extendscript.js";

function main_parse() {
  /* Show File Picker */
  var thisFile = File.openDialog("Select a spreadsheet");
  if(!thisFile) { alert("File not found!"); return; }

  /* Read file from disk */
  var workbook = XLSX.readFile(thisFile.absoluteURI);

  /* Get Workbook Author */
  var Props = workbook.Props; if(!Props) { alert("Missing Author!"); return; }
  var Author = Props.Author; if(!Author) { alert("Missing Author!"); return; }

  /* Change Document Author to Workbook Author */
  var info = activeDocument.info;
  alert("Changing Author from |" + info.author + "| to |" + Author + "|");
  info.author = Author;
}

main_parse();