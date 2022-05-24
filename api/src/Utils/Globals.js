const {
    YOUR_API_KEY
  } = process.env;
const API_DOGS = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
const API_DOGS_RAZA = "https://api.thedogapi.com/v1/breeds/search?q="

module.exports= {
    API_DOGS,
    API_DOGS_RAZA
};