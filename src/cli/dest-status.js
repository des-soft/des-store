#!/usr/bin/env node

const path = require('path')
    , { getConfig, resolve, fsize } = require('./cli-utils')
    , fs = require('then-fs')
    , config = getConfig()

// All 
let love_base = resolve('store/love'); 
let mail_img_base = resolve('store/mail-img'); 

(async () => {
    // Config Log 
    console.log('Config: '); 
    Object.keys(config).forEach(key => {
        console.log(' ', key.padStart(8), ':', config[key]); 
    });
    console.log(' '); 

    // Numbers Log 
    console.log('Numbers: '); 
    
    let [files, imgs] = await Promise.all([
        Promise.all(
            fs.readdirSync(love_base).map(file_name => {
                let file = path.join(love_base, file_name); 

                return fs.readFile(file).then(data => {
                    return {
                        text: data.toString(), 
                        path: file
                    }
                })
            })
        ), 
        fs.readdir(mail_img_base)
    ]); 
    
    let length = files.reduce((acc, cur) => {
        return acc + cur.text.length
    }, 0); 

    console.log('  Count: store/love/*');
    console.log('    共计 %d 篇', files.length);
    console.log('    总长度 %d', length); 
    console.log('    '); 
    console.log('  Count: store/mail-img/*');
    console.log('    共计 %d 张', imgs.length);
    console.log('')

    // Size Log 
    let repo_size = await fsize(config.git_base); 
    let love_size = await fsize(love_base);
    let imgs_size = await fsize(mail_img_base);
    console.log('Size: '); 
    console.log(`  Love:`, `${Math.round(love_size / 1024)} KB`); 
    console.log(`  Imgs:`, `${Math.round(imgs_size / 1024)} KB`); 
    console.log(`  Repo:`, `${Math.round(repo_size / 1024)} KB`); 
})(); 
