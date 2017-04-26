# `<%= name %>`

> <%= description %>

[![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![NSP Status][nsp-image]][nsp-url]
<br>[![dependencies Status][daviddm-image]][daviddm-url] [![devDependencies Status][daviddm-dev-image]][daviddm-dev-url]

---
## 1. Installation

Install [Yeoman](http://yeoman.io) and the `<%= name %>` using [npm](https://www.npmjs.com/). (We assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
$ npm i -g yo
```

### 1.1. For developers modifying `<%= name %>` itself

To add and test new features on your workstation:

```bash
$ git clone https://github.com/<%= githubAccount %>/<%= name %>.git
$ cd <%= name %>
$ npm link
```

> #### :bug: How to debug Yeoman generators
> Running into problems? Read [_How to debug generator_](https://techblog.dorogin.com/how-to-debug-yeoman-generator-340e6e28b9a7) \[sic\] for instructions on debugging with `node-inspector` and Chrome dev-tools.

### 1.2. For general Java developers

If you just want to get work done, install `<%= name %>` globally on your workstation:

```bash
$ npm install -g <%= name %>
```

## 2. Create a new `Android` library project

To generate a new project, run the following command from the CLI:

```bash
$ yo android-library
```

## 3. Contributing to `<%= name %>`

We warmly welcome collaboration with the inclusive [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md).

If you want help us out with defect reports, documentation, development, or testing, please read the [CONTRIBUTING](./.github/CONTRIBUTING.md) document.

## 4. License

[The MIT License (MIT)](./LICENSE)

Copyright :copyright: <%= copyrightYear %>.

[coveralls-image]: https://coveralls.io/repos/cesarferreira/<%= name %>/badge.svg
[coveralls-url]: https://coveralls.io/r/cesarferreira/<%= name %>
[daviddm-dev-image]: https://david-dm.org/<%= githubAccount %>/<%= name %>/dev-status.svg
[daviddm-dev-url]:https://david-dm.org/<%= githubAccount %>/<%= name %>?type=dev
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= name %>/status.svg
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= name %>
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://github.com/<%= githubAccount %>/<%= name %>/blob/master/LICENSE
[npm-image]: https://badge.fury.io/js/<%= name %>.svg
[npm-url]: https://npmjs.org/package/<%= name %>
[nsp-image]: https://nodesecurity.io/orgs/<%= githubAccount %>/projects/4e3fc1cb-e119-4147-98fb-c258274b8682/badge
[nsp-url]: (https://nodesecurity.io/orgs/<%= githubAccount %>/projects/4e3fc1cb-e119-4147-98fb-c258274b8682
[travis-image]: https://travis-ci.org/<%= githubAccount %>/<%= name %>.svg
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= name %>
