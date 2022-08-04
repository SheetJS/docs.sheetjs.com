/* sheetjs (C) 2013-present SheetJS -- https://sheetjs.com */
const XLSX = require('xlsx');
const electron = require('@electron/remote');

/* list of supported extensions */
const EXTENSIONS = "xls|xlsx|xlsm|xlsb|xml|csv|txt|dif|sylk|slk|prn|ods|fods|htm|html|numbers".split("|");

/* write file with Electron API */
async function exportFile() {
  const HTMLOUT = document.getElementById('htmlout');
  const wb = XLSX.utils.table_to_book(HTMLOUT.getElementsByTagName("TABLE")[0]);
  const o = await electron.dialog.showSaveDialog({
    title: 'Save file as',
    filters: [{
      name: "Spreadsheets",
      extensions: EXTENSIONS
    }]
  });
  XLSX.writeFile(wb, o.filePath);
  electron.dialog.showMessageBox({ message: "Exported data to " + o.filePath, buttons: ["OK"] });
}
document.getElementById('exportBtn').addEventListener('click', exportFile, false);

/* common handler to create HTML tables on the page */
function process_wb(wb) {
  const HTMLOUT = document.getElementById('htmlout');
  const XPORT = document.getElementById('exportBtn');
  XPORT.disabled = false;
  HTMLOUT.innerHTML = "";
  wb.SheetNames.forEach(function(sheetName) {
    const htmlstr = XLSX.utils.sheet_to_html(wb.Sheets[sheetName],{editable:true});
    HTMLOUT.innerHTML += htmlstr;
  });
}

/* read file with Electron API */
async function handleReadBtn() {
  const o = await electron.dialog.showOpenDialog({
    title: 'Select a file',
    filters: [{
      name: "Spreadsheets",
      extensions: EXTENSIONS
    }],
    properties: ['openFile']
  });
  if(o.filePaths.length == 0) throw new Error("No file was selected!");
  process_wb(XLSX.readFile(o.filePaths[0]));
}
document.getElementById('readBtn').addEventListener('click', handleReadBtn, false);

/* read file with Web APIs */
async function readFile(files) {
  const f = files[0];
	const data = await f.arrayBuffer();
  process_wb(XLSX.read(data));
}

// file input element
document.getElementById('readIn').addEventListener('change', (e) => { readFile(e.target.files); }, false);

// drag and drop
const drop = document.getElementById('drop');
drop.addEventListener('drop', (e) => {
  e.stopPropagation(); e.preventDefault();
  readFile(e.dataTransfer.files);
}, false);

const handleDrag = (e) => {
  e.stopPropagation(); e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};
drop.addEventListener('dragenter', handleDrag, false);
drop.addEventListener('dragover', handleDrag, false);
