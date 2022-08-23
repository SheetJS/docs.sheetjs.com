---
sidebar_position: 4
hide_table_of_contents: true
---

# Testing

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

`make test` will run the node-based tests.  By default it runs tests on files in
every supported format.  To test a specific file type, set `FMTS` to the format
you want to test.  Feature-specific tests are available with `make test_misc`

```bash
$ make test_misc   # run core tests
$ make test        # run full tests
```

To enable all errors, set the environment variable `WTF=1`:

```bash
$ make test        # run full tests
$ WTF=1 make test  # enable all error messages
```

`flow` and `eslint` checks are available:

```bash
$ make lint        # eslint checks
$ make tslint      # check TS definitions
```

  </TabItem>
  <TabItem value="browser" label="Browser">

The core in-browser tests are available at `tests/index.html` within this repo.
Start a local server and navigate to that directory to run the tests.
`make ctestserv` will start a server on port 8000.

`make ctest` will generate the browser fixtures.  To add more files, edit the
`tests/fixtures.lst` file and add the paths.

  </TabItem>
  <TabItem value="bun" label="Bun">

`make test-bun` will run the full Bun test suite and `make test-bun_misc`
will run the smaller feature-specific tests.

  </TabItem>
  <TabItem value="deno" label="Deno">

`make test-deno` will run the full Deno test suite and `make test-deno_misc`
will run the smaller feature-specific tests.

  </TabItem>
  <TabItem value="extendscript" label="Extendscript">

`make dist` will build `xlsx.extendscript.js`.

The script `estk.jsx` at the root of the project is configured to run in
ExtendScript Toolkit.  It will read `sheetjs.xlsx` and attempt to write test
files in a number of file formats.

ExtendScript Toolkit 3.5 is available as a standalone download for Windows.

  </TabItem>
</Tabs>

### Tested Environments

<details>
  <summary>(click to show)</summary>

 - NodeJS `0.8`, `0.10`, `0.12`, `4.x`, `5.x`, `6.x`, `7.x`, `8.x`
 - IE 6/7/8/9/10/11 (IE 6-9 require shims)
 - Chrome 24+ (including Android 4.0+)
 - Safari 6+ (iOS and Desktop)
 - Edge 13+, FF 18+, and Opera 12+

Tests utilize the mocha testing framework.

 - <https://saucelabs.com/u/sheetjs> for XLS\* modules using Sauce Labs

The test suite also includes tests for various time zones.  To change
the timezone locally, set the `TZ` environment variable:

```bash
$ env TZ="Asia/Kolkata" WTF=1 make test_misc
```

</details>

### Test Files

Test files are housed in [another repo](https://github.com/SheetJS/test_files).

Running `make init` will refresh the `test_files` submodule and get the files.
Note that this requires `svn`, `git`, `hg` and other commands that may not be
available.  If `make init` fails, please download the latest version of the test
files snapshot from [the repo](https://github.com/SheetJS/test_files/releases)

#### Latest Snapshot

<http://github.com/SheetJS/test_files/releases/download/20170409/test_files.zip>

(download and unzip to the `test_files` subfolder)

