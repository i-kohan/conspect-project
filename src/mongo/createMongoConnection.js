const mongoose = require('mongoose')

const user = 'ilya'
const password = 'test12'

module.exports = function (callback) {
    mongoose.connect(`mongodb://${user}:${password}@ds046027.mlab.com:46027/conspectus-project`)
    mongoose.connection.once('open', callback)
}
