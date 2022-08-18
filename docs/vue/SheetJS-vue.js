/* sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
var SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm", "numbers"
].map(function(x) { return "." + x; }).join(",");

var SJSTemplate = [
  '<div>',
    '<input type="file" multiple="false" id="sheetjs-input" accept="' + SheetJSFT + '" @change="onchange" />',
    '<br/>',
    '<button type="button" id="export-table" style="visibility:hidden" @click="onexport">Export to XLSX</button>',
    '<br/>',
    '<div id="out-table"></div>',
  '</div>'
].join("");
var component_struct = {
  template: SJSTemplate,
  methods: {
    onchange: function(evt) {
      var files = evt.target.files;
      if (!files || files.length == 0) return;

      var file = files[0];

      var reader = new FileReader();
      reader.onload = function (e) {
        // get data
        var bytes = new Uint8Array(e.target.result);

        /* read workbook */
        var wb = XLSX.read(bytes);

        /* grab first sheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];

        /* generate HTML */
        var HTML = XLSX.utils.sheet_to_html(ws);

        /* update table */
        document.getElementById('out-table').innerHTML = HTML;
        /* show export button */
        document.getElementById('export-table').style.visibility = "visible";
      };

      reader.readAsArrayBuffer(file);
    },
    onexport: function(evt) {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table').getElementsByTagName("TABLE")[0]);
      /* generate file and force a download*/
      XLSX.writeFile(wb, "sheetjs.xlsx");
    }
  }
};
if(Vue.component) {
  Vue.component('html-preview', component_struct);
} else {
  var app = Vue.createApp({});
  app.component('html-preview', component_struct);
}
