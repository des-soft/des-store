#!/usr/bin/env node

const { pkg_conf, BASE, resolve } = require('./cli-utils')

const program = require('commander');

let todo_table = {
    daily(title){

    }, 
    img(){

    }
}

program
    .version(pkg_conf.version)
    .arguments('<target_obj> [title]')
    .action((target, title) => {
        console.log(target); 
        console.log(title); 
    })
    .parse(process.argv);
// 



