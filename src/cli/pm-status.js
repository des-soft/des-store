#!/usr/bin/env node

const path = require('path')
    , { getConfig } = require('./cli-utils')
    , fs = require('then-fs')

    , config = getConfig()

// Git Base 
var resolve = $ => path.join(config.git_base, $); 

// All 
let love_base = resolve('store/love'); 

// Loading  
let loading = fs.readdirSync(love_base).map(file_name => {
    let file = path.join(love_base, file_name); 

    return fs.readFile(file).then(data => {
        return {
            text: data.toString(), 
            path: file
        }
    })
})

Promise.all(loading).then(files => {
    let length = files.reduce((acc, cur) => {
        return acc + cur.text.length
    }, 0); 

    console.log('  Count: store/love/*.md')
    console.log('    共计 %d 篇', files.length)
    console.log('    总长度 %d', length); 
}); 

