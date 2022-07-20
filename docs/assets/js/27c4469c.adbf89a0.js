"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1976],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),h=a,m=d["".concat(s,".").concat(h)]||d[h]||c[h]||l;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7073:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(9496),a=n(1626),l="tabItem_XTJJ";function i(e){var t=e.children,n=e.hidden,i=e.className;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,i),hidden:n},t)}},7632:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(2848),a=n(9496),l=n(8745),i=n(2586),o=n(1060),s=n(2876),u=n(1626),p="tabList_ECWZ",c="tabItem_T58J";function d(e){var t,n,l,d=e.lazy,h=e.block,m=e.defaultValue,f=e.values,k=e.groupId,b=e.className,v=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=f?f:v.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),w=(0,i.l)(g,(function(e,t){return e.value===t.value}));if(w.length>0)throw new Error('Docusaurus error: Duplicate values "'+w.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var x=null===m?m:null!=(t=null!=m?m:null==(n=v.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(l=v[0])?void 0:l.props.value;if(null!==x&&!g.some((function(e){return e.value===x})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+x+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var y=(0,o.U)(),S=y.tabGroupChoices,N=y.setTabGroupChoices,C=(0,a.useState)(x),F=C[0],P=C[1],A=[],j=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=k){var E=S[k];null!=E&&E!==F&&g.some((function(e){return e.value===E}))&&P(E)}var T=function(e){var t=e.currentTarget,n=A.indexOf(t),r=g[n].value;r!==F&&(j(t),P(r),null!=k&&N(k,r))},O=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=A.indexOf(e.currentTarget)+1;n=A[r]||A[0];break;case"ArrowLeft":var a=A.indexOf(e.currentTarget)-1;n=A[a]||A[A.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,u.Z)("tabs-container",p)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":h},b)},g.map((function(e){var t=e.value,n=e.label,l=e.attributes;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:F===t?0:-1,"aria-selected":F===t,key:t,ref:function(e){return A.push(e)},onKeyDown:O,onFocus:T,onClick:T},l,{className:(0,u.Z)("tabs__item",c,null==l?void 0:l.className,{"tabs__item--active":F===t})}),null!=n?n:t)}))),d?(0,a.cloneElement)(v.filter((function(e){return e.props.value===F}))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},v.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==F})}))))}function h(e){var t=(0,l.Z)();return a.createElement(d,(0,r.Z)({key:String(t)},e))}},4978:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var r=n(2848),a=n(9213),l=(n(9496),n(9613)),i=(n(7632),n(7073),["components"]),o={sidebar_position:3},s="Adobe Apps",u={unversionedId:"getting-started/demos/extendscript",id:"getting-started/demos/extendscript",title:"Adobe Apps",description:"Photoshop, InDesign and other Adobe Creative Suite applications offer extension",source:"@site/docs/04-getting-started/03-demos/02-extendscript.md",sourceDirName:"04-getting-started/03-demos",slug:"/getting-started/demos/extendscript",permalink:"/docs/getting-started/demos/extendscript",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Google Sheets",permalink:"/docs/getting-started/demos/gsheet"},next:{title:"Excel JavaScript API",permalink:"/docs/getting-started/demos/excel"}},p={},c=[{value:"ExtendScript Scripts",id:"extendscript-scripts",level:2},{value:"Reading Files",id:"reading-files",level:3},{value:"Writing Files",id:"writing-files",level:3},{value:"CEP",id:"cep",level:2},{value:"UXP",id:"uxp",level:2}],d={toc:c};function h(e){var t=e.components,n=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"adobe-apps"},"Adobe Apps"),(0,l.kt)("p",null,"Photoshop, InDesign and other Adobe Creative Suite applications offer extension\nsupport.  Over the years there have been a few different JavaScript platforms:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'"ExtendScript": This uses an old JavaScript dialect but is supported in older\nversions of Creative Suite and Creative Cloud.')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'"CEP": This was recommended in CS6 but eventually deprecated.')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'"UXP": This is the current Adobe recommendation for new CC extensions.'))),(0,l.kt)("p",null,"This demo intends to cover the SheetJS-related parts.  General setup as well as\ngeneral Adobe considerations are not covered here.  A basic familiarity with\nextension development is assumed."),(0,l.kt)("h2",{id:"extendscript-scripts"},"ExtendScript Scripts"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"../../installation/extendscript"},"Installation is straightforward:")," download a\nscript and move it to your project directory."),(0,l.kt)("h3",{id:"reading-files"},"Reading Files"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"XLSX.readFile")," can directly accept an absolute URI:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'var workbook = XLSX.readFile("~/Documents/test.xlsx");\n')),(0,l.kt)("p",null,"The path can be user-configurable using ",(0,l.kt)("inlineCode",{parentName:"p"},"File.openDialog"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'/* Show File Picker */\nvar thisFile = File.openDialog("Select a spreadsheet");\nif(!thisFile) { alert("File not found!"); return; }\n\n/* Read file from disk */\nvar workbook = XLSX.readFile(thisFile.absoluteURI);\n')),(0,l.kt)("details",{open:!0},(0,l.kt)("summary",null,(0,l.kt)("b",null,"Complete Example")," (click to hide)"),(0,l.kt)("p",null,"In this example, the script will show a dialog to select a file.  After reading\nthe file, the workbook Author property will be extracted and the Photoshop doc\nauthor (",(0,l.kt)("inlineCode",{parentName:"p"},"activeDocument.info.author"),") will be changed accordingly."),(0,l.kt)("p",null,"This demo was verified in Photoshop CS6 64-bit on Windows 10."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'#target photoshop\n#include "xlsx.extendscript.js";\n\nfunction main_parse() {\n  /* Show File Picker */\n  var thisFile = File.openDialog("Select a spreadsheet");\n  if(!thisFile) { alert("File not found!"); return; }\n\n  /* Read file from disk */\n  var workbook = XLSX.readFile(thisFile.absoluteURI);\n\n  /* Get Workbook Author */\n  var Props = workbook.Props; if(!Props) { alert("Missing Author!"); return; }\n  var Author = Props.Author; if(!Author) { alert("Missing Author!"); return; }\n\n  /* Change Document Author to Workbook Author */\n  var info = activeDocument.info;\n  alert("Changing Author from |" + info.author + "| to |" + Author + "|");\n  info.author = Author;\n}\n\nmain_parse();\n')),(0,l.kt)("p",null,"0) Download the ",(0,l.kt)("a",{parentName:"p",href:"pathname:///files/SheetJS.xlsb"},"test workbook"),"."),(0,l.kt)("p",null,"1) Download the following scripts:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.extendscript.js"},(0,l.kt)("inlineCode",{parentName:"a"},"xlsx.extendscript.js"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"pathname:///live/parse.jsx"},(0,l.kt)("inlineCode",{parentName:"a"},"parse.jsx")))),(0,l.kt)("p",null,"and place in the scripts directory.  For CS6 Windows 10 the path is typically"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"C:\\Program Files\\Adobe\\Adobe Photoshop CS6 (64 Bit)\\Presets\\Scripts")),(0,l.kt)("p",null,"2) Restart Photoshop and open a file (or create a new one)"),(0,l.kt)("p",null,"3) File > Scripts > parse and select the test workbook"),(0,l.kt)("p",null,"4) An alert will confirm that the file was read and the author will be changed:"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"/files/psparse.png",alt:'"Changing Author" popup'})),(0,l.kt)("p",null,"5) File > File Info... should show the updated Author field!")),(0,l.kt)("h3",{id:"writing-files"},"Writing Files"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile")," can directly accept an absolute URI:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'XLSX.writeFile(workbook, "~/Documents/test.xlsx");\n')),(0,l.kt)("p",null,"The path can be user-configurable using ",(0,l.kt)("inlineCode",{parentName:"p"},"File.saveDialog"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'/* Show File Picker */\nvar thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");\nif(!thisFile) { alert("File not found!"); return; }\n\n/* Write file to disk */\nXLSX.writeFile(workbook, thisFile.absoluteURI);\n')),(0,l.kt)("details",{open:!0},(0,l.kt)("summary",null,(0,l.kt)("b",null,"Complete Example")," (click to hide)"),(0,l.kt)("p",null,'In this example, the script will show a dialog to select an output file.  Once\nselected, the library will create a new workbook with one worksheet.  Cell A1\nwill be "Author" and cell B1 will be the active Photoshop document Author.\nThe PS author is available as ',(0,l.kt)("inlineCode",{parentName:"p"},"activeDocument.info.author"),"."),(0,l.kt)("p",null,"This demo was verified in Photoshop CS6 64-bit on Windows 10."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'#target photoshop\n#include "xlsx.extendscript.js";\n\nfunction main_write() {\n  /* Show File Picker */\n  var thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");\n  if(!thisFile) { alert("File not found!"); return; }\n\n  /* Create new Worksheet */\n  var ws = XLSX.utils.aoa_to_sheet([\n    ["Author", activeDocument.info.author]\n  ]);\n\n  /* Create new Workbook and add worksheet */\n  var wb = XLSX.utils.book_new();\n  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\n\n  /* Write file to disk */\n  XLSX.writeFile(wb, thisFile.absoluteURI);\n  alert("Created File " + thisFile.absoluteURI);\n}\n\nmain_write();\n')),(0,l.kt)("p",null,"1) Download the following scripts:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.extendscript.js"},(0,l.kt)("inlineCode",{parentName:"a"},"xlsx.extendscript.js"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"pathname:///live/write.jsx"},(0,l.kt)("inlineCode",{parentName:"a"},"write.jsx")))),(0,l.kt)("p",null,"and place in the scripts directory.  For CS6 Windows 10 the path is typically"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"C:\\Program Files\\Adobe\\Adobe Photoshop CS6 (64 Bit)\\Presets\\Scripts")),(0,l.kt)("p",null,"2) Restart Photoshop and open a file (or create a new one)"),(0,l.kt)("p",null,"3) File > File Info ... and confirm there is an Author. If not, set to ",(0,l.kt)("inlineCode",{parentName:"p"},"SheetJS")),(0,l.kt)("p",null,"4) File > Scripts > write and use the popup to select the Documents folder.\nEnter ",(0,l.kt)("inlineCode",{parentName:"p"},"SheetJSPSTest.xlsx"),' and hit "Save"'),(0,l.kt)("p",null,"4) An alert will confirm that the file was created:"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"/files/pswrite.png",alt:'"Created File" popup'})),(0,l.kt)("p",null,"5) Open the generated ",(0,l.kt)("inlineCode",{parentName:"p"},"SheetJSPSTest.xlsx")," file and compare to Photoshop author")),(0,l.kt)("h2",{id:"cep"},"CEP"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"../../installation/standalone"},"The standalone scripts")," can be added to CEP\nextension HTML"),(0,l.kt)("h2",{id:"uxp"},"UXP"),(0,l.kt)("p",null,"UXP officially recommends ",(0,l.kt)("inlineCode",{parentName:"p"},"require")," and NodeJS Modules for third party support."),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"../../installation/frameworks"},'Use the "Frameworks" instructions to download.')))}h.isMDXComponent=!0}}]);