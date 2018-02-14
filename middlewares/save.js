'use strict'

const moment = require('moment')

const accessor = require("./accessor")
const Project = require("../models/Project")
const User = require("../models/User")

module.exports.saveProject = data => {
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

                return Project.getAll(_user.projectID)
            }
        )
        .then(records => {
            let code = records.map(element => {
                return element.code
            })

            code = code.join('\n')

            let fileInfo = {
                twitterId: data.twitterId,
                language: records[0].language,
                code: code
            }
            Project.save(fileInfo)

            return User.disconnect(data.twitterId)
        })
}



