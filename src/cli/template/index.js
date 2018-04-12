const tplser = require('tplser')
    , path = require('path')
    , NEW_DAILY = path.join(__dirname, './new-daily.md')

module.exports = {
    daily: tplser.fromFile(NEW_DAILY)
}
