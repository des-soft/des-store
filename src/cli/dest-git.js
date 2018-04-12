#!/usr/bin/env node 

const child_process = require('child_process')
    , { resolve } = require('./cli-utils')
    // Git 目录路径
    , GIT_BASE = resolve() 

// 参数的处理
let args = process.argv.slice(2); 

// 执行 git 命令 
let $git = child_process.spawn('git', args, {
    // cwd 位置 (命令行工作目录 Current Working Directory)
    cwd: GIT_BASE, 
    // 把子进程的标准输入流接到当前进程里 
    stdio: [process.stdin, process.stdout, process.stderr]
}); 
