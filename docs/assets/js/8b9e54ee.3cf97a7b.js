"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[281],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,k=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return n?r.createElement(k,o(o({ref:t},d),{},{components:n})):r.createElement(k,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5646:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return c}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:5},s="Interface Summary",p={unversionedId:"interface",id:"interface",title:"Interface Summary",description:"XLSX is the exposed variable in the browser and the exported node variable",source:"@site/docs/05-interface.md",sourceDirName:".",slug:"/interface",permalink:"/docs/interface",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Google Sheets",permalink:"/docs/getting-started/demos/gsheet"},next:{title:"Data Import",permalink:"/docs/solutions/input"}},d={},c=[{value:"Parsing functions",id:"parsing-functions",level:2},{value:"Writing functions",id:"writing-functions",level:2},{value:"Utilities",id:"utilities",level:2}],u={toc:c};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"interface-summary"},"Interface Summary"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX")," is the exposed variable in the browser and the exported node variable"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.version")," is the version of the library (added by the build script)."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.SSF")," is an embedded version of the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/SheetJS/sheetjs/tree/master/packages/ssf"},"format library"),"."),(0,i.kt)("h2",{id:"parsing-functions"},"Parsing functions"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.read(data, read_opts)")," attempts to parse ",(0,i.kt)("inlineCode",{parentName:"p"},"data"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.readFile(filename, read_opts)")," attempts to read ",(0,i.kt)("inlineCode",{parentName:"p"},"filename")," and parse."),(0,i.kt)("p",null,"Parse options are described in the ",(0,i.kt)("a",{parentName:"p",href:"./api/parse-options"},"Parsing Options")," section."),(0,i.kt)("h2",{id:"writing-functions"},"Writing functions"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.write(wb, write_opts)")," attempts to write the workbook ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile(wb, filename, write_opts)")," attempts to write ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"filename"),".\nIn browser-based environments, it will attempt to force a client-side download."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.writeFileAsync(filename, wb, o, cb)")," attempts to write ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"filename"),".\nIf ",(0,i.kt)("inlineCode",{parentName:"p"},"o")," is omitted, the writer will use the third argument as the callback."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.stream")," contains a set of streaming write functions."),(0,i.kt)("p",null,"Write options are described in the ",(0,i.kt)("a",{parentName:"p",href:"./api/write-options"},"Writing Options")," section."),(0,i.kt)("h2",{id:"utilities"},"Utilities"),(0,i.kt)("p",null,"Utilities are available in the ",(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.utils")," object and are described in the\n",(0,i.kt)("a",{parentName:"p",href:"./api/utilities"},"Utility Functions")," section:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Constructing:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"book_new")," creates an empty workbook"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"book_append_sheet")," adds a worksheet to a workbook")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Importing:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"aoa_to_sheet")," converts an array of arrays of JS data to a worksheet."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"json_to_sheet")," converts an array of JS objects to a worksheet."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"table_to_sheet")," converts a DOM TABLE element to a worksheet."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_add_aoa")," adds an array of arrays of JS data to an existing worksheet."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_add_json")," adds an array of JS objects to an existing worksheet.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Exporting:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_to_json")," converts a worksheet object to an array of JSON objects."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_to_csv")," generates delimiter-separated-values output."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_to_txt")," generates UTF16 formatted text."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_to_html")," generates HTML output."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sheet_to_formulae")," generates a list of the formulae (with value fallbacks).")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Cell and cell address manipulation:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"format_cell")," generates the text value for a cell (using number formats)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"encode_row / decode_row")," converts between 0-indexed rows and 1-indexed rows."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"encode_col / decode_col")," converts between 0-indexed columns and column names."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"encode_cell / decode_cell")," converts cell addresses."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"encode_range / decode_range")," converts cell ranges.")))}m.isMDXComponent=!0}}]);