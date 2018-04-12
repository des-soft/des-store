#!/usr/bin/env node

const { pkg_conf, BASE, resolve } = require('./cli-utils')

const program = require('commander');

// console.log(process.argv); 

program
  .version(pkg_conf.version)
  .command('config', '使用配置文件')
  .command('status', '查看 des-store 资源一览')
  .command('new', '创建资源') 
  .command('list', '列出 des-store 资源')
  .command('help', '使用方法')
  .option('-V, --V', '版本号')
  .parse(process.argv);