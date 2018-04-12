#!/usr/bin/env node

const { pkg_conf, BASE, resolve } = require('./cli-utils')

const program = require('commander');

program
  .version(pkg_conf.version)
  .parse(process.argv);



