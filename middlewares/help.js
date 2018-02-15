'use strict';
const accessor = require("./accessor")
const moment = require('moment')

module.exports.help = (request) => {
    let responseText = '@' + request.twitterId + ' \n'
    responseText += `使い方はこちらをご確認ください
https://goo.gl/b4f4a3
`
    responseText += moment().format('YYYY MM/DD HH:mm:ss')
    accessor.sendResponse(responseText)
    return
};