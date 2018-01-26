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

    it('checkLanguage', function () {
        let expected = [
            {name: 'javascript', result: true},
            {name: 'JavaScript', result: true},
            {name: 'c', result: true},
            {name: 'clang', result: false},
            {name: 'Dummy', result: false},
            {name: "example", result: false}
        ]

        let actual = []
        let expectedResults = []

        expected.forEach(element => {
            actual.push(Project.checkLanguage(element.name))
            expectedResults.push(element.result)
        })

        assert.deepEqual(actual, expectedResults)
    })
})
