---
title: JavaScript Engines
---

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The most popular JavaScript engine is V8.  Designed for embedding in software,
it powers Chrome, NodeJS, UXP, Deno and many other platforms.

There are many other JS engines with different design goals.  Some are designed
for low-power or low-memory environments.  Others aim for interoperability with
specific programming languages or environments.  Typically they support ES3 and
are capable of running SheetJS code.


## General Caveats

Common browser and NodeJS APIs are often missing from light-weight JS engines.

**Global**

Some engines do not provide `globalThis` or `global` or `window`.  A `global`
variable can be exposed in one line that should be run in the JS engine:

```js
var global = (function(){ return this; }).call(null);
```

**Console**

Some engines do not provide a `console` object.  `console.log` can be shimmed
using the engine functionality.  For example, `hermes` provides `print()`:

```js
var console = { log: function(x) { print(x); } };
```

**Binary Data**

Some engines do not provide easy ways to exchange binary data.  For example, it
is common to pass null-terminated arrays, which would truncate XLSX, XLS, and
other exports.  APIs that accept pointers without length should be avoided.

Base64 strings are safe for passing between JS and native code, but they should
only be used when there is no safe way to pass `ArrayBuffer` or `Uint8Array`.


## Duktape

Duktape is an embeddable JS engine written in C. It has been ported to a number
of exotic architectures and operating systems.

**Reading data**

Duktape supports `Buffer` natively but should be sliced before processing:

```c
/* parse a C char array as a workbook object */
duk_push_external_buffer(ctx);
duk_config_buffer(ctx, -1, buf, len);
duk_put_global_string(ctx, "buf");
duk_eval_string_noresult("workbook = XLSX.read(buf.slice(0, buf.length), {type:'buffer'});");
```

**Writing data**

`duk_get_buffer_data` can pull `Buffer` object data into the C code:

```c
/* write a workbook object to a C char array */
duk_eval_string(ctx, "XLSX.write(workbook, {type:'array', bookType:'xlsx'})");
duk_size_t sz;
char *buf = (char *)duk_get_buffer_data(ctx, -1, sz);
duk_pop(ctx);
```

<details><summary><b>Complete Example</b> (click to show)</summary>

:::note

This demo was tested on Intel Mac (`darwin-x64`).

:::

0) Download and extract the latest release (2.7.0 at the time of writing)

```bash
curl -LO https://duktape.org/duktape-2.7.0.tar.xz
tar -xJf duktape-2.7.0.tar.xz
mv duktape-2.7.0/src/*.{c,h} .
```

1) Download the standalone script, shim and test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Save the following script to `sheetjs.duk.c`:

