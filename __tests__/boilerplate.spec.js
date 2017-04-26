'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('android-lib:boilerplate', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/boilerplate'))
      .withOptions({
        name: 'http-cookie-message-handler',
        description: '(De)serializes HttpCookies from/to JSON and manages HttpCookies.',
        copyrightYear: null,
        githubAccount: 'yo-yo-dyne'
      });
  });

  it('creates boilerplate files', () => {
    assert.file('build.gradle');
    assert.file('settings.gradle');
    assert.file('library/build.gradle');
    assert.file('library/jacoco.gradle');
    // Assert.file('library/.gitignore');
    // Assert.file('lib/__tests__/myModule.test.js');
    // assert.fileContent('lib/index.js', 'module.exports = {};');
    // assert.fileContent('lib/__tests__/myModule.test.js', 'const myModule');
    // assert.fileContent('lib/__tests__/myModule.test.js', 'describe(\'myModule\'');
  });
});

describe('android-lib:boilerplate', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/boilerplate'))
      .withOptions({
        name: 'http-cookie-message-handler',
        generateInto: 'library/',
        copyrightYear: 2016,
        githubAccount: 'Verizon'
      });
  });

  it('creates boilerplate files using another path', () => {
    // Assert.file('library/build.gradle');
    // assert.file('library/jacoco.gradle');
    // assert.file('library/.gitignore');
    // Assert.fileContent('other/lib/index.js', 'module.exports = {};');
    // assert.fileContent('other/lib/__tests__/myModule.test.js', 'const myModule');
    // assert.fileContent('other/lib/__tests__/myModule.test.js', 'describe(\'myModule\'');
  });
});
