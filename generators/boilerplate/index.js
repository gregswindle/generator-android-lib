'use strict';
const {extend, round} = require('lodash');
const Generator = require('yeoman-generator');
// Const shell = require('shelljs');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'The new package name.',
      default: 'library'
    });

    this.option('description', {
      type: String,
      required: true,
      desc: 'Summary of the Android library\'s features and overall value.',
      default: '`generator-android-lib` boilerplate Android library.'
    });

    this.option('copyrightYear', {
      type: String,
      required: true,
      desc: 'Copyright year.',
      default: new Date().getFullYear()
    });

    this.option('package', {
      type: String,
      required: true,
      desc: 'Android library\'s package'
    });

    this.option('targetSdkVersion', {
      type: Number,
      required: true,
      desc: 'Target SDK version.'
    });

    this.option('minSdkVersion', {
      type: Number,
      required: true,
      desc: 'Minimum SDK version.'
    });

    this.option('version', {
      type: String,
      required: true,
      desc: 'Android library version.',
      default: this.options.version
    });

    this.option('versionCode', {
      type: Number,
      required: true,
      desc: 'Android library version code.'
    });

    this.option('compileSdkVersion', {
      type: Number,
      required: true,
      desc: 'Target SDK version.',
      when: !this.options.compileSdkVersion
    });

    this.option('buildToolsVersion', {
      type: String,
      required: true,
      desc: 'Build tools version.'
    });
  }

  initializing() {
    // Pre set the default props from the information we have at this point
    this.props = extend(this.props, this.options);
  }

  _calcVersionCode(semver) {
    if (!semver) {
      return 1000;
    }
    return parseInt(round(
      semver.replace(/^0\./, '')
            .replace(/\./g, ''), 3) * 100, 10);
  }

  // _getBuildToolsVersions(targetSdkVersion) {
  //   // - sdkmanager --list | grep -o -E '25\.[0-9]+\.[0-9]+\b'
  //   // - const cmd = `sdkmanager --list | grep -o -E '${targetSdkVersion}\.[0-9]+\.[0-9]+\b'`;
  //   // - sdkmanager --list | sed -e 's/(25.[0-9]+.[0-9]+\b).*\n/25.[0-9]+.[0-9]+,/g'
  //   return new Promise((resolve, reject) => {
  //     const cmd = `echo $(sdkmanager --list | grep -o -E '${targetSdkVersion}.[0-9]+.[0-9]') 2> /dev/null`;
  //     return shell.exec(cmd, (code, stdout, stderr) => {
  //       console.log('Exit code:', code);
  //       console.log('Program output:', stdout);
  //       console.log('Program stderr:', stderr);
  //       if (stdout) {
  //         return resolve(stdout.split(/\s+/ig));
  //       } else if (stderr) {
  //         reject(new Error(stderr));
  //       }
  //     });
  //   });
  // }

  _askFor() {
    const prompts = [{
      name: 'description',
      message: 'Description',
      when: !this.props.description
    }, {
      name: 'package',
      message: 'Android library package',
      when: !this.props.package,
      store: true
    }, {
      name: 'targetSdkVersion',
      message: 'Target SDK version',
      when: !this.props.targetSdkVersion,
      default: 25,
      store: true
    }, {
      name: 'minSdkVersion',
      message: 'Minimum SDK version',
      when: !this.props.minSdkVersion,
      default: 23,
      store: true
    }, {
      name: 'version',
      message: 'Library\'s semantic version',
      when: !this.props.version,
      store: true
    }/* , {
      name: 'buildToolsVersion',
      type: 'list',
      message: 'Build tools version',
      choices: [this.props.targetSdkVersion + '.0.0']
    } */];

    // This._getBuildToolsVersions(this.targetSdkVersion)
    //   .then(data => {
    //     prompts[prompts.length - 1] = data;
    //   });

    return this.prompt(prompts).then(props => {
      props.buildToolsVersion = props.targetSdkVersion + '.0.0';
      this.props = extend(this.props, props);
    });
  }

  prompting() {
    return this._askFor()
      .then(() => {
        this.props.versionCode = this._calcVersionCode(this.options.versionCode);
        return Promise.resolve();
      });
  }

  writing() {
    // Root directory files
    if (this.props.includeCodecov) {
      this.fs.copy(
        this.templatePath('codecov.yml'),
        this.destinationPath(this.options.generateInto, '.codecov.yml')
      );
    }

    this.fs.copy(
      this.templatePath('gradle.properties'),
      this.destinationPath(this.options.generateInto, 'gradle.properties')
    );

    this.fs.copy(
      this.templatePath('gradlew'),
      this.destinationPath(this.options.generateInto, 'gradlew')
    );

    this.fs.copy(
      this.templatePath('gradlew.bat'),
      this.destinationPath(this.options.generateInto, 'gradlew.bat')
    );

    this.fs.copy(
      this.templatePath('deploy.gradle'),
      this.destinationPath(this.options.generateInto, 'deploy.gradle')
    );

    this.fs.copy(
      this.templatePath('settings.gradle'),
      this.destinationPath(this.options.generateInto, 'settings.gradle')
    );

    this.fs.copyTpl(
      this.templatePath('build.gradle'),
      this.destinationPath(this.options.generateInto, 'build.gradle'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_sonar-project.properties'),
      this.destinationPath(this.options.generateInto, 'sonar-project.properties'),
      this.props
    );

    // ROOT/gradle/**
    this.fs.copy(
      this.templatePath('gradle/**'),
      this.destinationPath(this.options.generateInto, 'gradle')
    );

    // ROOT/.github
    this.fs.copy(
      this.templatePath('.github/**'),
      this.destinationPath(this.options.generateInto, '.github')
    );

    // ROOT/library
    this.fs.copyTpl(
      this.templatePath('library/**'),
      this.destinationPath(this.options.generateInto, 'library'),
      this.props
    );
  }
};
