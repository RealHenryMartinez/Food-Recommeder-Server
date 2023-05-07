const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
let path = require('path')


const app = express()
app.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images') // put images into the destination named images
  },
  // Format the file path and name
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname)) 
  },
})
// Filter through the files and only accept files that match the format
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png, image/gif', 'image']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
// our function with configuration of file
const upload = multer({
  storage,
  limits: {
    fileSize: 9000000,
  },
  fileFilter,
})
module.exports = upload
