const  {Schema, model} = require('mongoose');

const commentsSchema = new Schema({
    content : String,
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
}
});

module.exports = model('Comments', commentsSchema);