```c title="sheetjs.duk.c"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "duktape.h"

#define FAIL_LOAD { \
  duk_push_undefined(ctx); \
  perror("Error in load_file"); \
  return 1; \
}

static char *read_file(const char *filename, size_t *sz) {
  FILE *f = fopen(filename, "rb");
  if(!f) return NULL;
  long fsize; { fseek(f, 0, SEEK_END); fsize = ftell(f); fseek(f, 0, SEEK_SET); }
  char *buf = (char *)malloc(fsize * sizeof(char));
  *sz = fread((void *) buf, 1, fsize, f);
  fclose(f);
  return buf;
}

static duk_int_t eval_file(duk_context *ctx, const char *filename) {
  size_t len; char *buf = read_file(filename, &len);
  if(!buf) FAIL_LOAD

  duk_push_lstring(ctx, (const char *)buf, (duk_size_t)len);
  duk_int_t retval = duk_peval(ctx);
  duk_pop(ctx);
  return retval;
}

static duk_int_t load_file(duk_context *ctx, const char *filename, const char *var) {
  size_t len; char *buf = read_file(filename, &len);
  if(!buf) FAIL_LOAD

  duk_push_external_buffer(ctx);
  duk_config_buffer(ctx, -1, buf, len);
  duk_put_global_string(ctx, var);
  return 0;
}

static duk_int_t save_file(duk_context *ctx, const char *filename, const char *var) {
  duk_get_global_string(ctx, var);
  duk_size_t sz;
  char *buf = (char *)duk_get_buffer_data(ctx, -1, &sz);

  if(!buf) return 1;
  FILE *f = fopen(filename, "wb"); fwrite(buf, 1, sz, f); fclose(f);
  return 0;
}

#define FAIL(cmd) { \
  printf("error in %s: %s\n", cmd, duk_safe_to_string(ctx, -1)); \
  duk_destroy_heap(ctx); \
  return res; \
}

#define DOIT(cmd) duk_eval_string_noresult(ctx, cmd);
int main(int argc, char *argv[]) {
  duk_int_t res = 0;

  /* initialize */
  duk_context *ctx = duk_create_heap_default();
  /* duktape does not expose a standard "global" by default */
  DOIT("var global = (function(){ return this; }).call(null);");

  /* load library */
  res = eval_file(ctx, "shim.min.js");
  if(res != 0) FAIL("shim load")
  res = eval_file(ctx, "xlsx.full.min.js");
  if(res != 0) FAIL("library load")

  /* get version string */
  duk_eval_string(ctx, "XLSX.version");
  printf("SheetJS library version %s\n", duk_get_string(ctx, -1));
  duk_pop(ctx);

  /* read file */
  res = load_file(ctx, argv[1], "buf");
  if(res != 0) FAIL("file load")
  printf("Loaded file %s\n", argv[1]);

  /* parse workbook */
  DOIT("wb = XLSX.read(buf.slice(0, buf.length), {type:'buffer'});");
  DOIT("ws = wb.Sheets[wb.SheetNames[0]]");

  /* print CSV */
  duk_eval_string(ctx, "XLSX.utils.sheet_to_csv(ws)");
  printf("%s\n", duk_get_string(ctx, -1));
  duk_pop(ctx);

  /* write file */
#define WRITE_TYPE(BOOKTYPE) \
  DOIT("newbuf = (XLSX.write(wb, {type:'array', bookType:'" BOOKTYPE "'}));");\
  res = save_file(ctx, "sheetjsw." BOOKTYPE, "newbuf");\
  if(res != 0) FAIL("save sheetjsw." BOOKTYPE)

  WRITE_TYPE("xlsb")

  /* cleanup */
  duk_destroy_heap(ctx);
  return res;
}
```

3) Compile standalone `sheetjs.duk` binary

```bash
gcc -std=c99 -Wall -osheetjs.duk sheetjs.duk.c duktape.c -lm
```

4) Run the demo:

```bash
./sheetjs.duk pres.numbers
```

If the program succeeded, the CSV contents will be printed to console and the
file `sheetjsw.xlsb` will be created.  That file can be opened with Excel.

</details>

## Goja

Goja is a pure Go implementation of ECMAScript 5. It supports the standalone
scripts out of the box.

**Reading data**

Files can be read into `[]byte`:

```go
/* read file */
data, _ := ioutil.ReadFile("sheetjs.xlsx")
```

`[]byte` should be converted to an `ArrayBuffer` from Go:

```go
/* load into engine */
vm.Set("buf", vm.ToValue(vm.NewArrayBuffer(data)))

/* parse */
wb, _ = vm.RunString("wb = XLSX.read(buf, {type:'buffer'});")
```

**Writing data**

`"base64"` strings can be decoded in Go:

```go
/* write to Base64 string */
b64str, _ := vm.RunString("XLSX.write(wb, {type:'base64', bookType:'xlsx'})")

/* pull data back into Go and write to file */
buf, _ := base64.StdEncoding.DecodeString(b64str.String())
_ = ioutil.WriteFile("sheetjs.xlsx", buf, 0644)
```

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Install Go

1) Create a `go.mod` file and install dependencies:

```bash
go mod init SheetGoja
go get github.com/dop251/goja
```

2) Download the standalone script and the shim:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
</ul>

3) Save the following code to `SheetGoja.go`:

