const KEY = process.env.API_KEY

const handleOptions = (url) => {
  const options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      Authorization: `Bearer ${KEY}`,
      accept: 'application/json',
    },
  }
  return options
}
//const categoryOptions = handleOptions('https://api.yelp.com/v3/categories/food')
const restaurantOptions = handleOptions(
  'https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972&limit=5',
)

module.exports = {restaurantOptions}