"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5878],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,f=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(f,l(l({ref:t},d),{},{components:n})):a.createElement(f,l({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9628:(e,t,n)=>{n.d(t,{Z:()=>a});const a="0.18.10"},7329:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>d});var a=n(7462),r=(n(7294),n(3905)),i=n(9628);const l={pagination_prev:"getting-started/index",pagination_next:"getting-started/example",sidebar_position:6,sidebar_custom_props:{summary:"NetSuite, SAP UI5, RequireJS"}},o="AMD (define)",s={unversionedId:"getting-started/installation/amd",id:"getting-started/installation/amd",title:"AMD (define)",description:"Each standalone release script is available at .",source:"@site/docs/02-getting-started/01-installation/06-amd.md",sourceDirName:"02-getting-started/01-installation",slug:"/getting-started/installation/amd",permalink:"/docs/getting-started/installation/amd",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{pagination_prev:"getting-started/index",pagination_next:"getting-started/example",sidebar_position:6,sidebar_custom_props:{summary:"NetSuite, SAP UI5, RequireJS"}},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/getting-started/"},next:{title:"Tutorial",permalink:"/docs/getting-started/example"}},p={},d=[{value:"NetSuite",id:"netsuite",level:2},{value:"SAP UI5",id:"sap-ui5",level:2},{value:"RequireJS",id:"requirejs",level:2},{value:"Aliases",id:"aliases",level:4}],c={toc:d};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"amd-define"},"AMD (define)"),(0,r.kt)("p",null,"Each standalone release script is available at ",(0,r.kt)("a",{parentName:"p",href:"https://cdn.sheetjs.com/"},"https://cdn.sheetjs.com/"),"."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.full.min.js")," supports AMD with name ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx")," out of the box."),(0,r.kt)("div",null,(0,r.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-"+i.Z+"/package/dist/xlsx.full.min.js"},"https://cdn.sheetjs.com/xlsx-",i.Z,"/package/dist/xlsx.full.min.js")," is the URL for ",i.Z),(0,r.kt)("br",null),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"When referencing by file name, AMD loaders typically omit the file extension."),(0,r.kt)("p",{parentName:"admonition"},"The actual file name is ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.full.min.js"),", but the examples will refer to the\nscript as ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.full.min"),".")),(0,r.kt)("h2",{id:"netsuite"},"NetSuite"),(0,r.kt)("p",null,"After downloading the script, it can be referenced directly in ",(0,r.kt)("inlineCode",{parentName:"p"},"define")," calls\nin SuiteScripts:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"define(['N/file', './xlsx.full.min'], function(file, XLSX) {\n  // ... use XLSX here\n})\n")),(0,r.kt)("p",null,"As explained in the ",(0,r.kt)("a",{parentName:"p",href:"../../demos/netsuite"},"NetSuite demo"),", module\naliases are created in config files referenced via ",(0,r.kt)("inlineCode",{parentName:"p"},"@NAmdConfig")," comments."),(0,r.kt)("h2",{id:"sap-ui5"},"SAP UI5"),(0,r.kt)("p",null,"After downloading the script, it can be uploaded to the UI5 project and loaded\nin the ",(0,r.kt)("inlineCode",{parentName:"p"},"sap.ui.define")," call:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'sap.ui.define([\n  /* ... other libraries ... */\n  "path/to/xlsx.full.min"\n], function(/* ... variables for the other libraries ... */, XLSX) {\n  // use XLSX here\n})\n')),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("a",{parentName:"p",href:"https://blogs.sap.com/2017/04/30/how-to-include-third-party-libraries-modules-in-sapui5/"},"SAP Website has a note about including third-party JS libraries."),"\nIt recommends copying and pasting JavaScript code."),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"Copy and pasting code does not work")," for SheetJS scripts as they contain\nUnicode characters that may be mangled.  The standalone script should be\ndownloaded and manually uploaded to the project.")),(0,r.kt)("h2",{id:"requirejs"},"RequireJS"),(0,r.kt)("p",null,"After downloading the script, it can be referenced directly in ",(0,r.kt)("inlineCode",{parentName:"p"},"require")," calls:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"require(['./xlsx.full.min'], function(XLSX) {\n  // ... use XLSX here\n});\n")),(0,r.kt)("h4",{id:"aliases"},"Aliases"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"requirejs.config")," function can define aliases through the ",(0,r.kt)("inlineCode",{parentName:"p"},"paths")," key:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"requirejs.config({\n  paths: {\n    xlsx: [ './xlsx.full.min' ]\n  }\n});\n")),(0,r.kt)("p",null,"Once that is set, app code can freely require ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"require(['xlsx'], function(XLSX) {\n  // ... use XLSX here\n});\n")))}u.isMDXComponent=!0}}]);