```go title="SheetGoja.go"
package main

import (
  b64 "encoding/base64"
  "fmt"
  "os"
  "io/ioutil"
  "github.com/dop251/goja"
)

func safe_run_file(vm *goja.Runtime, file string) {
  data, err := ioutil.ReadFile(file)
  if err != nil { panic(err) }
  src := string(data)
  _, err = vm.RunString(src)
  if err != nil { panic(err) }
}

func eval_string(vm *goja.Runtime, cmd string) goja.Value {
  v, err := vm.RunString(cmd)
  if err != nil { panic(err) }
  return v
}

func write_type(vm *goja.Runtime, t string) {
  b64str := eval_string(vm, "XLSX.write(wb, {type:'base64', bookType:'" + t + "'})")
  buf, err := b64.StdEncoding.DecodeString(b64str.String());
  if err != nil { panic(err) }
  err = ioutil.WriteFile("sheetjsg." + t, buf, 0644)
  if err != nil { panic(err) }
}

func main() {
  vm := goja.New()

  /* initialize */
  eval_string(vm, "if(typeof global == 'undefined') global = (function(){ return this; }).call(null);")

  /* load library */
  safe_run_file(vm, "shim.min.js")
  safe_run_file(vm, "xlsx.full.min.js")

  /* get version string */
  v := eval_string(vm, "XLSX.version")
  fmt.Printf("SheetJS library version %s\n", v)

  /* read file */
  data, err := ioutil.ReadFile(os.Args[1])
  if err != nil { panic(err) }
  vm.Set("buf", vm.ToValue(vm.NewArrayBuffer(data)))
  fmt.Printf("Loaded file %s\n", os.Args[1])

  /* parse workbook */
  eval_string(vm, "wb = XLSX.read(buf, {type:'buffer'});")
  fmt.Printf("Parsed %s\n", os.Args[1])
  eval_string(vm, "ws = wb.Sheets[wb.SheetNames[0]]")
  fmt.Printf("Grabbed %s\n", os.Args[1])

  /* print CSV */
  csv := eval_string(vm, "XLSX.utils.sheet_to_csv(ws)")
  fmt.Printf("%s\n", csv)

  /* write file */
  write_type(vm, "csv")
}
```

4) Build `SheetGoja`:

```bash
go build SheetGoja.go
```

For testing, download <https://sheetjs.com/pres.numbers> and run

```bash
./SheetGoja pres.numbers
```

This will print the contents as a CSV to screen AND write to `sheetjsg.csv`

</details>


## Hermes

Hermes is an embeddable JS engine for React Native.  The library and binary
distributions include a command-line tool `hermes` for running JS scripts.

The simplest way to interact with the engine is to pass Base64 strings. The make
target builds a very simple payload with the data.

:::note

The official release includes the `hermes` standalone tool.  While applications
should link against the official libraries, the standalone tool is useful for
verifying functionality.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

Due to limitations of the standalone binary, this demo will encode a test file
as a Base64 string and directly add it to an amalgamated script.

0) Install the `hermes` command line tool

1) Download the standalone script, shim, and test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Bundle the test file and create `payload.js`:

```bash
node -e "fs.writeFileSync('payload.js', 'var payload = \"' + fs.readFileSync('pres.numbers').toString('base64') + '\";')"
```

3) Create support scripts:

- `global.js` creates a `global` variable and defines a fake `console`:

```js title="global.js"
var global = (function(){ return this; }).call(null);
var console = { log: function(x) { print(x); } };
```

- `hermes.js` will call `XLSX.read` and `XLSX.utils.sheet_to_csv`:

```js title="hermes.js"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
var wb = XLSX.read(payload, {type:'base64'});
console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
```

4) Create the amalgamation `xlsx.hermes.js`:

```bash
cat global.js xlsx.full.min.js payload.js hermes.js > xlsx.hermes.js
```

The final script defines `global` before loading the standalone library.  Once
ready, it will read the bundled test data and print the contents as CSV.

5) Run the script using the Hermes standalone binary:

```bash
hermes xlsx.hermes.js
```

