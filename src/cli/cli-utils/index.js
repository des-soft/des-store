const pkg_conf = require('../../../package.json')
    , path = require('path')
    , BASE = path.join(__dirname, '../../')
    , resolve = (...paths) => path.join(BASE, ...paths)
    , HOMEDIR = require('./homedir')
    , copy = require('./file-copy')
    , mkdir = require('./mkdir')

module.exports = {
    pkg_conf, path, BASE, resolve, HOMEDIR, 
    copy, mkdir
}
