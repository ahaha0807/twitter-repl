'use strict'

const moment = require('moment')

const accessor = require("./accessor")
const Project = require("../models/Project")
const User = require("../models/User")

module.exports.run = data => {
    let user = new User(data.twitterId)

    user.hasProjectId()
        .then(_user => {
                if (_user === undefined || _user.projectID === undefined) {
                    let responseText =
                        `アカウントに紐づくプロジェクトが存在しませんでした。
":CREATE [言語名] [コード]"（それぞれの要素の間はすべて半角スペース区切り）
の形式でリクエストを送信し、プロジェクトを作成してください
`
                    responseText += moment().format('YYYY MM/DD HH:mm:ss')
                    accessor.sendResponse(responseText)
                    return
                }

                return Project.getCodeFromFile(data.twitterId)
            }
        )
        .then(project => {
            return accessor.paizaRun(project.language, project.code)
        })
        .then(result => {
            accessor.sendResponse('@' + data.twitterId + ' \n' + result)
        })
}