"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4405],{3905:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>c});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},k=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,k=l(e,["components","mdxType","originalType","parentName"]),u=p(n),c=o,m=u["".concat(i,".").concat(c)]||u[c]||h[c]||a;return n?r.createElement(m,s(s({ref:t},k),{},{components:n})):r.createElement(m,s({ref:t},k))}));function c(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3972:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:3},s="Data Processing",l={unversionedId:"solutions/processing",id:"solutions/processing",title:"Data Processing",description:'The "Common Spreadsheet Format" is a simple object',source:"@site/docs/06-solutions/03-processing.md",sourceDirName:"06-solutions",slug:"/solutions/processing",permalink:"/docs/solutions/processing",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Data Import",permalink:"/docs/solutions/input"},next:{title:"Data Export",permalink:"/docs/solutions/output"}},i={},p=[{value:"Workbook",id:"workbook",level:2},{value:"Worksheets",id:"worksheets",level:3},{value:"Examples",id:"examples",level:4},{value:"Other Properties",id:"other-properties",level:3},{value:"Worksheet",id:"worksheet",level:2},{value:"Cells",id:"cells",level:3},{value:"Examples",id:"examples-1",level:4},{value:"Other Properties",id:"other-properties-1",level:3}],k={toc:p};function h(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"data-processing"},"Data Processing"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"../csf/general"},'"Common Spreadsheet Format"')," is a simple object\nrepresentation of the core concepts of a workbook.  The utility functions work\nwith the object representation and are intended to handle common use cases."),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"./input"},"Data Input")," and ",(0,o.kt)("a",{parentName:"p",href:"./output"},"Data Output")," sections cover how to\nread from data sources and write to data sources."),(0,o.kt)("h2",{id:"workbook"},"Workbook"),(0,o.kt)("h3",{id:"worksheets"},"Worksheets"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Worksheet names are case-sensitive.")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"List the Worksheet names in tab order")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var wsnames = workbook.SheetNames;\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"SheetNames"),' property of the workbook object is a list of the worksheet\nnames in "tab order".  API functions will look at this array.'),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Access a Worksheet by name")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var worksheet = workbook.Sheets[sheet_name];\n")),(0,o.kt)("p",null,"The workbook object's ",(0,o.kt)("inlineCode",{parentName:"p"},"Sheets")," property is an object whose keys are sheet names\nand whose values are worksheet objects."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Access the first Worksheet")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var first_ws = workbook.Sheets[workbook.SheetNames[0]];\n")),(0,o.kt)("p",null,"Combining the previous examples, ",(0,o.kt)("inlineCode",{parentName:"p"},"workbook.Sheets[workbook.SheetNames[n]]")," is\nthe ",(0,o.kt)("inlineCode",{parentName:"p"},"n"),"-th worksheet if it exists in the workbook."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Replace a Worksheet in place")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"workbook.Sheets[sheet_name] = new_worksheet;\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Sheets")," property of the workbook object is an object whose keys are names\nand whose values are worksheet objects.  By reassigning to a property of the\n",(0,o.kt)("inlineCode",{parentName:"p"},"Sheets")," object, the worksheet object can be changed without disrupting the\nrest of the worksheet structure."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Append a Worksheet to a Workbook")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"book_append_sheet")," utility function appends a worksheet to the workbook.\nThe third argument specifies the desired worksheet name. Multiple worksheets can\nbe added to a workbook by calling the function multiple times.  If the worksheet\nname is already used in the workbook, it will throw an error."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Append a Worksheet to a Workbook and find a unique name")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var new_name = XLSX.utils.book_append_sheet(workbook, worksheet, name, true);\n")),(0,o.kt)("p",null,"If the fourth argument is ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", the function will start with the specified\nworksheet name.  If the sheet name exists in the workbook, a new worksheet name\nwill be chosen by finding the name stem and incrementing the counter:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'XLSX.utils.book_append_sheet(workbook, sheetA, "Sheet2", true); // Sheet2\nXLSX.utils.book_append_sheet(workbook, sheetB, "Sheet2", true); // Sheet3\nXLSX.utils.book_append_sheet(workbook, sheetC, "Sheet2", true); // Sheet4\nXLSX.utils.book_append_sheet(workbook, sheetD, "Sheet2", true); // Sheet5\n')),(0,o.kt)("h4",{id:"examples"},"Examples"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'var ws_name = "SheetJS";\n\n/* Create worksheet */\nvar ws_data = [\n  [ "S", "h", "e", "e", "t", "J", "S" ],\n  [  1 ,  2 ,  3 ,  4 ,  5 ]\n];\nvar ws = XLSX.utils.aoa_to_sheet(ws_data);\n\n/* Create workbook */\nvar wb = XLSX.utils.book_new();\n\n/* Add the worksheet to the workbook */\n// highlight-next-line\nXLSX.utils.book_append_sheet(wb, ws, ws_name);\n\n/* Write to file */\nXLSX.writeFile(wb, "SheetJS.xlsx");\n')),(0,o.kt)("h3",{id:"other-properties"},"Other Properties"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Add a Defined Name")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'if(!workbook.Workbook) workbook.Workbook = {};\nif(!workbook.Workbook.Names) workbook.Workbook.Names = [];\nworkbook.Workbook.Names.push({\n  Name: "SourceData",\n  Ref: "Sheet1!A1:D12"\n});\n')),(0,o.kt)("p",null,"This is described in more detail in ",(0,o.kt)("a",{parentName:"p",href:"../csf/book#defined-names"},'"Workbook Object"'),"."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Set Workbook Properties")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'if(!wb.Props) wb.Props = {};\nwb.Props["Company"] = "SheetJS LLC";\n')),(0,o.kt)("p",null,"The full set of property names, and their mapping to the Excel UI, is included\nin ",(0,o.kt)("a",{parentName:"p",href:"../csf/book#file-properties"},'"File Properties"')),(0,o.kt)("h2",{id:"worksheet"},"Worksheet"),(0,o.kt)("h3",{id:"cells"},"Cells"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Modify a single cell value in a Worksheet")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"XLSX.utils.sheet_add_aoa(worksheet, [[new_value]], { origin: address });\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Modify multiple cell values in a Worksheet")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"XLSX.utils.sheet_add_aoa(worksheet, aoa, opts);\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_add_aoa")," utility function modifies cell values in a worksheet.  The\nfirst argument is the worksheet object.  The second argument is an array of\narrays of values.  The ",(0,o.kt)("inlineCode",{parentName:"p"},"origin")," key of the third argument controls where cells\nwill be written.  The following snippet sets ",(0,o.kt)("inlineCode",{parentName:"p"},"B3=1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},'E5="abc"'),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'XLSX.utils.sheet_add_aoa(worksheet, [\n  [1],                             // <-- Write 1 to cell B3\n  ,                                // <-- Do nothing in row 4\n  [/*B5*/, /*C5*/, /*D5*/, "abc"]  // <-- Write "abc" to cell E5\n], { origin: "B3" });\n')),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../api/utilities#array-of-arrays-input"},'"Array of Arrays Input"')," describes the\nfunction and the optional ",(0,o.kt)("inlineCode",{parentName:"p"},"opts")," argument in more detail."),(0,o.kt)("h4",{id:"examples-1"},"Examples"),(0,o.kt)("p",null,"The special origin value ",(0,o.kt)("inlineCode",{parentName:"p"},"-1")," instructs ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_add_aoa")," to start in column A of\nthe row after the last row in the range, appending the data:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'XLSX.utils.sheet_add_aoa(worksheet, [\n  ["first row after data", 1],\n  ["second row after data", 2]\n], { origin: -1 });\n')),(0,o.kt)("h3",{id:"other-properties-1"},"Other Properties"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Merge a group of cells")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'if(!worksheet["!merges"]) worksheet["!merges"] = [];\nworksheet["!merges"].push(XLSX.utils.decode_range("A1:E1"));\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"!merges")," property of a worksheet object is a list of ",(0,o.kt)("a",{parentName:"p",href:"../csf/general#cell-ranges"},"Cell Ranges"),".\nThe data for the cell will be taken from the top-left cell."),(0,o.kt)("p",null,"A range can be created with ",(0,o.kt)("inlineCode",{parentName:"p"},"decode_range")," or specified manually:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'worksheet["!merges"].push({\n  s: { r: 2, c: 1 }, // s ("start"): c = 1 r = 2 -> "B3"\n  e: { r: 3, c: 4 }  // e ("end"):   c = 4 r = 3 -> "E4"\n});\n')),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"This approach does not verify if two merged ranges intersect.")))}h.isMDXComponent=!0}}]);