const schema = `
    type User {
        id: ID!,
        email: String!,
        username: String!,
        jwt: String!
    }

    type Query {
        currentUser: User
    }

    type Mutation {
        login(username: String!, password: String!): User
        signup(email: String!, password: String!, username: String!): User
    }

    schema {
        query: Query,
        mutation: Mutation,
    }
`;

module.exports = schema;
