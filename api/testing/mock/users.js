const bcrypt = require('bcrypt')

const hash = async (password)=>{
    const saltRounds = 5
    return await bcrypt.hash(password, saltRounds)
}
const users = [
    {
        name: "Anakahara",
        username:"anakahra123",
        passwordHash: "hola1234"
    },
    {
        name: "Mario",
        username:"mario123",
        passwordHash: "hola1234"
    },
    {
        name: "Mario",
        username:"david",
        passwordHash: "hola1234"
    },
]
module.exports = users