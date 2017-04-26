# `generator-android-lib`
[![License][license-image]][license-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]<br>[![NSP Status][nsp-image]][nsp-url]
[![Dependency Status][daviddm-image]][daviddm-url] [![Dependency Status][daviddm-dev-image]][daviddm-dev-url]

> ![Android Bot][android-bot-img] Scaffold an Android library (`.aar`) with boilerplate code including CLI tasks that build, test, and deploy with quality gates, CI-services, and dependency management.

## Table of contents

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of contents](#table-of-contents)
- [1. Features](#1-features)
- [2. Installation](#2-installation)
- [3. Usage](#3-usage)
	- [3.1. Running tests](#31-running-tests)
	- [3.2. Publishing your library](#32-publishing-your-library)
- [4. Extend this generator](#4-extend-this-generator)
	- [4.1. Debugging](#41-debugging)
	- [4.2. Options](#42-options)
- [5. Sub-generators](#5-sub-generators)
- [6. Contributors](#6-contributors)
- [7. License](#7-license)

<!-- /TOC -->

## 1. Features

`generator-android-lib` creates a base template to start a new Android library (`.aar`).

* [License](https://spdx.org/licenses/) selection with many SPDX options
* [Gradle](http://www.gradle.org/) build (with support of optional and provided dependencies)
* [Maven central](http://search.maven.org/) compatible artifacts (aar, sources, javadocs)
* Ready for [spock](http://spockframework.org) tests ([documentation](http://docs.spockframework.org))
* [Bintray](https://bintray.com/) publication (+ jars signing and maven central publishing)
* [Travis-CI](https://travis-ci.org/) integration (CI and healthy badge)
* [Coveralls](http://coveralls.io/) integration (code coverage badge)
* Target jdk compatibility check with [animal sniffer](http://mojo.codehaus.org/animal-sniffer/) (you may use newer jdk to build, and keep compatibility with older jdk)
* Code quality checks ([checkstyle](http://checkstyle.sourceforge.net/), [pmd](http://pmd.sourceforge.net/), [findbugs](http://findbugs.sourceforge.net/))
* [Release process](https://github.com/researchgate/gradle-release#introduction) (like maven release)

## 2. Installation

```
$ npm install --global generator-android-lib
```


## 3. Usage

> :warning: **This template generates files in the current working directory.**
>
> Be sure to change to a new directory first if you don't want to overwrite existing files.

```
$ yo android-lib
```

That'll generate a project with all the common tools setup. This includes:

* Android Studio-compatible source code
* Ready-to-run `*.`
* JUnit, Robolectric, and Jacoco unit test and code coverage (optionally tracked on [Coveralls](https://coveralls.io/))
* Linters
    * [`checkstyle`](https://github.com/checkstyle/checkstyle) for code standards
    * [`PMD`](http://pmd.sourceforge.net/) for complexity analysis
    * [`FindBugs`](http://findbugs.sourceforge.net/) for potential defects
* [GitHub](https://github.com) repository set-up, including
    * GitHub Issue labels with [git-labelmaker](https://github.com/himynameisdave/git-labelmaker)
    * [`github-changelog-generator`](https://github.com/skywinder/github-changelog-generator)
* A `README.md` with [Badges](https://www.npmjs.com/package/generator-badges)
* [Travis CI](https://travis-ci.org/) continuous integration (optional)
* An SPDX [License](https://spdx.org/licenses/)
* [JCenter](https://bintray.com/bintray/jcenter) binary publication

### 3.1. Running tests

Once the project is scaffolded, inside the project folder run:

```
$ ./gradlew test
```

### 3.2. Publishing your library

Once your tests are passing (ideally with Travis CI and and Coveralls green runs), you might be ready to publish your code to [JCenter](https://bintray.com/bintray/jcenter). We recommend you using [npm version](https://docs.npmjs.com/cli/version) to tag release correctly.

```
$ # TODO: add version bump command
$ git push --follow-tags
# ATTENTION: There is no turning back here.
$ # TODO: add publish command
```

## 4. Extend this generator

First of all, make sure you're comfortable with [Yeoman composability](http://yeoman.io/authoring/composability.html) feature. Then in your own generator:

```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator({
  default() {
    this.composeWith(require.resolve('generator-android-lib/generators/app'), {
      /* provide the options you want */
    });
  }
});
```

### 4.1. Debugging
> #### :bug: Debug `generator-android-lib`
> Running into problems? Read
> 1. :book: [_How to debug Yeoman generators_](https://github.com/gregswindle/generator-android-lib/wiki/How-to-debug-Yeoman-generators) for instructions on debugging with `node-inspector` and Chrome dev-tools.
> 2. :book: [_Debugging Generators_](http://yeoman.io/authoring/debugging.html) (official documentation).

### 4.2. Options

Here's a list of our supported options:

- `boilerplate` (Boolean, default true) include or not the Android Studio directories and files
- `linters` (Boolean, default true) include or not `checkstyle`, `PMD`, and `FindBugs`
- `git` (Boolean, default true) include or not the git files (`.gitattributes`, `.gitignore`).
- `license` (Boolean, default true) include or not a `LICENSE` file.
- `travis` (Boolean, default true) include or not a `.travis.yml` file.
- `githubAccount` (String) Account name for GitHub repo location.
- `readme` (String) content of the `README.md` file. Given this option, generator-android-lib will still generate the title (with badges) and the license section.


## 5. Sub-generators

If you don't need all the features provided by the main generator, you can still use a limited set of features by composing with our sub generators directly.

Remember you can see the options of each sub generators by running `yo android-lib:sub --help`.

- `android-lib:boilerplate`
- `android-lib:linters`
- `android-lib:git`
- `android-lib:security` installs the [OWASP LAPSE+ Project](https://www.owasp.org/index.php/OWASP_LAPSE_Project)
- `android-lib:readme`

## 6. Contributors

### 6.1. Authors

* [Greg Swindle](https://github.com/gregswindle) and
* [Mukesh Korat](https://github.com/mkorat1717).

### 6.2. You? Contribute to `generator-vz-lib-android`

We warmly welcome collaboration with the inclusive [Contributor Covenant Code of Conduct](./.github/CODE_OF_CONDUCT.md).

If you want help us out with defect reports, documentation, development, or testing, please read the [CONTRIBUTING](./.github/CONTRIBUTING.md) document.

### 6.3. About `generator-android-lib`

This generator was inspired by:

* [`cesarferreira/generator-android-library`](https://github.com/cesarferreira/generator-android-library) We originally forked this, but soon decided to start over: its dependencies are so outdated, refactoring would essentially be a rewrite. :person_frowning:
* [`xvik/generator-lib-java`](https://github.com/xvik/generator-lib-java) Great features, Android's' idiosyncrasies demand different dependencies. :alien:
* [`yeoman/generator-node`](https://github.com/yeoman/generator-node) `generator-android-lib` basically plagiarizes `generator-node`. :stuck_out_tongue_winking_eye:

## 7. License

[Apache 2.0](./LICENSE) © [Greg Swindle](https://github.com/gregswindle) and [Mukesh Korat](https://github.com/mkorat1717).

---

[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[android-bot-img]: https://github.com/gregswindle/generator-android-lib/wiki/images/ic_android_black_18dp_1x.png
[coveralls-image]: https://coveralls.io/repos/github/gregswindle/generator-android-lib/badge.svg
[coveralls-url]: https://coveralls.io/github/gregswindle/generator-android-lib
[daviddm-dev-image]: https://david-dm.org/gregswindle/generator-android-lib/dev-status.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/gregswindle/generator-android-lib&type=dev
[daviddm-image]: https://david-dm.org/gregswindle/generator-android-lib.svg?theme=shields.io&style=flat-square
[daviddm-url]: https://david-dm.org/gregswindle/generator-android-lib
[greenkeeper-image]: https://badges.greenkeeper.io/gregswindle/generator-android-lib.svg?style=flat-square
[greenkeeper-url]: https://greenkeeper.io/
[license-image]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square
[license-url]: https://github.com/gregswindle/generator-android-lib/blob/master/LICENSE
[npm-image]: https://badge.fury.io/js/generator-android-lib.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-android-lib
[nsp-image]: https://nodesecurity.io/orgs/gregswindle/projects/99d5753c-b68e-46a4-9b25-6cfb0ba937dd/badge?style=flat-square
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/99d5753c-b68e-46a4-9b25-6cfb0ba937dd
[travis-image]: https://travis-ci.org/gregswindle/generator-android-lib.svg?branch=master&style=flat-square
[travis-url]: https://travis-ci.org/gregswindle/generator-android-lib
