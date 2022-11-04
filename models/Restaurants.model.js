const  {Schema, model} = require('mongoose');

const restaurantsSchema = new Schema({
    name : String,
    description : String,
    rating : Number,
    reviews : [{type: Schema.Types.ObjectId, ref: 'Review'}],
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
}
})


const Restaurants= model('Restaurants', restaurantsSchema);

module.exports = Restaurants;