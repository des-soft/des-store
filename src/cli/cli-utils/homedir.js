const osHomedir = require('os-homedir')
    , path = require('path')
    , USER_HOME = osHomedir()
    , mkdir = require('./mkdir')
    , DAILY_DIR = path.join(USER_HOME, '.des-store')

// mkdir /home/wang/.des-store 
mkdir(DAILY_DIR); 

// just like `/home/wang/.des-store`
module.exports = DAILY_DIR; 
