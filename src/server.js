const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const graphqlHTTP = require('koa-graphql')
const jwt = require('jsonwebtoken')
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools')

const { typeDefs, resolvers } = require('./graphql')
const createMongoConnection = require('./mongo/createMongoConnection')

const JWT_SECRETE = 'super-secret'

const port = 3000

const getUser = async (authorization, JWT_SECRETE, mongoose) => {
    const bearerLength = 'Bearer '.length
    if (authorization && authorization.length > bearerLength) {
        const token = authorization.slice(bearerLength)

        const { ok, result } = await new Promise(resolve =>
            jwt.verify(token, JWT_SECRETE, (err, result) => {
                if (err) {
                    resolve({
                        ok: false,
                        result: err
                    })
                } else {
                    resolve({
                        ok: true,
                        result
                    })
                }
            })
        )

        if (ok) {
            const user = await mongoose.model('User').findById(result._id)
            return user
        }

        return null
    }
}

const startServer = async () => {
    const app = new Koa();
    const router = new Router();

    router.all('/graphql', graphqlHTTP(async (req, res) => {
        const user = await getUser(req.headers.authorization, JWT_SECRETE, mongoose)
        return {
            schema: makeExecutableSchema({ typeDefs: typeDefs, resolvers }),
            graphiql: true,
            context: {
                JWT_SECRETE,
                req,
                res,
                mongoose,
                user
            }
        }
    }))

    app
        .use(router.routes())
        .use(router.allowedMethods());
    
    app.listen({ port }, () =>
        console.log(`Server ready at http://localhost:${port}`)
    );
}

createMongoConnection(startServer)
