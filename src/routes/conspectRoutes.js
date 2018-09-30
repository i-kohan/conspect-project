const Conspect = require('../models/conspect')

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/conspects',
        config: {
            description: "Get all conspects",
            tags: ['api', 'v1', 'conspects']
        },
        handler: (req, reply) => {
            return Conspect.find()
        }
    },
    {
        method: 'POST',
        path: '/api/v1/conspects',
        config: {
            description: "Add new conspect",
            tags: ['api', 'v1', 'conspects']
        },
        handler: (req, reply) => {
            const {
                name,
                description,
                tags,
                text,
                comments,
                rating
            } = req.payload

            const conspect = new Conspect({
                name,
                description,
                tags,
                text,
                comments,
                rating
            })

            return conspect.save()
        }
    }
]