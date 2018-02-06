const languageDictionary = require('./LanguageDictonary')

const Sequelize = require('sequelize')
const sequelize = new Sequelize('users', '', '', {dialect: 'sqlite', storage: './db/develop.db'})
const moment = require('moment')

let EditorDB = require('../repositories/editor')
const accessor = require('../middlewares/accessor')

class Project {
    constructor(_projectId, _language) {
        this.projectId = _projectId
        this.language = _language
        this.code = ''
        this.editordb = EditorDB(sequelize, Sequelize)
    }


    static createId() {
        return moment().format('YYYY/MM/DD HH:mm:ss')
    }


    static checkLanguage(selectedLanguage) {
        return languageDictionary.find(language => {
            return language === selectedLanguage
        }) !== undefined
    }


    setCode(_code) {
        this.code = _code
    }


    getInformation() {
        let text

        text =
            `${this.language} のプロジェクトを作成しました。
ID: ${this.projectId}
`

        return text
    }


    codeAdd() {
        // FIXME: ここはこれじゃない。変なレコードが登録されるぞ
        this.editordb.findOrCreate({
                where: {projectID: this.projectId}, order: [['updatedAt', 'DESC']]
            }
        ).then(data => {
            let lineIndex = data[0].lineIndex || 0

            this.editordb.create({
                projectID: this.projectId,
                code: this.code,
                lineIndex: lineIndex + 1
            })

            let responseText = this.getInformation()
            responseText += 'Page: ' + (lineIndex + 1)

            accessor.sendResponse(responseText)
        }).catch(() => {
            // FIXME: This is AntiPattern
            this.editordb.create({
                projectID: this.projectId,
                code: this.code,
                lineIndex: 0
            }).then(() => {
                let responseText = this.getInformation()
                responseText += 'Page: 0'
                accessor.sendResponse(responseText)
            })
        })

    }
}

module.exports = Project