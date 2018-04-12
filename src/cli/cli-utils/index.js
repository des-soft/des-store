const pkg_conf = require('../../../package.json')
    , path = require('path')
    , fs = require('fs')
    , BASE = path.join(__dirname, '../../')
    , resolve = (...paths) => path.join(BASE, ...paths)
    , HOMEDIR = require('./homedir')
    , HOMEDIR_CONFIG_PATH = path.join(HOMEDIR, 'config.json')
    , copy = require('./file-copy')
    , mkdir = require('./mkdir')
    

/**
 * @description 获取配置 
 * @returns { Object } 配置
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

module.exports = {
    pkg_conf, path, BASE, resolve, HOMEDIR, 
    copy, mkdir, HOMEDIR_CONFIG_PATH,
    setConfig, getConfig
}
