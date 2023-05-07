const mongoose = require('mongoose')
require('dotenv').config()
async function connectToDb() {
  try {
   // Connect to the database using the env variable
    await mongoose.connect(process.env.MONGO_URI)
    console.log('we connected')
  } catch (error) {
    console.log(error)
    // add handler to deal with db connection error
  }
}
// run the function to connect
module.exports = connectToDb