const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("../db/develop.db", sqlite3.OPEN_READWRITE)
const moment = require('moment')

class User {
    constructor(_twitterId) {
        this.twitterId = _twitterId
        this.projectId = ''
    }


    static createAccount(twitterId) {
        return new Promise((resolve, reject) => {
            let now = moment().format("YYYY-MM-DD HH:mm:ss ZZZ")
            db.serialize(() => {
                db.run("INSERT INTO Users(twitterID, createdAt, updatedAt) " +
                    "VALUES(?, ?, ?)",
                    [twitterId, now, now],
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


    hasProjectId() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get("SELECT * FROM Users WHERE twitterID = ?", [this.twitterId], (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                })
            })
        })
    }


    connectProjectId(_projectId) {
        return new Promise((resolve, reject) => {
            this.projectId = _projectId

            db.serialize(() => {
                db.get("SELECT * FROM Users WHERE twitterID = ?", [this.twitterId], (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        db.run("UPDATE Users SET projectID = ? , isConnect = 1 WHERE id = ?",
                            [this.projectId, res.id],
                            (err) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve()
                                }
                            })
                    }
                })
            })
        })
    }
}

module.exports = User