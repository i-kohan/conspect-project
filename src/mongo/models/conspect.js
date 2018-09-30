const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConspectSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    text: String,
    comments: [String],
    rating: Number,
    authorId: String,
})

module.exports = mongoose.model('Conspect', ConspectSchema)
