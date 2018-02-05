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

# 単体テスト
```
npm test
```
`mocha` が実行されます。


# 実行テスト

`controller.js` を `node` コマンドを使ってCLI実行することが出来るので、
Twitterからこういうリクエストが来れば、こうする。というテストが手元でできます

```shell
node middlewares/controller.js sample sampleRequests/sample.json

# node middlewares/controller.js [テストするコマンド] [テストするリクエストが書かれたjsonファイルへのパス]
```

# ディレクトリ構造

```
.
├── LICENSE
├── README.md
├── bin/ # npm scriptで実行するスクリプト置き場（基本触らない）
├── config/ # sequelize 用のdb config置き場
├── db/ # SQLiteのdbファイル置き場
├── models/ # コマンドのフロー（middlewares/*.js）から使われるメソッド郡
│   ├── Project.js
│   └── User.js
├── middlewares/ # 外部アクセス・コマンドフロー処理をまとめる
│   ├── accessor.js # 外部APIアクセス処理
│   ├── controller.js # コマンドの処理振り分け
│   ├── monitor.js # Twitterのリプライを監視
│   └── sample.js # 各コマンドのフローはこんな感じでコマンドあたり一つのファイルまとめる
├── migrations/ # マイグレーションファイル置き場（sequelizeによって作成）
├── repositories/ # ORM処理置き場（sequelizeによって作成=>repositoriesにディレクトリ名変更）
├── node_modules/ 
├── package.json
├── sampleRequests/ # コマンドを試験実行をする時に使うリクエスト置き場
├── seeders/ # DB初期値を登録する処理を書くファイル置き場（sequelizeによって作成）
└── yarn.lock
```

※issuesのlabelと基本的に一致し、そこにメソッドを実装していく

- Project : models/Project.js
- User : models/User.js
- Accessor : middlewares/accessor.js
- Monitor : middlewares/monitor.js
- Repository : repositories/*.js （index.js以外のDBに対応するjsファイルにメソッド実装をする）
