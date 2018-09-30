const schema = `
    type Comment {
        id: ID!,
        conspectId: ID!,
        authorId: ID!,
        text: String!,
        likes: [ID]!
    }

    type Query {
        comments(conspectId: ID!): [Comment]
    }

    type Mutation {
        createComment(
            conspectId: ID!,
            authorId: ID!,
            text: String!,
        ): Comment
    }

    schema {
        query: Query,
        mutation: Mutation,
    }
`;

module.exports = schema;
