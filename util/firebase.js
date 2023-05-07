require('dotenv').config
const admin = require('firebase-admin')

// Create a new config object with the firebase admin configuration
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
}
// Create our app with the credentials provided
const app = admin.initializeApp({
  credential: admin.credential.cert(config),
})
// Create the user through our firebase authentication
const createUser = async (email, password, uid) => {
  return await app.auth().createUser({
    email,
    password,
    uid,
  })
}
// Create a token for the user
const verifyToken = async (token) => {
  return await app.auth().verifyIdToken(token)
}

module.exports = {
  createUser,
  verifyToken,
}
