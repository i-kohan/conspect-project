module.exports = (conspectModel) => ({
    Query: {
        conspect: async (root, { id }) => await conspectModel.findById(id),
        conspectsByTitle: async (root, { title }) => await conspectModel.find({ title })
    },
    Mutation: {
        createConspect: async(root, args, context, info) => { 
            const conspect = new conspectModel({
                title,
                description,
                tags,
                comments,
                rating,
                userId
            } = args);
            return await conspect.save()
        }
    },
    // Conspect: {
    //     comments: () => {}
    // }
})