</details>

## JavaScriptCore

:::warning Platform Limitations

JavaScriptCore is primarily deployed in MacOS and iOS applications.  There is
some experimental support through the Bun runtime, but production applications
intending to support Windows / Linux / Android should try to embed V8.

:::

iOS and MacOS ship with the JavaScriptCore framework for running JS code from
Swift and Objective-C.  Hybrid function invocation is tricky, but explicit data
passing is straightforward. The demo shows a standalone Swift sample for MacOS.

Binary strings can be passed back and forth using `String.Encoding.isoLatin1`.

**Reading data**

`String(contentsOf:encoding:)` reads from a path and returns an encoded string:

```swift
/* read sheetjs.xls as Base64 string */
let file_path = shared_dir.appendingPathComponent("sheetjs.xls");
let data: String! = try String(contentsOf: file_path, encoding: String.Encoding.isoLatin1);
```

This string can be loaded into the JS engine and processed:

```swift
/* load data in JSC */
context.setObject(data, forKeyedSubscript: "payload" as (NSCopying & NSObjectProtocol));

/* `payload` (the "forKeyedSubscript" parameter) is a binary string */
context.evaluateScript("var wb = XLSX.read(payload, {type:'binary'});");
```

**Writing data**

When writing to binary string in JavaScriptCore, the result should be stored in
a variable and converted to string in Swift:

```swift
/* write to binary string */
context.evaluateScript("var out = XLSX.write(wb, {type:'binary', bookType:'xlsx'})");

/* `out` from the script is a binary string that can be stringified in Swift */
let outvalue: JSValue! = context.objectForKeyedSubscript("out");
var out: String! = outvalue.toString();
```

`String#write(to:atomically:encoding)` writes the string to the specified path:

```swift
/* write to sheetjsw.xlsx */
let out_path = shared_dir.appendingPathComponent("sheetjsw.xlsx");
try? out.write(to: out_path, atomically: false, encoding: String.Encoding.isoLatin1);
```

The demo includes a sample `SheetJSCore` Wrapper class to simplify operations.

<details><summary><b>Complete Example</b> (click to show)</summary>

:::caution This demo only runs on MacOS

This example requires MacOS + Swift and will not work on Windows or Linux!

:::

0) Ensure Xcode is installed

1) Download the standalone script, the shim and the test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Download the Swift scripts for the demo

- [`SheetJSCore.swift`](pathname:///swift/SheetJSCore.swift) Wrapper library
- [`main.swift`](pathname:///swift/main.swift) Command-line script

3) Build the `SheetJSwift` binary:

```bash
swiftc SheetJSCore.swift main.swift -o SheetJSwift
```

4) Test the program:

```bash
./SheetJSwift pres.numbers
```

If successful, a CSV will be printed to console. The script also tries to write
to `SheetJSwift.xlsx`. That file can be verified by opening in Excel / Numbers.

</details>

## JerryScript

JerryScript is a lightweight JavaScript engine designed for use in low-memory
environments like microcontrollers.  As part of the build suite, the project
generates a C library and a standalone CLI tool.

The simplest way to interact with the engine is to pass Base64 strings.

:::note

While applications should link against the official libraries, the standalone tool
is useful for verifying functionality.

:::

:::caution

This demo requires a much larger heap size than is normally used in JerryScript
deployments! In local testing, the following sizes were needed:

- 8192 (8M) for <https://sheetjs.com/pres.xlsx>
- 65536 (64M) for <https://sheetjs.com/pres.numbers>

This works on a Raspberry Pi.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

Due to limitations of the standalone binary, this demo will encode a test file
as a Base64 string and directly add it to an amalgamated script.

0) Build the library and command line tool with required options:

```bash
git clone --depth=1 https://github.com/jerryscript-project/jerryscript.git
cd jerryscript
python tools/build.py --error-messages=ON --logging=ON --mem-heap=8192 --cpointer-32bit=ON
```

1) Download the standalone script, shim, and test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.xlsx">pres.xlsx</a></li>
</ul>

