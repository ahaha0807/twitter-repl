'use strict';

let fs = require('fs');

let Sample = require('./sample');

module.exports.controller = (command, data) => {
    switch (command) {
        case 'sample':
            Sample.sample(data);
            break;
        case 'new':
            createProject(data);
            break;
        case 'post':
            postCode(data);
            break;
        case 'save':
            saveProject(data);
            break;
        case 'reconnect':
            reconnect(data);
            break;
        case 'check':
            checkHasProject(data);
            break;
        default :
            console.error("Twitterに対してエラーレスポンスする");
    }
};

// CLI実行用
/*
* サンプルリクエスト
*   node app/controller.js sample sampleRequest/sample.json
*
*   node app/controller.js [テストするコマンド] [テストするリクエストが書かれたjsonファイルへのパス]
*/
const controllerWithArgs = () => {
    let args = process.argv[2];
    let filePath = process.argv[3];

    fs.readFile(filePath, 'utf-8', (err, rawContents) => {
        if (err !== null) {
            console.error(err);
        }

        let contents = JSON.parse(rawContents);

        this.controller(args, contents);
    });
};

controllerWithArgs();
