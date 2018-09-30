module.exports = (commentModel) => ({
    Query: {
        comments: async (root, { conspectId }) => await commentModel.find({ conspectId })
    },
    Mutation: {
        createComment: async (root, args) => {
            const comment = new commentModel({
                conspectId,
                authorId,
                text,
                likes,
            } = args);
            return await comment.save()
        }
    },
    // Comment: {
    //     conspect: () => {}
    // }
})