2) Bundle the test file and create `payload.js`:

```bash
node -e "fs.writeFileSync('payload.js', 'var payload = \"' + fs.readFileSync('pres.xlsx').toString('base64') + '\";')"
```

3) Create support scripts:

- `global.js` creates a `global` variable and defines a fake `console`:

```js title="global.js"
var global = (function(){ return this; }).call(null);
var console = { log: function(x) { print(x); } };
```

- `jerry.js` will call `XLSX.read` and `XLSX.utils.sheet_to_csv`:

```js title="jerry.js"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
var wb = XLSX.read(payload, {type:'base64'});
console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
```

4) Create the amalgamation `xlsx.jerry.js`:

```bash
cat global.js xlsx.full.min.js payload.js jerry.js > xlsx.jerry.js
```

The final script defines `global` before loading the standalone library.  Once
ready, it will read the bundled test data and print the contents as CSV.

5) Run the script using the `jerry` standalone binary:

```bash
build/bin/jerry xlsx.jerry.js; echo $?
```

</details>

## QuickJS

QuickJS is an embeddable JS engine written in C.  It provides a separate set of
functions for interacting with the filesystem and the global object.  It can run
the standalone browser scripts.

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Ensure `quickjs` command line utility is installed

1) Download the standalone script, the shim and the test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Save the following script to `SheetJSQuick.js`:

```js title="SheetJSQuick.js
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
/* load XLSX */
import * as std from "std";
globalThis.global = globalThis;
std.loadScript("xlsx.full.min.js");

/* read contents of file */
var rh = std.open("pres.numbers", "rb");
rh.seek(0, std.SEEK_END);
var sz = rh.tell();
var ab = new ArrayBuffer(sz);
rh.seek();
rh.read(ab, 0, sz);
rh.close();

/* parse file */
var wb = XLSX.read(ab, {type: 'array'});

/* write array */
var out = XLSX.write(wb, {type: 'array'});

/* write contents to file */
var wh = std.open("SheetJSQuick.xlsx", "wb");
wh.write(out, 0, out.byteLength);
wh.close();
```

3) Test the program:

```bash
quickjs SheetJSQuick.js
```

If successful, the script will generate `SheetJSQuick.xlsx`.

</details>


## Rhino

Rhino is an ES3+ engine in Java. The `SheetJSRhino` class and `com.sheetjs`
package show a complete JAR deployment, including the full XLSX source.

Due to code generation errors, optimization must be turned off:

```java
Context context = Context.enter();
context.setOptimizationLevel(-1);
```

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Download the appropriate Rhino build and rename to `rhino.jar`

1) Download [`SheetJSRhino.zip`](pathname:///rhino/SheetJSRhino.zip) and unzip

2) Save the following code to `SheetJSRhino.java`:

```java title="SheetJSRhino.java"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import com.sheetjs.SheetJS;
import com.sheetjs.SheetJSFile;
import com.sheetjs.SheetJSSheet;

public class SheetJSRhino {
  public static void main(String args[]) throws Exception {
    try {
      SheetJS sjs = new SheetJS();

      /* open file */
      SheetJSFile xl = sjs.read_file(args[0]);

      /* get sheetnames */
      String[] sheetnames = xl.get_sheet_names();
      System.err.println(sheetnames[0]);

      /* convert to CSV */
      SheetJSSheet sheet = xl.get_sheet(0);
      String csv = sheet.get_csv();

      System.out.println(csv);

    } catch(Exception e) {
      throw e;
    } finally {
      SheetJS.close();
    }
  }
}
```

3) Assemble `SheetJS.jar` from the demo code:

```bash
javac -cp .:rhino.jar SheetJSRhino.java
jar -cf SheetJS.jar SheetJSRhino.class com/sheetjs/*.class
```

4) Download <https://sheetjs.com/pres.xlsx> and test:

```bash
java -cp .:SheetJS.jar:rhino.jar SheetJSRhino pres.xlsx
```

</details>

## Legacy Engines

:::warning

