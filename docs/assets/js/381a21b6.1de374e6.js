"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[578],{9613:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),h=p(n),u=r,c=h["".concat(s,".").concat(u)]||h[u]||m[u]||l;return n?a.createElement(c,i(i({ref:t},d),{},{components:n})):a.createElement(c,i({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6606:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return m}});var a=n(2848),r=n(9213),l=(n(9496),n(9613)),i=["components"],o={sidebar_position:7},s="Spreadsheet Features",p={unversionedId:"csf/features",id:"csf/features",title:"Spreadsheet Features",description:"Even for basic features like date storage, the official Excel formats store the",source:"@site/docs/07-csf/07-features.md",sourceDirName:"07-csf",slug:"/csf/features",permalink:"/docs/csf/features",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Workbook Object",permalink:"/docs/csf/book"},next:{title:"Reading Files",permalink:"/docs/api/parse-options"}},d={},m=[{value:"Formulae",id:"formulae",level:2},{value:"Single-Cell Formulae",id:"single-cell-formulae",level:3},{value:"Array Formulae",id:"array-formulae",level:3},{value:"Dynamic Arrays",id:"dynamic-arrays",level:3},{value:"Localization",id:"localization",level:3},{value:"Row and Column Properties",id:"row-and-column-properties",level:2},{value:"Number Formats",id:"number-formats",level:2},{value:"Hyperlinks",id:"hyperlinks",level:2},{value:"Cell Comments",id:"cell-comments",level:2},{value:"Sheet Visibility",id:"sheet-visibility",level:2},{value:"VBA and Macros",id:"vba-and-macros",level:2}],h={toc:m};function u(e){var t=e.components,n=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"spreadsheet-features"},"Spreadsheet Features"),(0,l.kt)("p",null,"Even for basic features like date storage, the official Excel formats store the\nsame content in different ways.  The parsers are expected to convert from the\nunderlying file format representation to the Common Spreadsheet Format.  Writers\nare expected to convert from CSF back to the underlying file format."),(0,l.kt)("h2",{id:"formulae"},"Formulae"),(0,l.kt)("p",null,"The A1-style formula string is stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"f")," field.  Even though different\nfile formats store the formulae in different ways, the formats are translated.\nEven though some formats store formulae with a leading equal sign, CSF formulae\ndo not start with ",(0,l.kt)("inlineCode",{parentName:"p"},"="),"."),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Formulae File Format Support")," (click to show)"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Storage Representation"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Formats"),(0,l.kt)("th",{parentName:"tr",align:"center"},"Read"),(0,l.kt)("th",{parentName:"tr",align:"center"},"Write"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"A1-style strings"),(0,l.kt)("td",{parentName:"tr",align:"left"},"XLSX"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"RC-style strings"),(0,l.kt)("td",{parentName:"tr",align:"left"},"XLML and plain text"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"BIFF Parsed formulae"),(0,l.kt)("td",{parentName:"tr",align:"left"},"XLSB and all XLS formats"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:"center"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"OpenFormula formulae"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ODS/FODS/UOS"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Lotus Parsed formulae"),(0,l.kt)("td",{parentName:"tr",align:"left"},"All Lotus WK_ formats"),(0,l.kt)("td",{parentName:"tr",align:"center"},"\u2714"),(0,l.kt)("td",{parentName:"tr",align:"center"})))),(0,l.kt)("p",null,"Since Excel prohibits named cells from colliding with names of A1 or RC style\ncell references, a (not-so-simple) regex conversion is possible.  BIFF Parsed\nformulae and Lotus Parsed formulae have to be explicitly unwound.  OpenFormula\nformulae can be converted with regular expressions."),(0,l.kt)("p",null,"Shared formulae are decompressed and each cell has the formula corresponding to\nits cell.  Writers generally do not attempt to generate shared formulae.")),(0,l.kt)("h3",{id:"single-cell-formulae"},"Single-Cell Formulae"),(0,l.kt)("p",null,"For simple formulae, the ",(0,l.kt)("inlineCode",{parentName:"p"},"f")," key of the desired cell can be set to the actual\nformula text.  This worksheet represents ",(0,l.kt)("inlineCode",{parentName:"p"},"A1=1"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"A2=2"),", and ",(0,l.kt)("inlineCode",{parentName:"p"},"A3=A1+A2"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"var worksheet = {\n  \"!ref\": \"A1:A3\",\n  A1: { t:'n', v:1 },\n  A2: { t:'n', v:2 },\n  A3: { t:'n', v:3, f:'A1+A2' }\n};\n")),(0,l.kt)("p",null,"Utilities like ",(0,l.kt)("inlineCode",{parentName:"p"},"aoa_to_sheet")," will accept cell objects in lieu of values:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'var worksheet = XLSX.utils.aoa_to_sheet([\n  [ 1 ], // A1\n  [ 2 ], // A2\n  [ {t: "n", v: 3, f: "A1+A2"} ] // A3\n]);\n')),(0,l.kt)("p",null,"Cells with formula entries but no value will be serialized in a way that Excel\nand other spreadsheet tools will recognize.  This library will not automatically\ncompute formula results!  For example, the following worksheet will include the\n",(0,l.kt)("inlineCode",{parentName:"p"},"BESSELJ")," function but the result will not be available in JavaScript:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"var worksheet = XLSX.utils.aoa_to_sheet([\n  [ 3.14159, 2 ], // Row \"1\"\n  [ { t:'n', f:'BESSELJ(A1,B1)' } ] // Row \"2\" will be calculated on file open\n}\n")),(0,l.kt)("p",null,"If the actual results are needed in JS, ",(0,l.kt)("a",{parentName:"p",href:"https://sheetjs.com/pro"},"SheetJS Pro"),"\noffers a formula calculator component for evaluating expressions, updating\nvalues and dependent cells, and refreshing entire workbooks."),(0,l.kt)("h3",{id:"array-formulae"},"Array Formulae"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Assign an array formula")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"XLSX.utils.sheet_set_array_formula(worksheet, range, formula);\n")),(0,l.kt)("p",null,"Array formulae are stored in the top-left cell of the array block.  All cells\nof an array formula have a ",(0,l.kt)("inlineCode",{parentName:"p"},"F")," field corresponding to the range.  A single-cell\nformula can be distinguished from a plain formula by the presence of ",(0,l.kt)("inlineCode",{parentName:"p"},"F")," field."),(0,l.kt)("p",null,"For example, setting the cell ",(0,l.kt)("inlineCode",{parentName:"p"},"C1")," to the array formula ",(0,l.kt)("inlineCode",{parentName:"p"},"{=SUM(A1:A3*B1:B3)}"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// API function\nXLSX.utils.sheet_set_array_formula(worksheet, "C1", "SUM(A1:A3*B1:B3)");\n\n// ... OR raw operations\nworksheet[\'C1\'] = { t:\'n\', f: "SUM(A1:A3*B1:B3)", F:"C1:C1" };\n')),(0,l.kt)("p",null,"For a multi-cell array formula, every cell has the same array range but only the\nfirst cell specifies the formula.  Consider ",(0,l.kt)("inlineCode",{parentName:"p"},"D1:D3=A1:A3*B1:B3"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"// API function\nXLSX.utils.sheet_set_array_formula(worksheet, \"D1:D3\", \"A1:A3*B1:B3\");\n\n// ... OR raw operations\nworksheet['D1'] = { t:'n', F:\"D1:D3\", f:\"A1:A3*B1:B3\" };\nworksheet['D2'] = { t:'n', F:\"D1:D3\" };\nworksheet['D3'] = { t:'n', F:\"D1:D3\" };\n")),(0,l.kt)("p",null,"Utilities and writers are expected to check for the presence of a ",(0,l.kt)("inlineCode",{parentName:"p"},"F")," field and\nignore any possible formula element ",(0,l.kt)("inlineCode",{parentName:"p"},"f")," in cells other than the starting cell.\nThey are not expected to perform validation of the formulae!"),(0,l.kt)("h3",{id:"dynamic-arrays"},"Dynamic Arrays"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Assign a dynamic array formula")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"XLSX.utils.sheet_set_array_formula(worksheet, range, formula, true);\n")),(0,l.kt)("p",null,"Released in 2020, Dynamic Array Formulae are supported in the XLSX/XLSM and XLSB\nfile formats.  They are represented like normal array formulae but have special\ncell metadata indicating that the formula should be allowed to adjust the range."),(0,l.kt)("p",null,"An array formula can be marked as dynamic by setting the cell's ",(0,l.kt)("inlineCode",{parentName:"p"},"D")," property to\ntrue.  The ",(0,l.kt)("inlineCode",{parentName:"p"},"F")," range is expected but can be the set to the current cell:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// API function\nXLSX.utils.sheet_set_array_formula(worksheet, "C1", "_xlfn.UNIQUE(A1:A3)", 1);\n\n// ... OR raw operations\nworksheet[\'C1\'] = { t: "s", f: "_xlfn.UNIQUE(A1:A3)", F:"C1", D: 1 }; // dynamic\n')),(0,l.kt)("h3",{id:"localization"},"Localization"),(0,l.kt)("p",null,"SheetJS operates at the file level.  Excel stores formula expressions using the\nEnglish (United States) function names.  For non-English users, Excel uses a\nlocalized set of function names."),(0,l.kt)("p",null,"For example, when the computer language and region is set to French (France),\nExcel interprets ",(0,l.kt)("inlineCode",{parentName:"p"},"=SOMME(A1:C3)")," as if ",(0,l.kt)("inlineCode",{parentName:"p"},"SOMME")," is the ",(0,l.kt)("inlineCode",{parentName:"p"},"SUM")," function.  However,\nin the actual file, Excel stores ",(0,l.kt)("inlineCode",{parentName:"p"},"SUM(A1:C3)"),"."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},'Prefixed "Future Functions"')),(0,l.kt)("p",null,"Functions introduced in newer versions of Excel are prefixed with ",(0,l.kt)("inlineCode",{parentName:"p"},"_xlfn.")," when\nstored in files.  When writing formula expressions using these functions, the\nprefix is required for maximal compatibility:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'// Broadest compatibility\nXLSX.utils.sheet_set_array_formula(worksheet, "C1", "_xlfn.UNIQUE(A1:A3)", 1);\n\n// Can cause errors in spreadsheet software\nXLSX.utils.sheet_set_array_formula(worksheet, "C1", "UNIQUE(A1:A3)", 1);\n')),(0,l.kt)("p",null,"When reading a file, the ",(0,l.kt)("inlineCode",{parentName:"p"},"xlfn")," option preserves the prefixes."),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null," Functions requiring `_xlfn.` prefix")," (click to show)"),(0,l.kt)("p",null,"This list is growing with each Excel release."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"ACOT\nACOTH\nAGGREGATE\nARABIC\nBASE\nBETA.DIST\nBETA.INV\nBINOM.DIST\nBINOM.DIST.RANGE\nBINOM.INV\nBITAND\nBITLSHIFT\nBITOR\nBITRSHIFT\nBITXOR\nBYCOL\nBYROW\nCEILING.MATH\nCEILING.PRECISE\nCHISQ.DIST\nCHISQ.DIST.RT\nCHISQ.INV\nCHISQ.INV.RT\nCHISQ.TEST\nCOMBINA\nCONFIDENCE.NORM\nCONFIDENCE.T\nCOT\nCOTH\nCOVARIANCE.P\nCOVARIANCE.S\nCSC\nCSCH\nDAYS\nDECIMAL\nERF.PRECISE\nERFC.PRECISE\nEXPON.DIST\nF.DIST\nF.DIST.RT\nF.INV\nF.INV.RT\nF.TEST\nFIELDVALUE\nFILTERXML\nFLOOR.MATH\nFLOOR.PRECISE\nFORMULATEXT\nGAMMA\nGAMMA.DIST\nGAMMA.INV\nGAMMALN.PRECISE\nGAUSS\nHYPGEOM.DIST\nIFNA\nIMCOSH\nIMCOT\nIMCSC\nIMCSCH\nIMSEC\nIMSECH\nIMSINH\nIMTAN\nISFORMULA\nISOMITTED\nISOWEEKNUM\nLAMBDA\nLET\nLOGNORM.DIST\nLOGNORM.INV\nMAKEARRAY\nMAP\nMODE.MULT\nMODE.SNGL\nMUNIT\nNEGBINOM.DIST\nNORM.DIST\nNORM.INV\nNORM.S.DIST\nNORM.S.INV\nNUMBERVALUE\nPDURATION\nPERCENTILE.EXC\nPERCENTILE.INC\nPERCENTRANK.EXC\nPERCENTRANK.INC\nPERMUTATIONA\nPHI\nPOISSON.DIST\nQUARTILE.EXC\nQUARTILE.INC\nQUERYSTRING\nRANDARRAY\nRANK.AVG\nRANK.EQ\nREDUCE\nRRI\nSCAN\nSEC\nSECH\nSEQUENCE\nSHEET\nSHEETS\nSKEW.P\nSORTBY\nSTDEV.P\nSTDEV.S\nT.DIST\nT.DIST.2T\nT.DIST.RT\nT.INV\nT.INV.2T\nT.TEST\nUNICHAR\nUNICODE\nUNIQUE\nVAR.P\nVAR.S\nWEBSERVICE\nWEIBULL.DIST\nXLOOKUP\nXOR\nZ.TEST\n"))),(0,l.kt)("h2",{id:"row-and-column-properties"},"Row and Column Properties"),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Format Support")," (click to show)"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Row Properties"),": XLSX/M, XLSB, BIFF8 XLS, XLML, SYLK, DOM, ODS"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Column Properties"),": XLSX/M, XLSB, BIFF8 XLS, XLML, SYLK, DOM")),(0,l.kt)("p",null,"Row and Column properties are not extracted by default when reading from a file\nand are not persisted by default when writing to a file. The option\n",(0,l.kt)("inlineCode",{parentName:"p"},"cellStyles: true")," must be passed to the relevant read or write function."),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Column Properties")),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"!cols")," array in each worksheet, if present, is a collection of ",(0,l.kt)("inlineCode",{parentName:"p"},"ColInfo"),"\nobjects which have the following properties:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'type ColInfo = {\n  /* visibility */\n  hidden?: boolean; // if true, the column is hidden\n\n  /* column width is specified in one of the following ways: */\n  wpx?:    number;  // width in screen pixels\n  width?:  number;  // width in Excel\'s "Max Digit Width", width*256 is integral\n  wch?:    number;  // width in characters\n\n  /* other fields for preserving features from files */\n  level?:  number;  // 0-indexed outline / group level\n  MDW?:    number;  // Excel\'s "Max Digit Width" unit, always integral\n};\n')),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Row Properties")),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"!rows")," array in each worksheet, if present, is a collection of ",(0,l.kt)("inlineCode",{parentName:"p"},"RowInfo"),"\nobjects which have the following properties:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"type RowInfo = {\n  /* visibility */\n  hidden?: boolean; // if true, the row is hidden\n\n  /* row height is specified in one of the following ways: */\n  hpx?:    number;  // height in screen pixels\n  hpt?:    number;  // height in points\n\n  level?:  number;  // 0-indexed outline / group level\n};\n")),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Outline / Group Levels Convention")),(0,l.kt)("p",null,"The Excel UI displays the base outline level as ",(0,l.kt)("inlineCode",{parentName:"p"},"1")," and the max level as ",(0,l.kt)("inlineCode",{parentName:"p"},"8"),".\nFollowing JS conventions, SheetJS uses 0-indexed outline levels wherein the base\noutline level is ",(0,l.kt)("inlineCode",{parentName:"p"},"0")," and the max level is ",(0,l.kt)("inlineCode",{parentName:"p"},"7"),"."),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Why are there three width types?")," (click to show)"),(0,l.kt)("p",null,"There are three different width types corresponding to the three different ways\nspreadsheets store column widths:"),(0,l.kt)("p",null,"SYLK and other plain text formats use raw character count. Contemporaneous tools\nlike Visicalc and Multiplan were character based.  Since the characters had the\nsame width, it sufficed to store a count.  This tradition was continued into the\nBIFF formats."),(0,l.kt)("p",null,"SpreadsheetML (2003) tried to align with HTML by standardizing on screen pixel\ncount throughout the file.  Column widths, row heights, and other measures use\npixels.  When the pixel and character counts do not align, Excel rounds values."),(0,l.kt)("p",null,'XLSX internally stores column widths in a nebulous "Max Digit Width" form.  The\nMax Digit Width is the width of the largest digit when rendered (generally the\n"0" character is the widest).  The internal width must be an integer multiple of\nthe the width divided by 256.  ECMA-376 describes a formula for converting\nbetween pixels and the internal width.  This represents a hybrid approach.'),(0,l.kt)("p",null,"Read functions attempt to populate all three properties.  Write functions will\ntry to cycle specified values to the desired type.  In order to avoid potential\nconflicts, manipulation should delete the other properties first.  For example,\nwhen changing the pixel width, delete the ",(0,l.kt)("inlineCode",{parentName:"p"},"wch")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"width")," properties.")),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Implementation details")," (click to show)"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Row Heights")),(0,l.kt)("p",null,"Excel internally stores row heights in points.  The default resolution is 72 DPI\nor 96 PPI, so the pixel and point size should agree.  For different resolutions\nthey may not agree, so the library separates the concepts."),(0,l.kt)("p",null,"Even though all of the information is made available, writers are expected to\nfollow the priority order:"),(0,l.kt)("p",null,"1) use ",(0,l.kt)("inlineCode",{parentName:"p"},"hpx")," pixel height if available\n2) use ",(0,l.kt)("inlineCode",{parentName:"p"},"hpt")," point height if available"),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Column Widths")),(0,l.kt)("p",null,"Given the constraints, it is possible to determine the MDW without actually\ninspecting the font!  The parsers guess the pixel width by converting from width\nto pixels and back, repeating for all possible MDW and selecting the MDW that\nminimizes the error.  XLML actually stores the pixel width, so the guess works\nin the opposite direction."),(0,l.kt)("p",null,"Even though all of the information is made available, writers are expected to\nfollow the priority order:"),(0,l.kt)("p",null,"1) use ",(0,l.kt)("inlineCode",{parentName:"p"},"width")," field if available\n2) use ",(0,l.kt)("inlineCode",{parentName:"p"},"wpx")," pixel width if available\n3) use ",(0,l.kt)("inlineCode",{parentName:"p"},"wch")," character count if available")),(0,l.kt)("h2",{id:"number-formats"},"Number Formats"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"cell.w")," formatted text for each cell is produced from ",(0,l.kt)("inlineCode",{parentName:"p"},"cell.v")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"cell.z"),"\nformat.  If the format is not specified, the Excel ",(0,l.kt)("inlineCode",{parentName:"p"},"General")," format is used.\nThe format can either be specified as a string or as an index into the format\ntable.  Parsers are expected to populate ",(0,l.kt)("inlineCode",{parentName:"p"},"workbook.SSF")," with the number format\ntable.  Writers are expected to serialize the table."),(0,l.kt)("p",null,"Custom tools should ensure that the local table has each used format string\nsomewhere in the table.  Excel convention mandates that the custom formats start\nat index 164.  The following example creates a custom format from scratch:"),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"New worksheet with custom format")," (click to show)"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'var wb = {\n  SheetNames: ["Sheet1"],\n  Sheets: {\n    Sheet1: {\n      "!ref":"A1:C1",\n      A1: { t:"n", v:10000 },                    // <-- General format\n      B1: { t:"n", v:10000, z: "0%" },           // <-- Builtin format\n      C1: { t:"n", v:10000, z: "\\"T\\"\\ #0.00" }  // <-- Custom format\n    }\n  }\n}\n'))),(0,l.kt)("p",null,"The rules are slightly different from how Excel displays custom number formats.\nIn particular, literal characters must be wrapped in double quotes or preceded\nby a backslash. For more info, see the Excel documentation article\n",(0,l.kt)("inlineCode",{parentName:"p"},"Create or delete a custom number format")," or ECMA-376 18.8.31 (Number Formats)"),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Default Number Formats")," (click to show)"),(0,l.kt)("p",null,"The default formats are listed in ECMA-376 18.8.30:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"right"},"ID"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Format"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"0"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"General"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"1"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"0"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"2"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"0.00"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"3"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"4"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0.00"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"9"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"0%"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"10"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"0.00%"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"11"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"0.00E+00"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"12"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"# ?/?"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"13"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"# ??/??"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"14"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"m/d/yy")," (see below)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"15"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"d-mmm-yy"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"16"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"d-mmm"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"17"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"mmm-yy"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"18"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"h:mm AM/PM"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"19"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"h:mm:ss AM/PM"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"20"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"h:mm"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"21"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"h:mm:ss"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"22"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"m/d/yy h:mm"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"37"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0 ;(#,##0)"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"38"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0 ;[Red](#,##0)"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"39"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0.00;(#,##0.00)"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"40"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"#,##0.00;[Red](#,##0.00)"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"45"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"mm:ss"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"46"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"[h]:mm:ss"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"47"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"mmss.0"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"48"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"##0.0E+0"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"right"},"49"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"@")))))),(0,l.kt)("p",null,"Format 14 (",(0,l.kt)("inlineCode",{parentName:"p"},"m/d/yy"),") is localized by Excel: even though the file specifies that\nnumber format, it will be drawn differently based on system settings.  It makes\nsense when the producer and consumer of files are in the same locale, but that\nis not always the case over the Internet.  To get around this ambiguity, parse\nfunctions accept the ",(0,l.kt)("inlineCode",{parentName:"p"},"dateNF")," option to override the interpretation of that\nspecific format string."),(0,l.kt)("h2",{id:"hyperlinks"},"Hyperlinks"),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Format Support")," (click to show)"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Cell Hyperlinks"),": XLSX/M, XLSB, BIFF8 XLS, XLML, ODS"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Tooltips"),": XLSX/M, XLSB, BIFF8 XLS, XLML")),(0,l.kt)("p",null,"Hyperlinks are stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"l")," key of cell objects.  The ",(0,l.kt)("inlineCode",{parentName:"p"},"Target")," field of the\nhyperlink object is the target of the link, including the URI fragment. Tooltips\nare stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"Tooltip")," field and are displayed when you move your mouse\nover the text."),(0,l.kt)("p",null,"For example, the following snippet creates a link from cell ",(0,l.kt)("inlineCode",{parentName:"p"},"A3")," to\n",(0,l.kt)("a",{parentName:"p",href:"https://sheetjs.com"},"https://sheetjs.com")," with the tip ",(0,l.kt)("inlineCode",{parentName:"p"},'"Find us @ SheetJS.com!"'),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'ws[\'A1\'].l = { Target:"https://sheetjs.com", Tooltip:"Find us @ SheetJS.com!" };\n')),(0,l.kt)("p",null,"Note that Excel does not automatically style hyperlinks -- they will generally\nbe displayed as normal text."),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Remote Links")),(0,l.kt)("p",null,"HTTP / HTTPS links can be used directly:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"ws['A2'].l = { Target:\"https://docs.sheetjs.com/#hyperlinks\" };\nws['A3'].l = { Target:\"http://localhost:7262/yes_localhost_works\" };\n")),(0,l.kt)("p",null,"Excel also supports ",(0,l.kt)("inlineCode",{parentName:"p"},"mailto")," email links with subject line:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"ws['A4'].l = { Target:\"mailto:ignored@dev.null\" };\nws['A5'].l = { Target:\"mailto:ignored@dev.null?subject=Test Subject\" };\n")),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Local Links")),(0,l.kt)("p",null,"Links to absolute paths should use the ",(0,l.kt)("inlineCode",{parentName:"p"},"file://")," URI scheme:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"ws['B1'].l = { Target:\"file:///SheetJS/t.xlsx\" }; /* Link to /SheetJS/t.xlsx */\nws['B2'].l = { Target:\"file:///c:/SheetJS.xlsx\" }; /* Link to c:\\SheetJS.xlsx */\n")),(0,l.kt)("p",null,"Links to relative paths can be specified without a scheme:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"ws['B3'].l = { Target:\"SheetJS.xlsb\" }; /* Link to SheetJS.xlsb */\nws['B4'].l = { Target:\"../SheetJS.xlsm\" }; /* Link to ../SheetJS.xlsm */\n")),(0,l.kt)("p",null,"Relative Paths have undefined behavior in the SpreadsheetML 2003 format.  Excel\n2019 will treat a ",(0,l.kt)("inlineCode",{parentName:"p"},"..\\")," parent mark as two levels up."),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Internal Links")),(0,l.kt)("p",null,'Links where the target is a cell or range or defined name in the same workbook\n("Internal Links") are marked with a leading hash character:'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"ws['C1'].l = { Target:\"#E2\" }; /* Link to cell E2 */\nws['C2'].l = { Target:\"#Sheet2!E2\" }; /* Link to cell E2 in sheet Sheet2 */\nws['C3'].l = { Target:\"#SomeDefinedName\" }; /* Link to Defined Name */\n")),(0,l.kt)("h2",{id:"cell-comments"},"Cell Comments"),(0,l.kt)("p",null,"Cell comments are objects stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"c")," array of cell objects.  The actual\ncontents of the comment are split into blocks based on the comment author.  The\n",(0,l.kt)("inlineCode",{parentName:"p"},"a")," field of each comment object is the author of the comment and the ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," field\nis the plain text representation."),(0,l.kt)("p",null,"For example, the following snippet appends a cell comment into cell ",(0,l.kt)("inlineCode",{parentName:"p"},"A1"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'if(!ws.A1.c) ws.A1.c = [];\nws.A1.c.push({a:"SheetJS", t:"I\'m a little comment, short and stout!"});\n')),(0,l.kt)("p",null,"Note: XLSB enforces a 54 character limit on the Author name.  Names longer than\n54 characters may cause issues with other formats."),(0,l.kt)("p",null,"To mark a comment as normally hidden, set the ",(0,l.kt)("inlineCode",{parentName:"p"},"hidden")," property:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'if(!ws.A1.c) ws.A1.c = [];\nws.A1.c.push({a:"SheetJS", t:"This comment is visible"});\n\nif(!ws.A2.c) ws.A2.c = [];\nws.A2.c.hidden = true;\nws.A2.c.push({a:"SheetJS", t:"This comment will be hidden"});\n')),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Threaded Comments")),(0,l.kt)("p",null,"Introduced in Excel 365, threaded comments are plain text comment snippets with\nauthor metadata and parent references. They are supported in XLSX and XLSB."),(0,l.kt)("p",null,"To mark a comment as threaded, each comment part must have a true ",(0,l.kt)("inlineCode",{parentName:"p"},"T")," property:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'if(!ws.A1.c) ws.A1.c = [];\nws.A1.c.push({a:"SheetJS", t:"This is not threaded"});\n\nif(!ws.A2.c) ws.A2.c = [];\nws.A2.c.hidden = true;\nws.A2.c.push({a:"SheetJS", t:"This is threaded", T: true});\nws.A2.c.push({a:"JSSheet", t:"This is also threaded", T: true});\n')),(0,l.kt)("p",null,"There is no Active Directory or Office 365 metadata associated with authors in a thread."),(0,l.kt)("h2",{id:"sheet-visibility"},"Sheet Visibility"),(0,l.kt)("p",null,'Excel enables hiding sheets in the lower tab bar.  The sheet data is stored in\nthe file but the UI does not readily make it available.  Standard hidden sheets\nare revealed in the "Unhide" menu.  Excel also has "very hidden" sheets which\ncannot be revealed in the menu.  It is only accessible in the VB Editor!'),(0,l.kt)("p",null,"The visibility setting is stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"Hidden")," property of sheet props array."),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"More details")," (click to show)"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"center"},"Value"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Definition"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"0"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Visible")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"1"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Hidden")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"center"},"2"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Very Hidden")))),(0,l.kt)("p",null,"With ",(0,l.kt)("a",{parentName:"p",href:"https://rawgit.com/SheetJS/test_files/HEAD/sheet_visibility.xlsx"},"https://rawgit.com/SheetJS/test_files/HEAD/sheet_visibility.xlsx"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"> wb.Workbook.Sheets.map(function(x) { return [x.name, x.Hidden] })\n[ [ 'Visible', 0 ], [ 'Hidden', 1 ], [ 'VeryHidden', 2 ] ]\n")),(0,l.kt)("p",null,"Non-Excel formats do not support the Very Hidden state.  The best way to test\nif a sheet is visible is to check if the ",(0,l.kt)("inlineCode",{parentName:"p"},"Hidden")," property is logical truth:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"> wb.Workbook.Sheets.map(function(x) { return [x.name, !x.Hidden] })\n[ [ 'Visible', true ], [ 'Hidden', false ], [ 'VeryHidden', false ] ]\n"))),(0,l.kt)("h2",{id:"vba-and-macros"},"VBA and Macros"),(0,l.kt)("p",null,"VBA Macros are stored in a special data blob that is exposed in the ",(0,l.kt)("inlineCode",{parentName:"p"},"vbaraw"),"\nproperty of the workbook object when the ",(0,l.kt)("inlineCode",{parentName:"p"},"bookVBA")," option is ",(0,l.kt)("inlineCode",{parentName:"p"},"true"),".  They are\nsupported in ",(0,l.kt)("inlineCode",{parentName:"p"},"XLSM"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"XLSB"),", and ",(0,l.kt)("inlineCode",{parentName:"p"},"BIFF8 XLS")," formats.  The supported format\nwriters automatically insert the data blobs if it is present in the workbook and\nassociate with the worksheet names."),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Custom Code Names")," (click to show)"),(0,l.kt)("p",null,"The workbook code name is stored in ",(0,l.kt)("inlineCode",{parentName:"p"},"wb.Workbook.WBProps.CodeName"),".  By default,\nExcel will write ",(0,l.kt)("inlineCode",{parentName:"p"},"ThisWorkbook")," or a translated phrase like ",(0,l.kt)("inlineCode",{parentName:"p"},"DieseArbeitsmappe"),".\nWorksheet and Chartsheet code names are in the worksheet properties object at\n",(0,l.kt)("inlineCode",{parentName:"p"},"wb.Workbook.Sheets[i].CodeName"),".  Macrosheets and Dialogsheets are ignored."),(0,l.kt)("p",null,"The readers and writers preserve the code names, but they have to be manually\nset when adding a VBA blob to a different workbook.")),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Macrosheets")," (click to show)"),(0,l.kt)("p",null,'Older versions of Excel also supported a non-VBA "macrosheet" sheet type that\nstored automation commands.  These are exposed in objects with the ',(0,l.kt)("inlineCode",{parentName:"p"},"!type"),"\nproperty set to ",(0,l.kt)("inlineCode",{parentName:"p"},'"macro"'),".")),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"Detecting macros in workbooks")," (click to show)"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"vbaraw")," field will only be set if macros are present, so testing is simple:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"function wb_has_macro(wb/*:workbook*/)/*:boolean*/ {\n    if(!!wb.vbaraw) return true;\n    const sheets = wb.SheetNames.map((n) => wb.Sheets[n]);\n    return sheets.some((ws) => !!ws && ws['!type']=='macro');\n}\n"))))}u.isMDXComponent=!0}}]);