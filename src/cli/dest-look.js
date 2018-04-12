const open = require('open')
    , { resolve } = require('./cli-utils')
    , fs = require('fs')
// 

let args = process.argv.slice(2); 
let toOpen = resolve(...args); 

if (fs.existsSync(toOpen)){
    open(toOpen); 
} else {
    console.log(`  ${toOpen} 不存在`); 
}