These examples were written when the engines were maintained. New projects
should not use these engines. The demos are included for legacy deployments.

:::

### ChakraCore

:::caution

ChakraCore was an open source JavaScript engine released by Microsoft. It was a
fork of the Chakra engine that powered Internet Explorer.  When Microsoft Edge
switched to become a fork of Chromium, Microsoft stopped providing support.

:::

ChakraCore is an embeddable JS engine written in C++.  The library and binary
distributions include a command-line tool `chakra` for running JS scripts.

The simplest way to interact with the engine is to pass Base64 strings. The make
target builds a very simple payload with the data.

:::note

The official release includes the `ch` standalone binary.  While applications
should link against the official libraries, the standalone tool is useful for
verifying functionality.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

Due to limitations of the standalone binary, this demo will encode a test file
as a Base64 string and directly add it to an amalgamated script.

0) Download and extract the ChakraCore release ZIP.  Copy the binary (`bin/ch`)
   to your project folder.

1) Download the standalone script, shim, and test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Bundle the test file and create `payload.js`:

```bash
node -e "fs.writeFileSync('payload.js', 'var payload = \"' + fs.readFileSync('pres.numbers').toString('base64') + '\";')"
```

3) Create support scripts:

- `global.js` creates a `global` variable:

```js title="global.js"
var global = (function(){ return this; }).call(null);
```

- `chakra.js` will call `XLSX.read` and `XLSX.utils.sheet_to_csv`:

```js title="chakra.js"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
var wb = XLSX.read(payload, {type:'base64'});
console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
```

4) Create the amalgamation `xlsx.chakra.js`:

```bash
cat global.js xlsx.full.min.js payload.js chakra.js > xlsx.chakra.js
```

The final script defines `global` before loading the standalone library.  Once
ready, it will read the bundled test data and print the contents as CSV.

5) Run the script using the ChakraCore standalone binary:

```
./ch xlsx.chakra.js
```

</details>


### Nashorn

:::caution

Nashorn shipped with Java 8.  It was deprecated in Java 11 and was officially
removed in JDK 15.  New Java applications should use [Rhino](#rhino).

:::


Nashorn ships with Java.  It includes a command-line tool `jjs` for running JS
scripts.  It is somewhat limited but does offer access to the full Java runtime.

The `load` function in `jjs` can load the minified source directly:

```js
var global = (function(){ return this; }).call(null);
load('xlsx.full.min.js');
```

The Java `nio` API provides the `Files.readAllBytes` method to read a file into
a byte array.  To use in `XLSX.read`, the demo copies the bytes into a plain JS
array and calls `XLSX.read` with type `"array"`.

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Ensure `jjs` is available on system path

1) Download the standalone script, the shim and the test file:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
<li><a href="https://sheetjs.com/pres.numbers">pres.numbers</a></li>
</ul>

2) Save the following script to `SheetJSNashorn.js`:

```js title="SheetJSNashorn.js"
/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */

/* load module */
var global = (function(){ return this; }).call(null);
load('xlsx.full.min.js');

/* helper to convert byte array to plain JS array */
function b2a(b) {
  var out = new Array(b.length);
  for(var i = 0; i < out.length; i++) out[i] = (b[i] < 0 ? b[i] + 256 : b[i]);
  return out;
}

function process_file(path) {
  java.lang.System.out.println(path);

  /* read file */
  var path = java.nio.file.Paths.get(path);
  var bytes = java.nio.file.Files.readAllBytes(path);
  var u8a = b2a(bytes);

  /* read data */
  var wb = XLSX.read(u8a, {type:"array"});

  /* get first worksheet as an array of arrays */
  var ws = wb.Sheets[wb.SheetNames[0]];
  var js = XLSX.utils.sheet_to_json(ws, {header:1});

  /* print out every line */
  js.forEach(function(l) { java.lang.System.out.println(JSON.stringify(l)); });
}

process_file('pres.numbers');
```

3) Test the script:

```bash
jjs SheetJSNashorn.js
```

It will print out the first worksheet contents.

</details>
