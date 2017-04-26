'use strict';
const {extend} = require('lodash');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('android-lib:app', () => {
  beforeEach(() => {
    jest.mock('npm-name', () => {
      return () => Promise.resolve(true);
    });

    jest.mock('github-username', () => {
      return () => Promise.resolve('unicornUser');
    });

    jest.mock('generator-license/app', () => {
      const helpers = require('yeoman-test');
      return helpers.createDummyGenerator();
    });
  });

  describe('running on new project', () => {
    it('scaffold a full project from user-answers', () => {
      const answers = {
        name: 'generator-android-lib',
        description: 'An Android library generator',
        homepage: 'http://yeoman.io',
        githubAccount: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: ['android-lib', 'cookies'],
        includeCoveralls: true
      };
      return helpers.run(require.resolve('../generators/app'))
        .withPrompts(answers)
        .then(() => {
          assert.file([
            '.travis.yml',
            '.gitignore',
            '.gitattributes',
            'README.md'
          ]);

          assert.file('package.json');
          assert.jsonFileContent('package.json', {
            name: 'generator-android-lib',
            version: '0.0.0',
            description: answers.description,
            homepage: answers.homepage,
            repository: 'yeoman/generator-android-lib',
            author: {
              name: answers.authorName,
              email: answers.authorEmail,
              url: answers.authorUrl
            },
            files: ['library'],
            keywords: answers.keywords,
            main: 'library/index.js'
          });

          assert.file('README.md');
          assert.fileContent('README.md', '> An Android library generator');
          assert.fileContent('README.md', '$ npm install -g generator-android-lib');
          assert.fileContent('README.md', '[![Build Status][travis-image]][travis-url]');
          assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/yeoman/generator-android-lib.svg');
          assert.fileContent('README.md', '[travis-url]: https://travis-ci.org/yeoman/generator-android-lib');
          assert.fileContent('README.md', 'coveralls');
          assert.fileContent('.travis.yml', '| coveralls');
        });
    });
  });

  describe('running on existing project', () => {
    it('Keeps current Readme and extend package.json fields', () => {
      const pkg = {
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-android-lib',
        author: {
          name: 'Thomas Melchior',
          email: 'tmtm@mnml.nl',
          url: 'https://nowhere.imagination.com'
        },
        files: ['lib'],
        keywords: ['bar']
      };
      return helpers.run(require.resolve('../generators/app'))
        .withPrompts({name: 'generator-android-lib'})
        .on('ready', gen => {
          gen.fs.writeJSON(gen.destinationPath('package.json'), pkg);
          gen.fs.write(gen.destinationPath('README.md'), '## 4. License');
        })
        .then(() => {
          const newPkg = extend({name: 'generator-android-lib'}, pkg);
          assert.jsonFileContent('package.json', newPkg);
          assert.fileContent('README.md', '## 4. License');
        });
    });

    it('Handles variant package.json fields', () => {
      const pkg = {
        name: 'no-disco-future',
        version: '1.0.34',
        description: 'lots of fun',
        homepage: 'http://yeoman.io',
        repository: 'yeoman/generator-android-lib',
        author: 'Thomas Melchior tmtm@mnml.nl <thomas.melchior@mnml.nl> (https://nowhere.imagination.com)',
        files: ['lib'],
        keywords: ['bar']
      };
      return helpers.run(require.resolve('../generators/app'))
        .withOptions({name: 'generator-android-lib'})
        .on('ready', gen => {
          gen.fs.writeJSON(gen.destinationPath('package.json'), pkg);
          gen.fs.write(gen.destinationPath('README.md'), '## 4. License');
        })
        .then(() => {
          const newPkg = extend({name: 'generator-android-lib'}, pkg);
          assert.jsonFileContent('package.json', newPkg);
          assert.fileContent('README.md', '## 4. License');
        });
    });
  });

  describe('--no-travis', () => {
    it('skip .travis.yml', () => {
      return helpers.run(require.resolve('../generators/app'))
        .withOptions({travis: false})
        .then(() => assert.noFile('.travis.yml'));
    });
  });

  describe('--projectRoot', () => {
    it('include the raw files', () => {
      return helpers.run(require.resolve('../generators/app'))
        .withOptions({projectRoot: 'generators'})
        .then(() => {
          assert.jsonFileContent('package.json', {
            files: ['generators'],
            main: 'generators/index.js'
          });
        });
    });
  });
});
