let User = require('../models/User')
let assert = require('assert')

describe('models_user', function () {
    it('constructor', function () {
        let expected = {
            twitterId: 'ahaha0807_alg',
            projectId: '',
        }

        let user = new User(expected.twitterId)
        assert.equal(user.twitterId, expected.twitterId)
        assert.equal(user.projectId, expected.projectId)
    })
})
