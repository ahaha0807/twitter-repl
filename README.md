# twitter-repl

# 事前準備
各種バージョン
```
npm 5.6.0
node v9.2.0
```

## パッケージのインストール
```shell
npm i -g sequelize-cli
yarn
```

## マイグレーション
```shell
npm run sync # dbファイルの作成
sequelize db:migrate --env development # table構造の作成
```

# 実行テスト

`controller.js` を `node` コマンドを使ってCLI実行することが出来るので、
Twitterからこういうリクエストが来れば、こうする。というテストが手元でできます

```shell
node app/controller.js sample sampleRequest/sample.json

# node app/controller.js [テストするコマンド] [テストするリクエストが書かれたjsonファイルへのパス]
```