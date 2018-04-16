#!/usr/bin/env node

const { pkg_conf, BASE, resolve } = require('./cli-utils')

const program = require('commander');

// console.log(process.argv); 

program
  .version(pkg_conf.version)
  .command('config <your_config_file>', '使用配置文件')
  .command('status', '查看 des-store 资源一览')
  .command('new', '创建资源') 
  .command('edit', '编辑 ...')
  .command('help', '使用方法')
  .command('look', '打开仓库的文件夹')
  .command('git', 'git tools')
  .option('-V, --V', '版本号')
  .parse(process.argv);
