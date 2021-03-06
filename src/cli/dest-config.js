#!/usr/bin/env node

const { 
    pkg_conf, BASE, resolve,
    HOMEDIR, copy, mkdir, 
    HOMEDIR_CONFIG_PATH, 
    setConfig, getConfig
} = require('./cli-utils')

const path = require('path')
const program = require('commander');
const fs = require('fs'); 
const Gitstore = require('des-gitstore');

function readFile(file){
    let json = null, data; 
    try {
        json = fs.readFileSync(file, 'utf-8')
    } catch (err){
        console.log(`  找不到文件 ${file}`); 
        console.log(`  usage: dest config <config_file>`); 
        process.exit(1); 
    }

    try {
        data = JSON.parse(json); 
    } catch (err){
        console.log('  JSON.parse 失败, 需要 json 数据'); 
        process.exit(1); 
    }

    return {
        json, data
    } 
}

function logConfig(){
    let config = null; 
    try {
        config = getConfig(); 
        // Config Log 
        console.log('Now Config'); 
        Object.keys(config).forEach(key => {
            console.log('  -', key.padStart(8), ':', config[key]); 
        });
        console.log(' '); 
    } catch (err) {
        console.log('  Config Not Found. Please Run dest config <config_file> to set config. '); 
    }
}

program
    .version(pkg_conf.version)
    .usage('<your_config_file>')
    .arguments('[config_file]')
    .action(async config_file => {
        let { json, data } = readFile(config_file); 
        
        let {
            git_base, git_uri 
        } = data; 
        
        console.log('Config Checker:'); 
        console.log(`  [√] git_base: ${git_base}`); 
        console.log(`  [√] git_uri: ${git_uri}\n\n`); 

        let g = new Gitstore(git_base, git_uri, true); 
        await g.ready; 
        
        let store = path.join(g.git_base, 'store'); 
        let love = path.join(store, 'love'); 
        let mailImg = path.join(store, 'mail-img'); 

        mkdir(store); 
        mkdir(love);
        mkdir(mailImg); 

        data.git_base = g.git_base; 
        setConfig(data); 

        console.log('\n'); 
        console.log(`All Configed, Run "dest help" for more usage`);
    })
    .parse(process.argv);


// 
const help = `
  Usage:
    - Set Config: 
      dest config <your_config_file>

    - Get Config: 
      dest config -p, --preview 
`

if (!process.argv.slice(2).length) {
    program.outputHelp(text => {
        logConfig(); 
        return ''; 
    });
}
