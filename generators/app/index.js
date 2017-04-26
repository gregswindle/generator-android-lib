'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const githubUsername = require('github-username');
const path = require('path');
const askName = require('inquirer-npm-name');
const chalk = require('chalk');
const pkgJson = require('../../package.json');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('travis', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include travis config'
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include boilerplate files'
    });

    this.option('coveralls', {
      type: Boolean,
      required: false,
      desc: 'Include coveralls config'
    });

    this.option('license', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include a license'
    });

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('githubAccount', {
      type: String,
      required: false,
      desc: 'GitHub username or organization'
    });

    this.option('projectRoot', {
      type: String,
      required: false,
      default: 'library',
      desc: 'Relative path to the project code root'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert in the README.md file'
    });
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      const info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  }

  _askForProjectName() {
    if (this.pkg.name || this.options.name) {
      this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      return Promise.resolve();
    }

    return askName({
      name: 'name',
      message: 'Project Name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate(str) {
        return str.length > 0;
      }
    }, this).then(answer => {
      this.props.name = answer.name;
    });
  }

  _askFor() {
    const prompts = [{
      name: 'description',
      message: 'Description',
      when: !this.props.description
    }, {
      name: 'homepage',
      message: 'Project homepage url',
      when: !this.props.homepage
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.props.authorName,
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.props.authorEmail,
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.props.authorUrl,
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.pkg.keywords,
      filter(words) {
        return words.split(/\s*,\s*/g);
      }
    }, {
      name: 'includeCoveralls',
      type: 'confirm',
      message: 'Send coverage reports to coveralls?',
      when: this.options.coveralls === undefined,
      default: false
    }, {
      name: 'includeCodecov',
      type: 'confirm',
      message: 'Send coverage reports to Codecov?',
      when: this.options.codecov === undefined
    }, {
      name: 'copyrightYear',
      type: Number,
      message: 'Copyright year',
      when: this.options.copyrightYear === undefined,
      default: new Date().getFullYear()
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _askForGithubAccount() {
    if (this.options.githubAccount) {
      this.props.githubAccount = this.options.githubAccount;
      return Promise.resolve();
    }

    return githubUsername(this.props.authorEmail)
      .then(username => username, () => '')
      .then(username => {
        return this.prompt({
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }).then(prompt => {
          this.props.githubAccount = prompt.githubAccount;
        });
      });
  }

  prompting() {
    return this._askForProjectName()
      .then(this._askFor.bind(this))
      .then(this._askForGithubAccount.bind(this));
  }

  writing() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    const pkg = extend({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [this.options.projectRoot],
      main: path.join(this.options.projectRoot, 'index.js').replace(/\\/g, '/'),
      keywords: [],
      devDependencies: {}
    }, currentPkg);

    if (this.props.includeCoveralls) {
      pkg.devDependencies.coveralls = pkgJson.devDependencies.coveralls;
    }

    if (this.props.includeCodecov) {
      pkg.devDependencies.codecov = pkgJson.devDependencies.codecov;
    }

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  default() {
    if (this.options.license && !this.pkg.license) {
      this.composeWith(require.resolve('generator-license/app'), {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      });
    }

    this.composeWith(require.resolve('../git'), {
      name: this.props.name,
      githubAccount: this.props.githubAccount
    });

    if (this.options.boilerplate) {
      this.composeWith(require.resolve('../boilerplate'), this.props);
    }

    if (!this.fs.exists(this.destinationPath('README.md')) || this.options.readme) {
      this.composeWith(require.resolve('../readme'), {
        name: this.props.name,
        description: this.props.description,
        githubAccount: this.props.githubAccount,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl,
        coveralls: this.props.includeCoveralls,
        codecov: this.props.includeCodecov,
        content: this.options.readme,
        copyrightYear: this.props.copyrightYear,
        license: this.options.license
      });
    }

    if (this.options.travis) {
      let options = {config: {}};
      if (this.props.includeCoveralls) {
        options.config.after_script = 'cat ./coverage/lcov.info | coveralls'; // eslint-disable-line camelcase
      } else if (this.props.includeCodecov) {
        const androidVersion = 'android-' + (this.props.targetSdkVersion || 25);
        const components = [
          'platform-tools',
          'tools',
          'build-tools-' + androidVersion + '.0.0',
          androidVersion,
          'extra-android-m2repository',
          'sys-img-armeabi-v7a-' + androidVersion
        ];
        const travisTmplPath = path.resolve(__dirname, '../boilerplate/templates/travis.yml');
        const travisTmpl = yaml.safeLoad(fs.readFileSync(travisTmplPath, 'utf8'));
        delete travisTmpl.node_js;
        travisTmpl.language = 'android';
        travisTmpl.env.global.ANRDOID_TARGET = androidVersion;
        travisTmpl.android.components = components;
        options.config = travisTmpl;
      }
      this.composeWith(require.resolve('generator-travis/generators/app'), options);
    }
  }

  installing() {
    this.npmInstall();
  }

  end() {
    this.log('Thanks for using generator-android-lib.');

    if (this.options.travis) {
      const travisUrl = chalk.cyan(`https://travis-ci.org/profile/${this.props.githubAccount || ''}`);
      this.log(`- Enable Travis integration at ${travisUrl}`);
    }

    if (this.props.includeCoveralls) {
      const coverallsUrl = chalk.cyan('https://coveralls.io/repos/new');
      this.log(`- Enable Coveralls integration at ${coverallsUrl}`);
    }

    if (this.props.includeCodecov) {
      const codecovUrl = chalk.cyan(`https://codecov.io/gh/${this.props.githubAccount}/+`);
      this.log(`- Enable Codecov integration at ${codecovUrl}`);
    }
  }
};
