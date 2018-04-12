const pkg_conf = require('../../../package.json')
    , path = require('path')
    , fs = require('fs')
    , HOMEDIR = require('./homedir')
    , HOMEDIR_CONFIG_PATH = path.join(HOMEDIR, 'config.json')
    , copy = require('./file-copy')
    , mkdir = require('./mkdir')
    

/**
 * @description 获取配置 
 * @returns { { git_uri: String, git_base: String } } 配置
 */
function getConfig() {
    if (getConfig.__cache) return getConfig.__cache; 

    let config = JSON.parse(
        fs.readFileSync(HOMEDIR_CONFIG_PATH, 'utf-8').toString()
    ); 

    getConfig.__cache = config; 
    return getConfig.__cache; 
}

/**
 * @description 设置 config 
 * @param { String | Object } json 
 */
function setConfig(json) {
    if (typeof json === 'object') json = JSON.stringify(json); 

    fs.writeFileSync(HOMEDIR_CONFIG_PATH, json, 'utf-8'); 

    // 清空缓存 
    getConfig.__cache = null; 
}

/**
 * @description 嗯... 
 * @param { String } $ 
 * @returns { String }
 */
function resolve(...$){
    let config = getConfig(); 
    return path.join(config.git_base, ...$); 
}

const getSize = require('get-folder-size'); 
function fsize(...args){
    return new Promise((res, rej) => {
        args.push((err, size) => {
            if (err) {
                rej(err);
            } else {
                res(size); 
            }
        }); 

        getSize(...args); 
    }); 
}

module.exports = {
    pkg_conf, path, resolve, HOMEDIR, 
    copy, mkdir, HOMEDIR_CONFIG_PATH,
    setConfig, getConfig, fsize
}
