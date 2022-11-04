const router = require('express').Router();
const Restaurants = require('../models/Restaurants.model');
const User = require('../models/User.model');
const Comments = require('../models/Comments.model');


router.get('/allrestaurants', async (req, res, next) => {
    try {
        const allRestaurants = await Restaurants.find();
        res.render('restaurants/restaurant-list', { allRestaurants });
           
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/restaurant-details/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const book = await Restaurants.findById(id)
        .populate('comments author')
        .populate({
            path : 'comments',
            populate: {
                path: 'author',
                model: 'User',
            }
        });
        
        res.render('restaurants/restaurant-details', {restaurant});
    } catch (error) {
     console.log(error);
     next(error);   
    }
});

router.get('/restaurant/favorites', async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
})


module.exports = router;