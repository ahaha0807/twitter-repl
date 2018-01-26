let Project = require('../models/Project')
let assert = require('assert')

describe('models_project', function () {
    it('constructor', function () {
        let expected = {
            projectId: 'projectId',
            language: 'JavaScript',
        }

        let project = new Project(expected.projectId, expected.language)
        assert.equal(project.projectId, expected.projectId)
        assert.equal(project.language, expected.language)
    })

    it('createId', function () {
        let expected = 'String Type'

        assert.equal(typeof(Project.createId()), typeof(expected))
    })
})
