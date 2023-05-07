/**
 * NEED: seperate the three menu, announcement, etc and give them the business name, userid, to match with the business and UPLOAD FILES
 */
require('dotenv').config()
const express = require('express')
const restaurantRouter = express.Router()
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

restaurantRouter.get('/getRestaurants', (req, res) => {
  request(restaurantOption, function (error, response, body) {
    console.log(response.body)
    res.status(200).send(response.body)
  })
})
restaurantRouter.get('/getCategories', function (req, res) {
  request(categoryOption, function (error, response, body) {
    console.log(response.body)
    res.status(200).send(response.body)
  })
})

module.exports = restaurantRouter;