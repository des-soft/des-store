#!/usr/bin/env node

const path = require('path')
    , { getConfig, resolve } = require('./cli-utils')
    , config = getConfig()
    , child_process = require('child_process')
// 

child_process.exec(`code ${resolve()}`); 
