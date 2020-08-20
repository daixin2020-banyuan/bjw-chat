const mongoose = require('mongoose')
const { Schema } = mongoose

const chatsSchema = new Schema({
  nickName: String,
  avatar:String,
  content:String,
  createdAt:{ type:Date,default: new Date()}
})

const chatsModel = mongoose.model('chats', chatsSchema)

// console.log(chatsModel)
module.exports = {
  chatsModel
}