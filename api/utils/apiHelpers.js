const User = require("../models/User")
const jwt = require('jsonwebtoken')

const getAll = async (model) => { 
    const collection = await model.find({})
    return collection.map(el => el.toJSON())
 }
const getToken = async (username) => {
   const user = await User.findOne({ username: username })
   const userForToken = {
      username: user.username,
      id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}
const findInDB = async (model, search, _query='_id') => {
    let query = model.find()
    query.where(_query, search)
    const result = await query.exec()
    return result[0].toJSON()
 }
const takeAnID = async (model)=> {
   const collection = await getAll(model)
   const ids = collection.map(({id})=>id)
   const result = Math.floor(Math.random() * ids.length)
   return ids[result]
}
const findAndMap = async (model, key)=> {
   const collection = await getAll(model)
   return collection.map(el=>el[key])
}


 module.exports = { getAll, findInDB, takeAnID, findAndMap, getToken }