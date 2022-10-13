const startDB = async (model, list) => {
    await model.deleteMany({})
    for (let i = 0; i < list.length; i++) {
        const blog = new model(list[i])
        await blog.save()
    }
}

module.exports = startDB