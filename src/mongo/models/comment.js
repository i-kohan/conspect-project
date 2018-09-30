const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    conspectId: String,
    authorId: String,
    text: String,
    likes: [String]
})

module.exports = mongoose.model('Comment', CommentSchema)
