'use strict'

let User = require('../models/User')
let Project = require('../models/Project')

module.exports.createProject = (data) => {
    let user = new User(data.twitterId)
    let projectId = ''

    user.hasProjectId()
        .then(_user => {
            if (_user.projectID !== null) {
                // error response (project is exist)
            }

            let rawContents = data.replyContext.split(" ")
            let language = rawContents.shift()
            let code = rawContents.join(' ')

            if (!Project.checkLanguage(language)) {
                // error response (you can't use this language)
            }

            if (code === '') {
                // error response (code has unexpected)
            }

            let projectId = Project.createId()
            user.connectProjectId(projectId)

            let project = new Project(projectId, language)
            project.setCode(code)
            project.codeAdd()
        })
}