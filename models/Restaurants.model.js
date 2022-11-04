const  {Schema, model} = require('mongoose');

const restaurantsSchema = new Schema({})


module.exports = model('Restaurants', restaurantsSchema);