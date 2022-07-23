---
sidebar_position: 5
---

# Contributing

Due to the precarious nature of the Open Specifications Promise, it is very
important to ensure code is cleanroom.  [Contribution Notes](https://raw.githubusercontent.com/SheetJS/sheetjs/master/CONTRIBUTING.md)

<details>
  <summary><b>File organization</b> (click to show)</summary>

At a high level, the final script is a concatenation of the individual files in
the `bits` folder.  Running `make` should reproduce the final output on all
platforms.

Folders:

| folder       | contents                                                      |
|:-------------|:--------------------------------------------------------------|
| `bits`       | raw source files that make up the final script                |
| `bin`        | server-side bin scripts (`xlsx.njs`)                          |
| `dist`       | dist files for web browsers and nonstandard JS environments   |
| `demos`      | demo projects for platforms like ExtendScript and Webpack     |
| `tests`      | browser tests (run `make ctest` to rebuild)                   |
| `types`      | typescript definitions and tests                              |
| `misc`       | miscellaneous supporting scripts                              |
| `test_files` | test files (pulled from the test files repository)            |

</details>

After cloning the repo, running `make help` will display a list of commands.

## OS-Specific Setup

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="wsl" label="Windows WSL">

The OSX/Linux workflow works in WSL.  Initial setup is involved:

1) Install mercurial and subversion.

```bash
# Install support programs for the build and test commands
sudo add-apt-repository ppa:mercurial-ppa/releases
sudo apt-get update
sudo apt-get install mercurial subversion
sudo add-apt-repository --remove ppa:mercurial-ppa/releases
```

2) Install NodeJS

```bash
# Install bootstrap NodeJS and NPM within the WSL
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# CLOSE AND REOPEN SHELL BEFORE CONTINUING

# Switch to `n`-managed NodeJS
sudo npm i -g n
sudo n 16
```

3) follow <https://github.com/paul-nelson-baker/git-openssl-shellscript> to
build and install a version of Git with OpenSSL:

```bash
# Git does not support OpenSSL out of the box, must do this
curl -LO https://github.com/paul-nelson-baker/git-openssl-shellscript/raw/main/compile-git-with-openssl.sh
chmod +x compile-git-with-openssl.sh
./compile-git-with-openssl.sh
```

(instructions continued in the OSX/Linux part)

  </TabItem>
  <TabItem value="osx" label="OSX/Linux">

Initial setup:

0) Ensure mercurial, subversion, and NodeJS are installed. The WSL instructions
will have installed these dependencies, so WSL users can skip to step 1.

On Linux:

```bash
sudo apt-get install mercurial subversion
```

On MacOS, install using [`brew`](https://brew.sh/):

```bash
brew install mercurial subversion
```

NodeJS installers can be found at <https://nodejs.org/en/download/>

1) Install NodeJS modules for building the scripts

```bash
# Install dev dependencies
npm install

# Install global dependencies
sudo npm install -g mocha@2.5.3 voc @sheetjs/uglify-js
```

2) Initialize the test files:

```bash
make init
```

This step may take a while as it will be downloading a number of test files.

3) Run a short test, then run a build

```bash
# Short test
make test_misc

# Full Build
cd modules; make; cd ..
make dist
```

4) (For Deno testing) Install Deno:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

5) (For Bun testing) Install Bun:

```bash
curl https://bun.sh/install | bash
```

  </TabItem>
</Tabs>


## Development

The `xlsx.js` and `xlsx.mjs` files are constructed from the files in the `bits`
subdirectory. The build script (run `make`) will concatenate the individual
bits to produce the scripts.

To produce the dist files, run `make dist`.  The dist files are updated in each
version release and *should not be committed between versions*.

**A note on Older Versions**

Some of the dependencies are wildly out of date.  While SheetJS aims to run in
older versions of NodeJS and browsers, some libraries have chosen to break
backwards compatibility.  The specific versions are used because they are known
to work and known to produce consistent results.


## Tests

The `test_misc` target runs the targeted feature tests.  It should take 5-10
seconds to perform feature tests without testing against the full test battery.
New features should be accompanied with tests for the relevant file formats.

For tests involving the read side, an appropriate feature test would involve
reading an existing file and checking the resulting workbook object.  If a
parameter is involved, files should be read with different values to verify that
the feature is working as expected.

For tests involving a new write feature which can already be parsed, appropriate
feature tests would involve writing a workbook with the feature and then opening
and verifying that the feature is preserved.

For tests involving a new write feature without an existing read ability, please
add a feature test to the kitchen sink `tests/write.js`.

