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
const categoryOption = handleOptions('https://api.yelp.com/v3/categories/food')
const restaurantOption = handleOptions(
  'https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972&limit=15',
)
