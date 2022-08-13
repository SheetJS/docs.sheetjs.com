"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8334],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>c});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,h=m["".concat(s,".").concat(c)]||m[c]||u[c]||o;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},693:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:12,title:"Legacy Frameworks"},l=void 0,i={unversionedId:"demos/legacy",id:"demos/legacy",title:"Legacy Frameworks",description:"Over the years, many frameworks have been released. Some were popular years ago",source:"@site/docs/03-demos/12-legacy.md",sourceDirName:"03-demos",slug:"/demos/legacy",permalink:"/docs/demos/legacy",draft:!1,tags:[],version:"current",sidebarPosition:12,frontMatter:{sidebar_position:12,title:"Legacy Frameworks"},sidebar:"tutorialSidebar",previous:{title:"NoSQL Data Stores",permalink:"/docs/demos/nosql"},next:{title:"Command-Line Tools",permalink:"/docs/demos/cli"}},s={},p=[{value:"Integration",id:"integration",level:2},{value:"Internet Explorer",id:"internet-explorer",level:2},{value:"Upload Strategies",id:"upload-strategies",level:3},{value:"Download Strategies",id:"download-strategies",level:3},{value:"Frameworks",id:"frameworks",level:2},{value:"AngularJS",id:"angularjs",level:3},{value:"KnockoutJS",id:"knockoutjs",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Over the years, many frameworks have been released. Some were popular years ago\nbut have waned in recent years. There are still many deployments using these\nframeworks and it is oftentimes esasier to continue maintenance than to rewrite\nusing modern web techniques."),(0,r.kt)("p",null,"SheetJS libraries strive to maintain broad browser and JS engine compatibility."),(0,r.kt)("h2",{id:"integration"},"Integration"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation/standalone"},'"Standalone Browser Scripts"')," section has\ninstructions for obtaining or referencing the standalone scripts.  These are\ndesigned to be referenced with ",(0,r.kt)("inlineCode",{parentName:"p"},"<script>")," tags."),(0,r.kt)("h2",{id:"internet-explorer"},"Internet Explorer"),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"Internet Explorer is unmaintained and users should consider modern browsers.\nThe SheetJS testing grid still includes IE and should work.")),(0,r.kt)("p",null,"The modern upload and download strategies are not available in older versions of\nIE, but there are approaches using older technologies like ActiveX and Flash."),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Complete Example")," (click to show)"),(0,r.kt)("p",null,"This demo includes all of the support files for the Flash and ActiveX methods."),(0,r.kt)("p",null,"1) Download the standalone script and shim to a server that will host the demo:"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"},"xlsx.full.min.js")),(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js"},"shim.min.js"))),(0,r.kt)("p",null,"2) ",(0,r.kt)("a",{parentName:"p",href:"pathname:///ie/SheetJSIESupport.zip"},"Download the demo ZIP")," to the server."),(0,r.kt)("p",null,"The ZIP includes the demo HTML file as well as the Downloadify support files."),(0,r.kt)("p",null,"Extract the contents to the same folder as the scripts from step 1"),(0,r.kt)("p",null,"3) Start a HTTP server:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx -y http-server .\n")),(0,r.kt)("p",null,"4) Access the ",(0,r.kt)("inlineCode",{parentName:"p"},"index.html")," from a machine with Internet Explorer.")),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Other Live Demos")," (click to show)"),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"The hosted solutions may not work in older versions of Windows.  For testing,\ndemo pages should be downloaded and hosted using a simple HTTP server.")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"http://oss.sheetjs.com/sheetjs/ajax.html"},"http://oss.sheetjs.com/sheetjs/ajax.html")," uses XMLHttpRequest to download test\nfiles and convert to CSV."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://oss.sheetjs.com/sheetjs/"},"https://oss.sheetjs.com/sheetjs/")," demonstrates reading files with ",(0,r.kt)("inlineCode",{parentName:"p"},"FileReader"),"."),(0,r.kt)("p",null,"Older versions of IE do not support HTML5 File API but do support Base64."),(0,r.kt)("p",null,"On OSX you can get the Base64 encoding with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ <target_file base64 | pbcopy\n")),(0,r.kt)("p",null,"On Windows XP and up you can get the Base64 encoding using ",(0,r.kt)("inlineCode",{parentName:"p"},"certutil"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cmd"},"> certutil -encode target_file target_file.b64\n")),(0,r.kt)("p",null,"(note: You have to open the file and remove the header and footer lines)")),(0,r.kt)("h3",{id:"upload-strategies"},"Upload Strategies"),(0,r.kt)("p",null,"IE10 and IE11 support the standard HTML5 FileReader API:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function handle_fr(e) {\n  var f = e.target.files[0];\n  var reader = new FileReader();\n  reader.onload = function(e) {\n    var wb = XLSX.read(e.target.result);\n    process_wb(wb); // DO SOMETHING WITH wb HERE\n  };\n  reader.readAsArrayBuffer(f);\n}\ninput_dom_element.addEventListener('change', handle_fr, false);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Blob#arrayBuffer")," is not supported in IE!"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"ActiveX-based Upload")),(0,r.kt)("p",null,"Through the ",(0,r.kt)("inlineCode",{parentName:"p"},"Scripting.FileSystemObject")," object model, a script in the VBScript\nscripting language can read from an arbitrary path on the filesystem.  The shim\nincludes a special ",(0,r.kt)("inlineCode",{parentName:"p"},"IE_LoadFile")," function to read binary strings from file. This\nshould be called from a file input ",(0,r.kt)("inlineCode",{parentName:"p"},"onchange")," event:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"var input_dom_element = document.getElementById(\"file\");\nfunction handle_ie() {\n  /* get data from selected file */\n  var path = input_dom_element.value;\n  var bstr = IE_LoadFile(path);\n  /* read workbook */\n  var wb = XLSX.read(bstr, {type: 'binary'});\n  /* DO SOMETHING WITH workbook HERE */\n}\ninput_dom_element.attachEvent('onchange', handle_ie);\n")),(0,r.kt)("h3",{id:"download-strategies"},"Download Strategies"),(0,r.kt)("p",null,"As part of the File API implementation, IE10 and IE11 provide the ",(0,r.kt)("inlineCode",{parentName:"p"},"msSaveBlob"),"\nand ",(0,r.kt)("inlineCode",{parentName:"p"},"msSaveOrOpenBlob")," functions to save blobs to the client computer.  This\napproach is embedded in ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile")," and no additional shims are necessary."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Flash-based Download")),(0,r.kt)("p",null,"It is possible to write to the file system using a SWF.  ",(0,r.kt)("inlineCode",{parentName:"p"},"Downloadify")," library\nimplements one solution.  Since a genuine click is required, there is no way to\nforce a download.  The safest data type is Base64:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// highlight-next-line\nDownloadify.create(element_id, {\n  /* Downloadify boilerplate */\n  swf: 'downloadify.swf',\n  downloadImage: 'download.png',\n  width: 100, height: 30,\n  transparent: false, append: false,\n\n  // highlight-start\n  /* Key parameters */\n  filename: \"test.xlsx\",\n  dataType: 'base64',\n  data: function() { return XLSX.write(wb, { bookType: \"xlsx\", type: 'base64' }); }\n  // highlight-end\n// highlight-next-line\n});\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"ActiveX-based Download")),(0,r.kt)("p",null,"Through the ",(0,r.kt)("inlineCode",{parentName:"p"},"Scripting.FileSystemObject")," object model, a script in the VBScript\nscripting language can write to an arbitrary path on the filesystem.  The shim\nincludes a special ",(0,r.kt)("inlineCode",{parentName:"p"},"IE_SaveFile")," function to write binary strings to file.  It\nattempts to write to the Downloads folder or Documents folder or Desktop."),(0,r.kt)("p",null,"This approach can be triggered, but it requires the user to enable ActiveX.  It\nis embedded as a strategy in ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile")," and used only if the shim script is\nincluded in the page and the relevant features are enabled on the target system."),(0,r.kt)("h2",{id:"frameworks"},"Frameworks"),(0,r.kt)("h3",{id:"angularjs"},"AngularJS"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/AngularJS"},"AngularJS"),' was a front-end MVC\nframework that was abandoned by Google in 2022. It should not be confused with\n"Angular" the modern framework.'),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"pathname:///angularjs/index.html"},"Live demo")," shows a simple table that is\nupdated with file data and exported to spreadsheets."),(0,r.kt)("p",null,"This demo uses AngularJS 1.5.0."),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Full Exposition")," (click to show)"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Array of Objects")),(0,r.kt)("p",null,"A common data table is often stored as an array of objects:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'$scope.data = [\n  { Name: "Bill Clinton", Index: 42 },\n  { Name: "GeorgeW Bush", Index: 43 },\n  { Name: "Barack Obama", Index: 44 },\n  { Name: "Donald Trump", Index: 45 }\n];\n')),(0,r.kt)("p",null,"This neatly maps to a table with ",(0,r.kt)("inlineCode",{parentName:"p"},"ng-repeat"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<table id="sjs-table">\n  <tr><th>Name</th><th>Index</th></tr>\n  <tr ng-repeat="row in data">\n    <td>{{row.Name}}</td>\n    <td>{{row.Index}}</td>\n  </tr>\n</table>\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"$http")," service can request binary data using the ",(0,r.kt)("inlineCode",{parentName:"p"},'"arraybuffer"')," response\ntype coupled with ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.read")," with type ",(0,r.kt)("inlineCode",{parentName:"p"},'"array"'),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"  $http({\n    method:'GET',\n    url:'https://sheetjs.com/pres.xlsx',\n    responseType:'arraybuffer'\n  }).then(function(data) {\n    var wb = XLSX.read(data.data, {type:\"array\"});\n    var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);\n    $scope.data = d;\n  }, function(err) { console.log(err); });\n")),(0,r.kt)("p",null,"The HTML table can be directly exported with ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.utils.table_to_book"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"var wb = XLSX.utils.table_to_book(document.getElementById('sjs-table'));\nXLSX.writeFile(wb, \"export.xlsx\");\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Import Directive")),(0,r.kt)("p",null,"A general import directive is fairly straightforward:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Define the ",(0,r.kt)("inlineCode",{parentName:"li"},"importSheetJs")," directive in the app:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'app.directive("importSheetJs", [SheetJSImportDirective]);\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Add the attribute ",(0,r.kt)("inlineCode",{parentName:"li"},'import-sheet-js=""')," to the file input element:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<input type="file" import-sheet-js="" multiple="false"  />\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Define the directive:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function SheetJSImportDirective() {\n  return {\n    scope: { opts: '=' },\n    link: function ($scope, $elm) {\n      $elm.on('change', function (changeEvent) {\n        var reader = new FileReader();\n\n        reader.onload = function (e) {\n          /* read workbook */\n          var ab = e.target.result;\n          var workbook = XLSX.read(ab);\n\n          /* DO SOMETHING WITH workbook HERE */\n        };\n\n        reader.readAsArrayBuffer(changeEvent.target.files[0]);\n      });\n    }\n  };\n}\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Export Service")),(0,r.kt)("p",null,"An export can be triggered at any point!  Depending on how data is represented,\na workbook object can be built using the utility functions.  For example, using\nan array of objects:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'/* starting from this data */\nvar data = [\n  { name: "Barack Obama", pres: 44 },\n  { name: "Donald Trump", pres: 45 }\n];\n\n/* generate a worksheet */\nvar ws = XLSX.utils.json_to_sheet(data);\n\n/* add to workbook */\nvar wb = XLSX.utils.book_new();\nXLSX.utils.book_append_sheet(wb, ws, "Presidents");\n\n/* write workbook and force a download */\nXLSX.writeFile(wb, "sheetjs.xlsx");\n'))),(0,r.kt)("h3",{id:"knockoutjs"},"KnockoutJS"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Knockout_(web_framework)"},"KnockoutJS")," was a\npopular MVVM framework."),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"pathname:///knockout/knockout.html"},"Live demo")," shows a view model that is\nupdated with file data and exported to spreadsheets."),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Full Exposition")," (click to show)"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"State")),(0,r.kt)("p",null,"Arrays of arrays are the simplest data structure for representing worksheets."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"var aoa = [\n  [1, 2], // A1 = 1, B1 = 2\n  [3, 4]  // A1 = 3, B1 = 4\n];\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ko.observableArray")," should be used to create the view model:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function ViewModel() {\n  /* use an array of arrays */\n  this.aoa = ko.observableArray([ [1,2], [3,4] ]);\n}\n/* create model */\nvar model = new ViewModel();\nko.applyBindings(model);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.utils.sheet_to_json")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"header: 1")," generates data for the model:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/* starting from a `wb` workbook object, pull first worksheet */\nvar ws = wb.Sheets[wb.SheetNames[0]];\n/* convert the worksheet to an array of arrays */\nvar aoa = XLSX.utils.sheet_to_json(ws, {header:1});\n/* update model */\nmodel.aoa(aoa);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.utils.aoa_to_sheet")," generates worksheets from the model:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"var aoa = model.aoa();\nvar ws = XLSX.utils.aoa_to_sheet(aoa);\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Data Binding")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},'data-bind="foreach: ..."')," provides a simple approach for binding to ",(0,r.kt)("inlineCode",{parentName:"p"},"TABLE"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<table data-bind="foreach: aoa">\n  <tr data-bind="foreach: $data">\n    <td><span data-bind="text: $data"></span></td>\n  </tr>\n</table>\n')),(0,r.kt)("p",null,"Unfortunately the nested ",(0,r.kt)("inlineCode",{parentName:"p"},'"foreach: $data"')," binding is read-only.  A two-way\nbinding is possible using the ",(0,r.kt)("inlineCode",{parentName:"p"},"$parent")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"$index")," binding context properties:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<table data-bind="foreach: aoa">\n  <tr data-bind="foreach: $data">\n    <td><input data-bind="value: $parent[$index()]" /></td>\n  </tr>\n</table>\n'))))}u.isMDXComponent=!0}}]);