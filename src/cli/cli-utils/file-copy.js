const fs = require('then-fs');

module.exports = function(from, to){
    return fs.readFile(from, 'utf-8').then(str => {
        return fs.writeFile(to, str); 
    }); 
}
