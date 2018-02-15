'use strict'

let fs = require('fs')

let Help = require('./help')
let Create = require('./create')
let Post = require('./post')
let Save = require('./save')
let Run = require('./run')
const Disconnect = require("./disconnect")

module.exports.controller = (command, data) => {
    switch (command) {
        case 'help':
            Help.help(data)
            break
        case 'new':
            Create.createProject(data)
            break
        case 'post':
            Post.postCode(data)
            break
        case 'save':
            Save.saveProject(data)
            break
        case  'run':
            Run.run(data)
            break
        case 'disconnect':
            Disconnect.disconnect(data)
            break
        case 'check':
            checkHasProject(data)
            break
        default :
            console.error("Twitterに対してエラーレスポンスする")
    }
}

// CLI実行用
/*
* サンプルリクエスト
*   node middlewares/controller.js help sampleRequests/help.json
*
*   node middlewares/controller.js [テストするコマンド] [テストするリクエストが書かれたjsonファイルへのパス]
*/
const controllerWithArgs = () => {
    let args = process.argv[2]
    let filePath = process.argv[3]

    fs.readFile(filePath, 'utf-8', (err, rawContents) => {
        if (err !== null) {
            console.error(err)
        }

        let contents = JSON.parse(rawContents)

        this.controller(args, contents)
    })
}

// controllerWithArgs()
