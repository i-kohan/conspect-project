const { mergeResolvers } = require('merge-graphql-schemas')
const { Conspect, Comment, User } = require('../../mongo/models')

module.exports = [
    require('./conspect')(Conspect),
    require('./comment')(Comment),
    require('./user')(User)
]
