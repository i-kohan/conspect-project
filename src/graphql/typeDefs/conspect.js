const schema = `
    type Conspect {
        id: ID!,
        title: String!,
        description: String!,
        tags: [String],
        comments: [Comment],
        rating: Int,
        authorId: ID!
    }

    type Query {
        conspect(id: ID!): Conspect
        conspectsByTitle(title: String!): Conspect
    }

    type Mutation {
        createConspect(
            title: String!,
            description: String!,
            tags: [String],
            comments: [String],
            rating: Int,
            authorId: ID!
        ): Conspect
    }

    schema {
        query: Query,
        mutation: Mutation,
    }
`;

module.exports = schema;
