const firebase = require('../util/firebase')

async function decodeIDToken(req, res, next) {
  let idToken
  console.log( req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split(' ')[1]
  }
  console.log('Token Request', idToken)
  if ( idToken) {
    try {
      const decodedToken = await firebase.verifyToken( idToken)
      req['currentUser'] = decodedToken
      next()
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = { decodeIDToken }
