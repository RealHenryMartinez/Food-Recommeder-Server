/**
 * NEED: seperate the three menu, announcement, etc and give them the business name, userid, to match with the business and UPLOAD FILES
 */
require('dotenv').config()
const express = require('express')
const restaurantRouter = express.Router()
const app = express()
const request = require('request');
const bodyParser = require('body-parser')
const {  restaurantOptions} = require('../hooks/useRestaurantHook')

app.use(bodyParser.json())

restaurantRouter.get('/getRestaurants', (req, res) => {
  request(restaurantOptions, function (error, response, body) {
    console.log(response.body)
    res.status(200).send(response.body)
  })
})
// restaurantRouter.get('/getCategories', function (req, res) {
//   request(categoryOptions, function (error, response, body) {
//     console.log(response.body)
//     res.status(200).send(response.body)
//   })
// })

module.exports = restaurantRouter;