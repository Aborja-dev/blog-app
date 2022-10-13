const jwt = require('jsonwebtoken')

const authByToken = (req, res, next) => {
    const authHeader = req.get('authorization')
    const validToken = authHeader.includes('Bearer') 
        ? authHeader.slice(7) 
        : null
    if (validToken) {
        const decodedToken = jwt.verify(validToken, process.env.SECRET)
        req.auth = decodedToken
        next()
    }
    else {
        next('AuthError')
    }
}

module.exports = { authByToken }