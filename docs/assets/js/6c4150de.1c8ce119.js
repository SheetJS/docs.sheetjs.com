"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3158],{9613:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return k}});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(n),k=a,m=d["".concat(s,".").concat(k)]||d[k]||u[k]||l;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3028:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return u}});var r=n(2848),a=n(9213),l=(n(9496),n(9613)),i=["components"],o={sidebar_position:2},s="Hyperlinks",p={unversionedId:"csf/features/hyperlinks",id:"csf/features/hyperlinks",title:"Hyperlinks",description:"Format Support (click to show)",source:"@site/docs/07-csf/07-features/02-hyperlinks.md",sourceDirName:"07-csf/07-features",slug:"/csf/features/hyperlinks",permalink:"/docs/csf/features/hyperlinks",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Formulae",permalink:"/docs/csf/features/formulae"},next:{title:"Dates and Times",permalink:"/docs/csf/features/dates"}},c={},u=[{value:"Remote Links",id:"remote-links",level:2},{value:"Local Links",id:"local-links",level:2},{value:"Internal Links",id:"internal-links",level:2},{value:"HTML",id:"html",level:2}],d={toc:u};function k(e){var t=e.components,n=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"hyperlinks"},"Hyperlinks"),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Format Support")," (click to show)"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Cell Hyperlinks"),": XLSX/M, XLSB, BIFF8 XLS, XLML, ODS, HTML"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Tooltips"),": XLSX/M, XLSB, BIFF8 XLS, XLML")),(0,l.kt)("p",null,"Hyperlinks are stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"l")," key of cell objects.  The ",(0,l.kt)("inlineCode",{parentName:"p"},"Target")," field of the\nhyperlink object is the target of the link, including the URI fragment. Tooltips\nare stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"Tooltip")," field and are displayed when hovering over the text."),(0,l.kt)("p",null,"For example, the following snippet creates a link from cell ",(0,l.kt)("inlineCode",{parentName:"p"},"A3")," to\n",(0,l.kt)("a",{parentName:"p",href:"https://sheetjs.com"},"https://sheetjs.com")," with the tip ",(0,l.kt)("inlineCode",{parentName:"p"},'"Find us @ SheetJS.com!"'),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["A1"].l = { Target: "https://sheetjs.com", Tooltip: "Find us @ SheetJS.com!" };\n')),(0,l.kt)("p",null,"Note that Excel does not automatically style hyperlinks.  They will be displayed\nusing default style. ",(0,l.kt)("a",{href:"https://sheetjs.com/pro"},"SheetJS Pro Basic"),"\nextends this export with support for hyperlink styling."),(0,l.kt)("h2",{id:"remote-links"},"Remote Links"),(0,l.kt)("p",null,"HTTP / HTTPS links can be used directly:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["A2"].l = { Target: "https://docs.sheetjs.com/docs/csf/features/hyperlinks" };\nws["A3"].l = { Target: "http://localhost:7262/yes_localhost_works" };\n')),(0,l.kt)("p",null,"Excel also supports ",(0,l.kt)("inlineCode",{parentName:"p"},"mailto")," email links with subject line:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["A4"].l = { Target: "mailto:ignored@dev.null" };\nws["A5"].l = { Target: "mailto:ignored@dev.null?subject=Test Subject" };\n')),(0,l.kt)("h2",{id:"local-links"},"Local Links"),(0,l.kt)("p",null,"Links to absolute paths should use the ",(0,l.kt)("inlineCode",{parentName:"p"},"file://")," URI scheme:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["B1"].l = { Target: "file:///SheetJS/t.xlsx" }; /* Link to /SheetJS/t.xlsx */\nws["B2"].l = { Target: "file:///c:/SheetJS.xlsx" }; /* Link to c:\\SheetJS.xlsx */\n')),(0,l.kt)("p",null,"Links to relative paths can be specified without a scheme:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["B3"].l = { Target: "SheetJS.xlsb" }; /* Link to SheetJS.xlsb */\nws["B4"].l = { Target: "../SheetJS.xlsm" }; /* Link to ../SheetJS.xlsm */\n')),(0,l.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"Relative Paths have undefined behavior in the SpreadsheetML 2003 format.  Excel\n2019 will treat a ",(0,l.kt)("inlineCode",{parentName:"p"},"..\\")," parent mark as two levels up."))),(0,l.kt)("h2",{id:"internal-links"},"Internal Links"),(0,l.kt)("p",null,'Links where the target is a cell or range or defined name in the same workbook\n("Internal Links") are marked with a leading hash character:'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws["C1"].l = { Target: "#E2" }; /* Link to cell E2 */\nws["C2"].l = { Target: "#Sheet2!E2" }; /* Link to cell E2 in sheet Sheet2 */\nws["C3"].l = { Target: "#SomeDefinedName" }; /* Link to Defined Name */\n')),(0,l.kt)("h2",{id:"html"},"HTML"),(0,l.kt)("p",null,"The HTML DOM parser will process ",(0,l.kt)("inlineCode",{parentName:"p"},"<a>")," links in the table:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'/* The live editor requires this function wrapper */\nfunction ExportHyperlink(props) {\n\n  /* Callback invoked when the button is clicked */\n  const xport = React.useCallback(() => {\n    /* Create worksheet from HTML DOM TABLE */\n    const table = document.getElementById("TableLink");\n    const wb = XLSX.utils.table_to_book(table);\n\n    /* Export to file (start a download) */\n    XLSX.writeFile(wb, "SheetJSHyperlink1.xlsx");\n  });\n\n  return (<>\n    <button onClick={xport}><b>Export XLSX!</b></button>\n    <table id="TableLink"><tbody><tr><td>\n      Do not click here, for it is link-less.\n    </td></tr><tr><td>\n      <a href="https://sheetjs.com">Click here for more info</a>\n    </td></tr></tbody></table>\n  </>);\n}\n')))}k.isMDXComponent=!0}}]);