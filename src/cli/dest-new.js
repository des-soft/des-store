#!/usr/bin/env node
const { 
        pkg_conf, resolve, tpl 
    } = require('./cli-utils')
    , child_process = require('child_process')
    , program = require('commander')
    , path = require('path')
    , fs = require('fs')
    

/**
 * @description 创建 daily 
 * @param { String } file_name 
 */
async function newDaily(file_name){
    let love_base = resolve('store/love'); 

    let daily_init = tpl.daily({
        title: file_name, 
        time: (new Date()).toString(), 
        from: 'eczn', 
        to: 'deswan', 
        theme: 'pure'
    }); 

    // Write File 
    let daily_path = path.join(love_base, file_name + '.md'); 

    if (fs.existsSync(daily_path)){
        console.log(`  Error: 文件已存在, 换个名字把;`); 
        console.log(`  ${daily_path}`); 
        return; 
    }

    fs.writeFileSync(daily_path, daily_init, 'utf-8'); 

    // Log 
    console.log('File Generated:'); 
    console.log('  ' + daily_path)
    console.log('  '); 

    // Start VSCode 
    console.log('Starting Editor ... '); 
    child_process.exec(`code ${ resolve() } ${ daily_path }`); 
}

program
    .version(pkg_conf.version)
    .arguments('[file_name]')
    .action(newDaily)
    .parse(process.argv);
// 



