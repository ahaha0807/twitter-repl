const Sequelize = require('sequelize')
const sequelize = new Sequelize('users', '', '', {dialect: 'sqlite', storage: './db/develop.db'})

const UserDB = require('../repositories/user')

class User {
    constructor(_twitterId) {
        this.twitterId = _twitterId
        this.projectId = ''
        this.db = UserDB(sequelize, Sequelize)
    }


    static createAccount(twitterId) {
        let db = UserDB(sequelize, Sequelize)

        db.create({
            twitterID: twitterId
        })
    }


    hasProjectId() {
        return this.db.find({where: {twitterID: this.twitterId}})
    }


    connectProjectId(_projectId) {
        this.projectId = _projectId
        this.db.find({where: {twitterID: this.twitterId}})
            .then(user => {
                user.update({
                    projectID: this.projectId
                })
            })
    }
}

module.exports = User