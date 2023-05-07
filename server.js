const express = require('express')
const app = express()
const request = require('request')
require('dotenv').config()
const PORT = process.env.PORT || 4020
const cors = require('cors');
const bodyParser = require('body-parser');
const restaurantRouter = require('./routes/RestaurantRoute')
const bearerToken = require('express-bearer-token');
const authRouter = require('./routes/AuthRoute');
const connectToDb = require('./util/mongodb');

connectToDb()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({ origin: true }))
app.use(bearerToken());

app.use('/restaurant', restaurantRouter);
app.use('/user', authRouter)

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`)
})
