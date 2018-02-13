'use strict'

const Twitter = require('twitter')
const Controller = require('./controller')

const TWITTER_ID = 'Tweet_REPL'

const formatCommand = (rawCommand) => {
    let result = 'post'
    switch (rawCommand) {
        case ":CREATE":
            result = 'new'
            break
        case ":POST":
            result = 'post'
    }
    return result
}

let formatter = (rawRequest, twitterId) => {
    let result = {
        command: '',
        data: {
            twitterId: '',
            replyContext: ''
        }
    }

    rawRequest = rawRequest.split(' ')
    let _ = rawRequest.shift()

    let rawCommand = rawRequest.shift()
    result.command = formatCommand(rawCommand)

    result.data.twitterId = twitterId
    result.data.replyContext = rawRequest.join(' ')

    return result
}

module.exports.monitor = () => {
    // FIXME: こんなの（key直書きなんて）絶対おかしいよ！
    let client = new Twitter({
        consumer_key: 'UaiUm2YDTAqcbmNKyhY88k0J8',
        consumer_secret: 'pqHGOpSmdZAHjSJZatIjxUNTwDD5Zsaob6hnvvlurIuf5oxg4l',
        access_token_key: '951724660537810945-Yi4ijHj4x8r31QLkf0k5jOOPgv5YJsK',
        access_token_secret: '8Lcb5w0yU6RsUdFTU4vrSYcDtuOZEKx0N4BEIrq9ZSdEh',
    })
    client.stream('statuses/filter', {track: TWITTER_ID}, function (stream) {
        stream.on('data', function (tweet) {
            let rawRequest = tweet.text
            let request = formatter(rawRequest, tweet.user.screen_name)

            console.log(request)
            Controller.controller(request.command, request.data)
        })

        stream.on('error', function (error) {
            throw error
        })
    })
}

this.monitor()