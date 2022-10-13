const _ = require('lodash')
const { findMaxValue } = require('./utils')
const dummy = (blogs) => { return 1 }
const totalLikes = (blogs) => { 
    const likes = blogs.map(({likes})=>likes)
    return likes.reduce((acum, value)=>acum+value)
}
const favorite = (blogs) => { 
    const likes = blogs.map(({likes})=>likes)
    const maxLikes = Math.max(...likes)
    return blogs.find((blog)=>blog.likes === maxLikes) || null
}
const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, (blog)=>{
        return blog.author
    })
    const maxBlogsValue = findMaxValue(authors)
    let result = ''
    for (const key in authors) {
        if (Object.hasOwnProperty.call(authors, key)) {
            if (authors[key] === maxBlogsValue)
                result = key
        }
    }
    return result
}
const getAuthorWithMostLikes = (blogs) => {
    const authorsByLikes = _.groupBy(blogs, (blog)=>{
        return blog.author
    })
    let countLikes = []
    for (const key in authorsByLikes) {
        if (Object.hasOwnProperty.call(authorsByLikes, key)) {
            const valuesArray = authorsByLikes[key]
            const totalLikes = valuesArray
                .map(({likes})=>likes)
                .reduce((sum, value)=>sum + value)
            countLikes.push({author: key, likes: totalLikes})
        }
    }
    const maxLikesValue = findMaxValue(countLikes.map(({likes})=>likes))
    return countLikes.find(({likes})=>likes === maxLikesValue)
}
module.exports = { dummy, totalLikes, favorite, mostBlogs, getAuthorWithMostLikes }