const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  uri: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
})

// User information
const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileUri: { type: String, required: false}
})
const profileImageModel = mongoose.model('profile', profileSchema)
const userModel = mongoose.model('user', userSchema)

module.exports = { userModel, profileImageModel }
