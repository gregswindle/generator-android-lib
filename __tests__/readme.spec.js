'use strict';
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('android-lib:readme', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: true,
        codecov: true,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('package.json'), {
          license: 'MIT'
        });
      });
  });

  it('creates and fill contents in README.md', () => {
    assert.file('README.md');
    // Assert.fileContent('README.md', 'const myProject = require(\'my-project\');');
    assert.fileContent('README.md', '> a cool project');
    assert.fileContent('README.md', '$ npm install -g my-project');
    assert.fileContent('README.md', '[MIT](./LICENSE) :copyright: 2017 [Yeoman](http://yeoman.io)');
    assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg');
    assert.fileContent('README.md', 'coveralls');
  });
});

describe('android-lib:readme --content', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: true,
        content: 'My custom content',
        codecov: true,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('package.json'), {
          license: 'MIT'
        });
      });
  });

  it('fill custom contents in README.md', () => {
    assert.file('README.md');
    assert.fileContent('README.md', 'My custom content');
    assert.fileContent('README.md', '[MIT](./LICENSE) :copyright: 2017 [Yeoman](http://yeoman.io)');
    assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg');
    assert.fileContent('README.md', 'coveralls');
    assert.fileContent('README.md', 'codecov');
  });
});

describe('android-lib:readme --no-coveralls', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: false,
        codecov: true,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('package.json'), {
          license: 'MIT'
        });
      });
  });

  it('does not include coveralls badge README.md', () => {
    assert.noFileContent('README.md', 'coveralls');
  });
});

describe('android-lib:readme --generate-into', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: true,
        generateInto: 'other/',
        codecov: true,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
          license: 'MIT'
        });
      });
  });

  it('creates and fill contents in README.md', () => {
    assert.file('other/README.md');
    // Assert.fileContent('other/README.md', 'const myProject = require(\'my-project\');');
    assert.fileContent('other/README.md', '> a cool project');
    assert.fileContent('other/README.md', '$ npm install -g my-project');
    assert.fileContent('other/README.md', '[MIT](./LICENSE) :copyright: 2017 [Yeoman](http://yeoman.io)');
    assert.fileContent('other/README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg');
    assert.fileContent('other/README.md', 'coveralls');
  });
});

describe('android-lib:readme --content and --generate-into', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: true,
        content: 'My custom content',
        generateInto: 'other/',
        codecov: true,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
          license: 'MIT'
        });
      });
  });

  it('fill custom contents in README.md', () => {
    assert.file('other/README.md');
    assert.fileContent('other/README.md', 'My custom content');
    assert.fileContent('other/README.md', '[MIT](./LICENSE) :copyright: 2017 [Yeoman](http://yeoman.io).');
    assert.fileContent('other/README.md', '[travis-image]: https://travis-ci.org/yeoman/my-project.svg');
    assert.fileContent('other/README.md', 'coveralls');
  });
});

describe('android-lib:readme --no-coveralls and --generate-into', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/readme'))
      .withOptions({
        name: 'my-project',
        description: 'a cool project',
        githubAccount: 'yeoman',
        authorName: 'Yeoman',
        authorUrl: 'http://yeoman.io',
        coveralls: false,
        generateInto: 'other/',
        codecov: false,
        copyrightYear: 2017
      })
      .on('ready', gen => {
        gen.fs.writeJSON(gen.destinationPath('other/package.json'), {
          license: 'MIT'
        });
      });
  });

  it('does not include coveralls badge README.md', () => {
    assert.noFileContent('other/README.md', 'coveralls');
  });
});
