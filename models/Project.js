const moment = require('moment')
const sqlite3 = require('sqlite3')

const path = require('path')
const dbPath = path.resolve(__dirname, '../db/develop.db')
const db = new sqlite3.Database(dbPath)

const accessor = require('../middlewares/accessor')
const languageDictionary = require('./LanguageDictonary')

class Project {
    constructor(_projectId, _language) {
        this.projectId = _projectId
        this.language = _language
        this.code = ''
    }


    static getCodeFromFile(twitterId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("SELECT * FROM Files WHERE twitterId = ? ORDER BY createdAt DESC", [twitterId], (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                })
            })
        })
    }


    static createId(twitterId) {
        return twitterId + '-' + moment().format("YYYY-MM-DD-HH:mm:ss")
    }


    static find(projectId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("SELECT * FROM Editors WHERE projectID = ? ORDER BY createdAt DESC", [projectId], (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                })
            })
        })
    }


    static getAll(projectId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all("SELECT * FROM Editors WHERE projectID = ?", [projectId], (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            })
        })
    }


    static createFileId(twitterId) {
        return twitterId + moment().format("YYYY-MM-DD-HH-mm-ss")
    }


    static save(fileInfo) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("INSERT INTO Files(fileId, twitterId, language, code, createdAt, updatedAt) " +
                    "VALUES(?, ?, ?, ?, ?, ?)",
                    [
                        Project.createFileId(fileInfo.twitterId),
                        fileInfo.twitterId,
                        fileInfo.language,
                        fileInfo.code,
                        moment().format("YYYY-MM-DD HH-mm-ss ZZ"),
                        moment().format("YYYY-MM-DD HH-mm-ss ZZ")
                    ],
                    (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
            })
        })
    }


    static checkLanguage(selectedLanguage) {
        return languageDictionary.find(language => {
            return language === selectedLanguage
        }) !== undefined
    }


    static codeRegisterToDB(params) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("INSERT INTO Editors(projectID, code, lineIndex, language, createdAt, updatedAt) " +
                    "VALUES($pid, $code, $li, $lang, $ca, $ua)",
                    {
                        $pid: params.projectId,
                        $code: params.code,
                        $li: params.lineIndex,
                        $lang: params.language,
                        $ca: moment().format("YYYY-MM-DD HH:mm:ss ZZ"),
                        $ua: moment().format("YYYY-MM-DD HH:mm:ss ZZ")
                    },
                    (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    }
                )
            })
        })
    }


    setCode(_code) {
        this.code = _code
    }


    getInformation() {
        let text

        text =
            `言語: ${this.language} 
ID: ${this.projectId}
`
        return text
    }


    codeAdd(twitterId, additionalResponse) {
        Project.find(this.projectId)
            .then(data => {
                if (data === undefined) {
                    return 0
                } else {
                    return data.lineIndex + 1
                }
            })
            .then(lineIndex => {
                Project.codeRegisterToDB({
                    projectId: this.projectId,
                    language: this.language,
                    code: this.code,
                    lineIndex: lineIndex
                }).then(() => {
                    let responseText = '@' + twitterId + ' \n'
                    responseText += this.getInformation()
                    responseText += 'Line: ' + (lineIndex) + `
`
                    responseText += additionalResponse

                    accessor.sendResponse(responseText)
                }).catch(err => {
                    return err
                })
            })
    }
}

module.exports = Project