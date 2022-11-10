const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/User.model");
const Comment = require("../models/Comments.model");


// Get all users restaurants (my-restaurants.hbs)
/* router.get("/my-restaurants", isLoggedIn, async (req, res, next) => {
    try {
      const myRestaurants = await Restaurant.find();

      
      res.render("restaurant/my-restaurants", { myRestaurants });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
 */

module.exports = router;