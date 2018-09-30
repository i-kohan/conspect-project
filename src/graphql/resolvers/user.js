const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretWord = 'super-secrete'

module.exports = (userModel) => ({
    Query: {
        currentUser: (root, args, { user }) => user
    },
    Mutation: {
        login: async (root, { username, password }, context) => {
            const user = await userModel.findOne({ username })
            if (!user) {
                throw new Error("User with such username doesn't exists")
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                throw new Error("Password is invalid")
            }

            user.jwt = jwt.sign({ _id: user._id }, context.JWT_SECRETE)

            return user
        },
        signup: async (root, {email, password, username}, context) => {
            const existingUser = await userModel.findOne({ username })
            if (existingUser) {
                throw new Error('User with such username is already exists')
            }

            const hash = await bcrypt.hash(password, 10)
            const user = new userModel({
                username,
                password: hash,
                email,
            })
            const createdUser = await user.save()
            createdUser.jwt = jwt.sign({ id: user._id }, context.JWT_SECRETE)
            return createdUser  
        }
    },
    // Comment: {
    //     conspect: () => {}
    // }
})
