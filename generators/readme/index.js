'use strict';
const {merge} = require('lodash');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name',
      when: !this.options.name
    });

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description',
      when: !this.options.description
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'User github account',
      when: !this.options.githubAccount
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name',
      when: !this.options.authorName
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: 'Author url',
      when: !this.options.authorUrl
    });

    this.option('coveralls', {
      type: Boolean,
      required: true,
      desc: 'Include coveralls badge',
      when: !this.options.coveralls || !this.options.includeCoveralls
    });

    this.option('codecov', {
      type: Boolean,
      required: true,
      desc: 'Include coveralls badge',
      when: !this.options.codecov || !this.options.includeCodecov
    });

    this.option('content', {
      type: String,
      required: false,
      desc: 'Readme content',
      when: !this.options.content
    });
  }

  writing() {
    const pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      {}
    );
    const options = merge(this.options, {
      githubRepository: this.options.githubAccount + '/' + this.options.name,
      license: pkg.license,
      content: this.options.content
    });
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      options
    );
  }
};
