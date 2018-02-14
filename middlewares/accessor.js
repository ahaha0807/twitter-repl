const Twitter = require('twitter')
const paiza_io = require('paiza-io')

module.exports.sendResponse = function (text) {
    // FIXME: こんなの（key直書きなんて）絶対おかしいよ！
    let client = new Twitter({
        consumer_key: 'UaiUm2YDTAqcbmNKyhY88k0J8',
        consumer_secret: 'pqHGOpSmdZAHjSJZatIjxUNTwDD5Zsaob6hnvvlurIuf5oxg4l',
        access_token_key: '951724660537810945-Yi4ijHj4x8r31QLkf0k5jOOPgv5YJsK',
        access_token_secret: '8Lcb5w0yU6RsUdFTU4vrSYcDtuOZEKx0N4BEIrq9ZSdEh',
    })

    client.post('statuses/update',
        {status: text},
        function (error, tweet) {
            if (error) {
                console.log(error)
            }
        })
}

module.exports.paizaRun = (language, code) => {
    return new Promise((resolve, reject) => {
        paiza_io(language, code, '', (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result.stdout)
        })
    })
}