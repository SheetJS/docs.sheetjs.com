"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[53],{1109:function(e){e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"SheetJS CE","href":"/docs/","docId":"index"},{"type":"category","label":"Installation","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Standalone Browser Scripts","href":"/docs/installation/standalone","customProps":{"summary":"Classic pages with simple <script> tags"},"docId":"installation/standalone"},{"type":"link","label":"Frameworks and Bundlers","href":"/docs/installation/frameworks","customProps":{"summary":"Angular, React, VueJS, Webpack, etc."},"docId":"installation/frameworks"},{"type":"link","label":"Deno","href":"/docs/installation/deno","customProps":{"summary":"Import ECMAScript Modules and TypeScript definitions"},"docId":"installation/deno"},{"type":"link","label":"NodeJS","href":"/docs/installation/nodejs","customProps":{"summary":"Server-side and other frameworks using NodeJS modules"},"docId":"installation/nodejs"},{"type":"link","label":"ExtendScript","href":"/docs/installation/extendscript","customProps":{"summary":"Photoshop, InDesign, and other Creative Cloud apps"},"docId":"installation/extendscript"},{"type":"link","label":"AMD","href":"/docs/installation/amd","customProps":{"summary":"NetSuite, SAP UI5, RequireJS"},"docId":"installation/amd"}],"href":"/docs/installation/"},{"type":"link","label":"Complete Example","href":"/docs/example","docId":"example"},{"type":"category","label":"Getting Started","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Roadmap","href":"/docs/getting-started/roadmap","docId":"getting-started/roadmap"},{"type":"link","label":"Zen of SheetJS","href":"/docs/getting-started/zen","docId":"getting-started/zen"},{"type":"category","label":"Demos","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Google Sheets","href":"/docs/getting-started/demos/gsheet","docId":"getting-started/demos/gsheet"},{"type":"link","label":"Adobe Apps","href":"/docs/getting-started/demos/extendscript","docId":"getting-started/demos/extendscript"},{"type":"link","label":"Excel JavaScript API","href":"/docs/getting-started/demos/excel","docId":"getting-started/demos/excel"},{"type":"link","label":"NetSuite","href":"/docs/getting-started/demos/netsuite","docId":"getting-started/demos/netsuite"}],"href":"/docs/getting-started/demos/"}]},{"type":"link","label":"Interface Summary","href":"/docs/interface","docId":"interface"},{"type":"category","label":"Common Use Cases","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Data Import","href":"/docs/solutions/input","docId":"solutions/input"},{"type":"link","label":"Data Processing","href":"/docs/solutions/processing","docId":"solutions/processing"},{"type":"link","label":"Data Export","href":"/docs/solutions/output","docId":"solutions/output"}]},{"type":"category","label":"Common Spreadsheet Format","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Addresses and Ranges","href":"/docs/csf/general","docId":"csf/general"},{"type":"link","label":"Cell Object","href":"/docs/csf/cell","docId":"csf/cell"},{"type":"link","label":"Sheet Objects","href":"/docs/csf/sheet","docId":"csf/sheet"},{"type":"link","label":"Workbook Object","href":"/docs/csf/book","docId":"csf/book"},{"type":"category","label":"Spreadsheet Features","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Formulae","href":"/docs/csf/features/formulae","docId":"csf/features/formulae"},{"type":"link","label":"Hyperlinks","href":"/docs/csf/features/hyperlinks","docId":"csf/features/hyperlinks"},{"type":"link","label":"Dates and Times","href":"/docs/csf/features/dates","docId":"csf/features/dates"}],"href":"/docs/csf/features/"}]},{"type":"category","label":"API Functions","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Reading Files","href":"/docs/api/parse-options","docId":"api/parse-options"},{"type":"link","label":"Writing Files","href":"/docs/api/write-options","docId":"api/write-options"},{"type":"link","label":"Utility Functions","href":"/docs/api/utilities","docId":"api/utilities"}]},{"type":"category","label":"Miscellany","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"File Formats","href":"/docs/miscellany/formats","docId":"miscellany/formats"},{"type":"link","label":"Testing","href":"/docs/miscellany/testing","docId":"miscellany/testing"},{"type":"link","label":"Contributing","href":"/docs/miscellany/contributing","docId":"miscellany/contributing"},{"type":"link","label":"License","href":"/docs/miscellany/license","docId":"miscellany/license"},{"type":"link","label":"References","href":"/docs/miscellany/references","docId":"miscellany/references"}]}]},"docs":{"api/parse-options":{"id":"api/parse-options","title":"Reading Files","description":"XLSX.read(data, read_opts) attempts to parse data.","sidebar":"tutorialSidebar"},"api/utilities":{"id":"api/utilities","title":"Utility Functions","description":"The sheetto* functions accept a worksheet and an optional options object.","sidebar":"tutorialSidebar"},"api/write-options":{"id":"api/write-options","title":"Writing Files","description":"XLSX.write(wb, write_opts) attempts to write the workbook wb","sidebar":"tutorialSidebar"},"csf/book":{"id":"csf/book","title":"Workbook Object","description":"workbook.SheetNames is an ordered list of the sheets in the workbook","sidebar":"tutorialSidebar"},"csf/cell":{"id":"csf/cell","title":"Cell Object","description":"Cell objects are plain JS objects with keys and values following the convention:","sidebar":"tutorialSidebar"},"csf/features/dates":{"id":"csf/features/dates","title":"Dates and Times","description":"Lotus 1-2-3, Excel, and other spreadsheet software do not have a true concept","sidebar":"tutorialSidebar"},"csf/features/formulae":{"id":"csf/features/formulae","title":"Formulae","description":"Formulae File Format Support (click to show)","sidebar":"tutorialSidebar"},"csf/features/hyperlinks":{"id":"csf/features/hyperlinks","title":"Hyperlinks","description":"Format Support (click to show)","sidebar":"tutorialSidebar"},"csf/features/index":{"id":"csf/features/index","title":"Spreadsheet Features","description":"Even for basic features like date storage, the official Excel formats store the","sidebar":"tutorialSidebar"},"csf/general":{"id":"csf/general","title":"Addresses and Ranges","description":"The \\"Common Spreadsheet Format\\" (CSF) is the object model used by SheetJS.","sidebar":"tutorialSidebar"},"csf/sheet":{"id":"csf/sheet","title":"Sheet Objects","description":"Excel supports 4 different types of \\"sheets\\":","sidebar":"tutorialSidebar"},"example":{"id":"example","title":"Complete Example","description":"SheetJS presents a simple JS interface that works with \\"Array of Arrays\\" and","sidebar":"tutorialSidebar"},"getting-started/demos/excel":{"id":"getting-started/demos/excel","title":"Excel JavaScript API","description":"Office 2016 introduced a JavaScript API for interacting with the application.","sidebar":"tutorialSidebar"},"getting-started/demos/extendscript":{"id":"getting-started/demos/extendscript","title":"Adobe Apps","description":"Photoshop, InDesign and other Adobe Creative Suite applications offer extension","sidebar":"tutorialSidebar"},"getting-started/demos/gsheet":{"id":"getting-started/demos/gsheet","title":"Google Sheets","description":"","sidebar":"tutorialSidebar"},"getting-started/demos/index":{"id":"getting-started/demos/index","title":"Demo Projects","description":"The demo projects include small runnable examples and short explainers.","sidebar":"tutorialSidebar"},"getting-started/demos/netsuite":{"id":"getting-started/demos/netsuite","title":"NetSuite","description":"This demo discusses the key SheetJS operations.  Familiarity with SuiteScript 2","sidebar":"tutorialSidebar"},"getting-started/roadmap":{"id":"getting-started/roadmap","title":"Roadmap","description":"Most scenarios involving spreadsheets and data can be divided into 5 parts:","sidebar":"tutorialSidebar"},"getting-started/zen":{"id":"getting-started/zen","title":"Zen of SheetJS","description":"SheetJS design and development is guided by a few key principles.","sidebar":"tutorialSidebar"},"index":{"id":"index","title":"SheetJS CE","description":"License","sidebar":"tutorialSidebar"},"installation/amd":{"id":"installation/amd","title":"AMD","description":"Each standalone release script is available at .","sidebar":"tutorialSidebar"},"installation/deno":{"id":"installation/deno","title":"Deno","description":"Each standalone release script is available at .","sidebar":"tutorialSidebar"},"installation/extendscript":{"id":"installation/extendscript","title":"ExtendScript","description":"Each standalone release script is available at .","sidebar":"tutorialSidebar"},"installation/frameworks":{"id":"installation/frameworks","title":"Frameworks and Bundlers","description":"Each standalone release package is available at .  The","sidebar":"tutorialSidebar"},"installation/index":{"id":"installation/index","title":"Installation","description":"is the primary software distribution site.  Please","sidebar":"tutorialSidebar"},"installation/nodejs":{"id":"installation/nodejs","title":"NodeJS","description":"Tarballs are available on .","sidebar":"tutorialSidebar"},"installation/standalone":{"id":"installation/standalone","title":"Standalone Browser Scripts","description":"Each standalone release script is available at .","sidebar":"tutorialSidebar"},"interface":{"id":"interface","title":"Interface Summary","description":"XLSX is the exposed variable in the browser and the exported node variable","sidebar":"tutorialSidebar"},"miscellany/contributing":{"id":"miscellany/contributing","title":"Contributing","description":"Due to the precarious nature of the Open Specifications Promise, it is very","sidebar":"tutorialSidebar"},"miscellany/formats":{"id":"miscellany/formats","title":"File Formats","description":"circo graph of format support","sidebar":"tutorialSidebar"},"miscellany/license":{"id":"miscellany/license","title":"License","description":"SheetJS Community Edition is licensed under the \\"Apache 2.0 License\\". All rights","sidebar":"tutorialSidebar"},"miscellany/references":{"id":"miscellany/references","title":"References","description":"Some of our original research is documented at","sidebar":"tutorialSidebar"},"miscellany/testing":{"id":"miscellany/testing","title":"Testing","description":"make test will run the node-based tests.  By default it runs tests on files in","sidebar":"tutorialSidebar"},"solutions/input":{"id":"solutions/input","title":"Data Import","description":"Parsing Workbooks","sidebar":"tutorialSidebar"},"solutions/output":{"id":"solutions/output","title":"Data Export","description":"Writing Workbooks","sidebar":"tutorialSidebar"},"solutions/processing":{"id":"solutions/processing","title":"Data Processing","description":"The \\"Common Spreadsheet Format\\" is a simple object","sidebar":"tutorialSidebar"}}}')}}]);