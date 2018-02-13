'use strict'

let User = require('../models/User')
let Project = require('../models/Project')

const accessor = require('./accessor')
const moment = require('moment')

module.exports.createProject = (request, isNewCummer) => {
    if (isNewCummer) {
        return
    }
    let user = new User(request.twitterId)
    user.hasProjectId()
        .then(_user => {
            if (_user === undefined) {
                User.createAccount(request.twitterId).then(() => {
                    this.createProject(request, true)
                })
            } else if (_user.projectID !== null) {
                let responseText =
                    `既にアカウントに紐付いたプロジェクトが存在します。
:DISCONNECT とリプライを送り直し、紐付いたプロジェクトを削除してください。
`
                responseText += moment().format('YYYY MM/DD HH:mm:ss')
                accessor.sendResponse(responseText)
                return
            }

            let rawContents = request.replyContext.split(" ")
            let language = rawContents.shift()
            let code = rawContents.join(' ')

            if (!Project.checkLanguage(language)) {
                let responseText =
                    `申し訳ございません。Tweet_REPLは指定された言語に対応しておりません。
メジャーな言語を選択しているにも関わらず、エラーが表示される場合は、言語名を変更して試してみてください。
例）ジャバスク→Javascript, Go言語→Golang
`
                responseText += moment().format('YYYY MM/DD HH:mm:ss')
                accessor.sendResponse(responseText)
                return
            }

            if (code === '') {
                let responseText =
                    `コードの中身が存在しませんでした。
":CREATE [言語名] [コード]"（それぞれの要素の間はすべて半角スペース区切り）
の形式でリクエストを送信してください
`
                responseText += moment().format('YYYY MM/DD HH:mm:ss')
                accessor.sendResponse(responseText)
                return
            }

            let projectId = Project.createId()
            user.connectProjectId(projectId)

            let project = new Project(projectId, language)
            project.setCode(code)
            project.codeAdd('プロジェクトを作成しました')
        })
}