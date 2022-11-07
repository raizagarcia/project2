const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const Comment = require('../models/Comments.model');

router.post('/comments/create/:id', async (req, res, next) =>{
   
    const {id} = req.params
    const {content, author} = req.body;

    try {
        //create the comment
        const newComment = await Comment.create({content, author});

        //add comment to the restaurant
        const restaurantUpdate = await Restaurant.findByIdAndUpdate(id, {$push: {comments: newComment._id}});

        //add comment to the user profile
        const userUpdate = await User.findByIdAndUpdate(author, {$push:  {
            createdComment : newComment._id,
        },
    });


    res.redirect(`/restaurant-details/${id}`);
    } catch (error) {
       console.log(error);
       next(error); 
    }
})

module.exports = router;
