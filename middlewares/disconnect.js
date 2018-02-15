const moment = require("moment")

const User = require('../models/User')
const accessor = require("./accessor")

module.exports.disconnect = (request) => {
    let user = new User(request.twitterId)
    user.hasProjectId()
        .then(_user => {
            if (_user.projectID === null) {
                let responseText = '@' + request.twitterId + ' \n'
                responseText += `アカウントに紐付いたプロジェクトはありませんでした。
:CREATE を送信してプロジェクトを作成してください。
詳しくはこちら → https://goo.gl/QNq7Mj
`
                responseText += moment().format('YYYY MM/DD HH:mm:ss')
                accessor.sendResponse(responseText)
                return
            }

            return User.disconnect(request.twitterId)
        })
        .then(() => {
            let responseText = '@' + request.twitterId + ' \n'
            responseText += `アカウントに紐付いたプロジェクトを削除しました。
新しくコードを書く場合は :CREATE を送信してプロジェクトを作成してください。
詳しくはこちら → https://goo.gl/QNq7Mj
`
            responseText += moment().format('YYYY MM/DD HH:mm:ss')
            accessor.sendResponse(responseText)
            return
        })
}