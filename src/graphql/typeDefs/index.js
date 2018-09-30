const { mergeTypes } = require('merge-graphql-schemas')
const conspectType = require('./conspect')
const commentType = require('./comment')
const userType = require('./user')

const types = [
    conspectType,
    commentType,
    userType
  ];

module.exports = mergeTypes(types, { all: true })
