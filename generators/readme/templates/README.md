# `<%= name %>`

> <%= description %>

[![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] <% if(coveralls) { -%>[![Coverage][coveralls-image]][coveralls-url]<% } -%> <% if(codecov) { -%>[![Coverage][codecov-image]][codecov-url]<% } -%> <br>[![dependencies Status][daviddm-image]][daviddm-url] [![devDependencies Status][daviddm-dev-image]][daviddm-dev-url]

---
<% if (!content) { -%>
## 1. Installation

```bash
$ npm install -g <%= name %>
```

## 2. Contributing to `<%= name %>`

We warmly welcome collaboration with the inclusive [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md).

If you want help us out with defect reports, documentation, development, or testing, please read the [CONTRIBUTING](./.github/CONTRIBUTING.md) document.

<% } else { -%> <%= content %> <% } -%>

## 3. License

[<%= license %>](./LICENSE) :copyright: <%= copyrightYear %> [<%= authorName %>](<%= authorUrl %>).

<% if(coveralls) { -%>[coveralls-image]: https://coveralls.io/repos/<%= githubRepository %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= githubRepository %><% } -%>
<% if(codecov) { -%>[codecov-image]: https://codecov.io/gh/<%= githubRepository %>/badge.svg
[codecov-url]: https://codecov.io/gh/<%= githubRepository %><% } -%>
[daviddm-dev-image]: https://david-dm.org/<%= githubRepository %>/dev-status.svg
[daviddm-dev-url]:https://david-dm.org/<%= githubRepository %>?type=dev
[daviddm-image]: https://david-dm.org/<%= githubRepository %>/status.svg
[daviddm-url]: https://david-dm.org/<%= githubRepository %>
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://github.com/<%= githubRepository %>/blob/master/LICENSE
[npm-image]: https://badge.fury.io/js/<%= githubRepository %>.svg
[npm-url]: https://npmjs.org/package/<%= githubRepository %>
[nsp-image]: https://nodesecurity.io/orgs/projects/4e3fc1cb-e119-4147-98fb-c258274b8682/badge
[nsp-url]: (https://nodesecurity.io/orgs/projects/4e3fc1cb-e119-4147-98fb-c258274b8682
[travis-image]: https://travis-ci.org/<%= githubRepository %>.svg
[travis-url]: https://travis-ci.org/<%= githubRepository %>
