"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7032],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>u});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(r),u=o,m=d["".concat(l,".").concat(u)]||d[u]||f[u]||a;return r?n.createElement(m,i(i({ref:t},c),{},{components:r})):n.createElement(m,i({ref:t},c))}));function u(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},37:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:4,hide_table_of_contents:!0},i="Zen of SheetJS",s={unversionedId:"getting-started/zen",id:"getting-started/zen",title:"Zen of SheetJS",description:"SheetJS design and development is guided by a few key principles.",source:"@site/docs/02-getting-started/04-zen.md",sourceDirName:"02-getting-started",slug:"/getting-started/zen",permalink:"/docs/getting-started/zen",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,hide_table_of_contents:!0},sidebar:"tutorialSidebar",previous:{title:"Roadmap",permalink:"/docs/getting-started/roadmap"},next:{title:"Demo Projects",permalink:"/docs/demos/"}},l={},p=[{value:"Data processing should fit in any workflow",id:"data-processing-should-fit-in-any-workflow",level:3},{value:"JavaScript is a powerful language for data processing",id:"javascript-is-a-powerful-language-for-data-processing",level:3},{value:"File formats are implementation details",id:"file-formats-are-implementation-details",level:3}],c={toc:p};function f(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"zen-of-sheetjs"},"Zen of SheetJS"),(0,o.kt)("p",null,"SheetJS design and development is guided by a few key principles."),(0,o.kt)("h3",{id:"data-processing-should-fit-in-any-workflow"},"Data processing should fit in any workflow"),(0,o.kt)("p",null,"The library does not impose a separate lifecycle.  It fits nicely in websites\nand apps built using any framework.  The plain JS data objects play nice with\nWeb Workers and future APIs."),(0,o.kt)("h3",{id:"javascript-is-a-powerful-language-for-data-processing"},"JavaScript is a powerful language for data processing"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"../csf/general"},'"Common Spreadsheet Format"')," is a simple object\nrepresentation of the core concepts of a workbook.  The various functions in the\nlibrary provide low-level tools for working with the object."),(0,o.kt)("p",null,"For friendly JS processing, there are utility functions for converting parts of\na worksheet to/from an Array of Arrays.  The ",(0,o.kt)("a",{parentName:"p",href:"/docs/getting-started/example"},"Complete example"),"\ncombines powerful JS Array methods with a network request library to download\ndata, select the information we want and create a workbook file:"),(0,o.kt)("h3",{id:"file-formats-are-implementation-details"},"File formats are implementation details"),(0,o.kt)("p",null,'The parser covers a wide gamut of common spreadsheet file formats to ensure that\n"HTML-saved-as-XLS" files work as well as actual XLS or XLSX files.'),(0,o.kt)("p",null,"The writer supports a number of common output formats for broad compatibility\nwith the data ecosystem."),(0,o.kt)("p",null,"To the greatest extent possible, data processing code should not have to worry\nabout the specific file formats involved."))}f.isMDXComponent=!0}}]);