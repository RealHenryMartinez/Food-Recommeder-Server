require('dotenv').config()

const express = require('express')
const app = express()
const authRouter = express.Router()
const firebase = require('../util/firebase')
const bodyParser = require('body-parser')
const { userModel} = require('../models/userModel')
const {decodeIDToken} = require('../helper/handleAuth');
const upload = require('../util/multer')
const remove = require('../util/removeFile')
const cloudinary = require('../helper/imageUploader');
const { cookie } = require('request')

app.use(bodyParser.json())

// Note: When using authentication, you must provide a user id to each image to delete duplicate images
let profileToCheck = {}
let profilesToDelete = []
let prevProfile = null


authRouter.post(
  '/uploadProfileImage',
  decodeIDToken,
  upload.single('profile'),
  async (req, res) => {
    console.log(req.currentUser)
    
    const auth = req.currentUser;
    if (!auth)
      return res
        .status(401)
        .json({ success: false, message: 'unauthorized access!' });
  
    try {
      // Replace the previous file with the new one uploaded from the user
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${auth.user_id}_profile`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
     
  
      // Replace the existing file with the new file url from cloudinary
      const updatedUser = await userModel.findByIdAndUpdate(
        auth.user_id,
        { profileUri: result.url },
        { new: true }
      );
      remove(req.file.path) // Remove the file from storage to prevent overflow
      res
        .status(201)
        .json({ success: true, message: 'Your profile has updated!' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'server error, try after some time' });
      console.log('Error while uploading profile image', error.message);
    }
  },
)

authRouter.post('/signup', async (req, res) => {
  try {
    // get user data (1.email 2.password)
    const payload = req.body.data
    // check if another user already has the same email
    const check = await userModel.findOne({ email: payload.email })
    if (check !== null) {
      //remove(profileToCheck) // don't store the file payload, but rather just remove it
      res.status(400).send({
        message: 'User with email already exists',
      })
    } else {
      console.log('payload', payload)
      console.log(profileToCheck)
      // create user document using the mondogb schema
      const newUser = await userModel.create({
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        //profileUri: profileToCheck,
      })
      console.log('new user: ' + newUser)
      // create new user in firebase
      await firebase.createUser(
        payload.email,
        payload.password,
        // make the UID unique for the user and matches that of the userModel id
        newUser._id.toString(),
      )
        console.log(req.token)
      res.status(200).send({
        message: 'User created successfully' + newUser,
        payload: newUser,
      })
    }
  } catch (e) {
    console.log(e)
    res.status(401).send({ message: e })
  }
})

authRouter.get('/', async (req, res) => {
  const users = await userModel.find({})
  console.log(users)
  return res.json(users.map((users) => users.toJSON()))
})
// Be sure to get the correct information of the user
authRouter.get('/:email/:password', async (req, res) => {
  const user = await userModel.find({
    email: req.params.email,
    password: req.params.password,
  })
  console.log(user)
  try {
    if (user) {
      return res.status(200).send({ message: 'User was found', user: user })
    }
    return res.status(402).send({ message: 'No user with such information' })
  } catch (e) {
    console.log(e)
    res.status(401).send({ message: e })
  }
})

module.exports = authRouter
