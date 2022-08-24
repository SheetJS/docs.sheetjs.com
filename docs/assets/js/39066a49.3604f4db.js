"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1414],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,a=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),u=s,h=m["".concat(o,".").concat(u)]||m[u]||d[u]||a;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function u(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:s,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9628:(e,t,n)=>{n.d(t,{Z:()=>r});const r="0.18.10"},7705:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=n(7462),s=(n(7294),n(3905)),a=n(9628);const i={pagination_prev:"getting-started/index",pagination_next:"getting-started/example",sidebar_position:1,sidebar_custom_props:{summary:"Classic pages with simple <script> tags"}},l="Standalone Browser Scripts",o={unversionedId:"getting-started/installation/standalone",id:"getting-started/installation/standalone",title:"Standalone Browser Scripts",description:"Each standalone release script is available at .",source:"@site/docs/02-getting-started/01-installation/01-standalone.mdx",sourceDirName:"02-getting-started/01-installation",slug:"/getting-started/installation/standalone",permalink:"/docs/getting-started/installation/standalone",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{pagination_prev:"getting-started/index",pagination_next:"getting-started/example",sidebar_position:1,sidebar_custom_props:{summary:"Classic pages with simple <script> tags"}},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/getting-started/"},next:{title:"Tutorial",permalink:"/docs/getting-started/example"}},p={},c=[{value:"Browser Scripts",id:"browser-scripts",level:2},{value:"Internet Explorer and Older Browsers",id:"internet-explorer-and-older-browsers",level:3},{value:"Web Workers",id:"web-workers",level:3},{value:"ECMAScript Module Imports in a SCRIPT TAG",id:"ecmascript-module-imports-in-a-script-tag",level:2},{value:"Bower",id:"bower",level:2}],d={toc:c};function m(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"standalone-browser-scripts"},"Standalone Browser Scripts"),(0,s.kt)("p",null,"Each standalone release script is available at ",(0,s.kt)("a",{parentName:"p",href:"https://cdn.sheetjs.com/"},"https://cdn.sheetjs.com/"),"."),(0,s.kt)("div",null,"The current version is ",a.Z," and can be referenced as follows:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},"\x3c!-- use version "+a.Z+' --\x3e\n<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/dist/xlsx.full.min.js"><\/script>')),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"latest")," tag references the latest version and updates with each release:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- use the latest version --\x3e\n<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"><\/script>\n')),(0,s.kt)("admonition",{type:"warning"},(0,s.kt)("p",{parentName:"admonition"},"A number of CDNs host older versions of the SheetJS libraries.  Due to syncing\nissues, they are generally out of date."),(0,s.kt)("p",{parentName:"admonition"},"They are known CDN bugs."),(0,s.kt)("p",{parentName:"admonition"},(0,s.kt)("a",{parentName:"p",href:"https://cdn.sheetjs.com/"},"https://cdn.sheetjs.com/")," is the authoritative source for SheetJS modules.")),(0,s.kt)("h2",{id:"browser-scripts"},"Browser Scripts"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"xlsx.full.min.js")," is the complete standalone script.  It includes support for\nreading and writing many spreadsheet formats."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},"\x3c!-- use xlsx.full.min.js from version "+a.Z+' --\x3e\n<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/dist/xlsx.full.min.js"><\/script>')),(0,s.kt)("p",null,"A slimmer build is generated at ",(0,s.kt)("inlineCode",{parentName:"p"},"dist/xlsx.mini.min.js"),". Compared to full build:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"codepage library skipped (no support for XLS encodings)"),(0,s.kt)("li",{parentName:"ul"},"no support for XLSB / XLS / Lotus 1-2-3 / SpreadsheetML 2003 / Numbers"),(0,s.kt)("li",{parentName:"ul"},"node stream utils removed")),(0,s.kt)("details",null,(0,s.kt)("summary",null,(0,s.kt)("b",null,"How to integrate the mini build")," (click to show)"),(0,s.kt)("p",null,"Replace references to ",(0,s.kt)("inlineCode",{parentName:"p"},"xlsx.full.min.js")," with ",(0,s.kt)("inlineCode",{parentName:"p"},"xlsx.mini.min.js"),".  Starting from\nscratch, a single script tag should be added at the top of the HTML page:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},"\x3c!-- use xlsx.mini.min.js from version "+a.Z+' --\x3e\n<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/dist/xlsx.mini.min.js"><\/script>'))),(0,s.kt)("h3",{id:"internet-explorer-and-older-browsers"},"Internet Explorer and Older Browsers"),(0,s.kt)("p",null,'For broad compatibility with JavaScript engines, the library is written using\nECMAScript 3 language dialect.  A "shim" script provides implementations of\nfunctions for older browsers and environments.'),(0,s.kt)("div",null,"Due to SSL compatibility issues, older versions of IE will not be able to use the CDN scripts directly.  They should be downloaded and saved to a public directory in the site:",(0,s.kt)("ul",null,(0,s.kt)("li",null,"Standalone: ",(0,s.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-"+a.Z+"/package/dist/xlsx.mini.min.js"},"https://cdn.sheetjs.com/xlsx-",a.Z,"/package/dist/xlsx.mini.min.js")),(0,s.kt)("li",null,"Shim: ",(0,s.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-"+a.Z+"/package/dist/shim.min.js"},"https://cdn.sheetjs.com/xlsx-",a.Z,"/package/dist/shim.min.js")))),(0,s.kt)("p",null,"Add a ",(0,s.kt)("inlineCode",{parentName:"p"},"script")," reference to the shim before the script tag that loads ",(0,s.kt)("inlineCode",{parentName:"p"},"xlsx.js"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- add the shim first --\x3e\n<script type="text/javascript" src="shim.min.js"><\/script>\n\x3c!-- after the shim is referenced, add the library --\x3e\n<script type="text/javascript" src="xlsx.full.min.js"><\/script>\n')),(0,s.kt)("h3",{id:"web-workers"},"Web Workers"),(0,s.kt)("p",null,"The standalone scripts can be loaded using ",(0,s.kt)("inlineCode",{parentName:"p"},"importScripts")," at the top of the\nworker scripts:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'importScripts("https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/dist/shim.min.js");\nimportScripts("https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/dist/xlsx.full.min.js");')),(0,s.kt)("h2",{id:"ecmascript-module-imports-in-a-script-tag"},"ECMAScript Module Imports in a SCRIPT TAG"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"This section refers to imports using ",(0,s.kt)("inlineCode",{parentName:"p"},'script type="module"'),".  For imports in\nmodern projects using Webpack or React or Angular or Vue, the installation is\ndescribed ",(0,s.kt)("a",{parentName:"p",href:"./frameworks"},"in the next section"),".")),(0,s.kt)("p",null,"The ECMAScript Module build is saved to ",(0,s.kt)("inlineCode",{parentName:"p"},"xlsx.mjs")," and can be directly added to\na page with a ",(0,s.kt)("inlineCode",{parentName:"p"},"script")," tag using ",(0,s.kt)("inlineCode",{parentName:"p"},'type="module"'),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<script type="module">\nimport { read, writeFileXLSX } from "https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/xlsx.mjs";\n<\/script>')),(0,s.kt)("p",null,"If XLS support is required, ",(0,s.kt)("inlineCode",{parentName:"p"},"cpexcel.full.mjs")," must be manually imported:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<script type="module">\n/* load the codepage support library for extended support with older formats  */\nimport { set_cptable } from "https://cdn.sheetjs.com/xlsx-'+a.Z+"/package/xlsx.mjs\";\nimport * as cptable from 'https://cdn.sheetjs.com/xlsx-"+a.Z+"/package/dist/cpexcel.full.mjs';\nset_cptable(cptable);\n<\/script>")),(0,s.kt)("p",null,"Dynamic imports with ",(0,s.kt)("inlineCode",{parentName:"p"},"import()")," can be used in data export scenarios.  This\nexample will download the library only when the export button is pressed:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'<button id="xport">Export</button>\n<script type="module">\nxport.addEventListener("click", async() => {\n\n  /* dynamically import the library in the event listener */\n  // highlight-next-line\n  const XLSX = await import("https://cdn.sheetjs.com/xlsx-'+a.Z+'/package/xlsx.mjs");\n\n  const wb = XLSX.utils.book_new();\n  const ws = XLSX.utils.aoa_to_sheet([["a","b","c"],[1,2,3]]);\n  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\n  XLSX.writeFile(wb, "SheetJSESMTest.xlsx");\n});\n<\/script>')),(0,s.kt)("h2",{id:"bower"},"Bower"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"Bower is deprecated and the maintainers recommend using other tools.")),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://bower.io/"},"Bower")," plays nice with the CDN tarballs:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx bower install https://cdn.sheetjs.com/xlsx-"+a.Z+"/xlsx-"+a.Z+".tgz")),(0,s.kt)("p",null,"Bower will place the standalone scripts in ",(0,s.kt)("inlineCode",{parentName:"p"},"bower_components/js-xlsx/dist/")))}m.isMDXComponent=!0}}]);