const { dummy, totalLikes, favorite, mostBlogs, getAuthorWithMostLikes } = require("../utils/dummyHelpers")
const blogs = require("./mock/data")
test('dummy returns one', () => {
	const result = dummy(blogs)
	expect(result).toBe(1)
})
test('totalLikes', () => {
	const result = totalLikes(blogs)
	expect(result).toBe(36)
})
test('favorite', () => {
	const result = favorite(blogs)
	expect(result.author).toBe('Edsger W. Dijkstra')
})
test('author with most blogs', () => {
	const result = mostBlogs(blogs)
	expect(result).toBe('Robert C. Martin')
})
test('author with most likes', () => {
	const result = getAuthorWithMostLikes(blogs)
	expect(result.author).toBe('Edsger W. Dijkstra')
})