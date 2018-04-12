#!/usr/bin/env node

const path = require('path')
    , { getConfig, resolve } = require('./cli-utils')
    , fs = require('then-fs')
    , config = getConfig()

// All 
let love_base = resolve('store/love'); 
let mail_img_base = resolve('store/mail-img'); 

// Loading  
let loading = fs.readdirSync(love_base).map(file_name => {
    let file = path.join(love_base, file_name); 

    return fs.readFile(file).then(data => {
        return {
            text: data.toString(), 
            path: file
        }
    })
}); 

let imgs = fs.readdirSync(mail_img_base); 

Promise.all(loading).then(files => {
    let length = files.reduce((acc, cur) => {
        return acc + cur.text.length
    }, 0); 

    console.log('  Count: store/love/*');
    console.log('    共计 %d 篇', files.length);
    console.log('    总长度 %d', length); 
    console.log('    '); 
    console.log('  Count: store/mail-img/*');
    console.log('    共计 %d 张', imgs.length);
}); 

