const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

///////////////////
/// RESTAURANTS ///
///////////////////
// Get all restaurants (restaurant-list.hbs)
router.get("/restaurant-list", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.render("restaurant/restaurant-list", { restaurants });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Individual restaurant - details route (restaurant-details.hbs)
router.get("/restaurant-details/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    //get all the users  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const users = await User.find();
    //get the specific restaurant
    const restaurant = await Restaurant.findById(id)
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });
    res.render("restaurant/restaurant-details", { restaurant, users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Display a página de form - GET (restaurant-create.hbs)
router.get("/restaurant-create", isLoggedIn, (req, res, next) =>
  res.render("restaurant/restaurant-create")
);
// Receber a informação do form - POST (restaurant-create.hbs)
router.post("/restaurant-create", isLoggedIn, async (req, res, next) => {
  try {
    let { name, imgUrl, placeId } = req.body;

    // Obrigar users a preencher os requisitos abaixo - Exemplo
    if (!name) {
      res.redirect("/error");
    }

    const createdRestaurant = await Restaurant.create({
      name,
      imgRestaurant: imgUrl,
      placeId,
    });

    const userId = req.session.currentUser._id;
    const userRest = await User.findByIdAndUpdate(userId, {
      $push: { restaurants: createdRestaurant._id },
    });

    // Redirecciona para a review
    res.redirect(`/review-create/${createdRestaurant._id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Display a página de Edit routes (restaurant-edit.hbs)
router.get("/restaurant-edit/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("restaurant/restaurant-edit", restaurant);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// Receber a informação do EDIT form- POST (restaurant-edit.hbs)
router.post("/restaurant-edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, imgRestaurant, placeId } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, {
      name,
      imgRestaurant,
      placeId,
    });
    // Em vez de fazer render, redirecciona para o restaurante acabado de editar
    res.redirect(`/restaurant-details/${updatedRestaurant._id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete restaurant (no need for hbs file)
router.post("/restaurant-delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Restaurant.findByIdAndRemove(id);
    // Em vez de fazer render, redirecciona para o restaurante acabado de editar
    res.redirect(`/restaurant-list/`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

///////////////
/// REVIEWS ///
///////////////

// Get all reviews (my-restaurants.hbs)
router.get("/my-restaurants", isLoggedIn, async (req, res, next) => {
  try {
    /*     const restaurants = await Restaurant.find().populate("reviews");
    const userReviews = restaurants.filter((restaurant) => {
      restaurant.author == req.session.currentUser._id;
    });
    console.log(userReviews); */
    
    const userId = req.session.currentUser._id;
    const userRest = await User.findById(userId)
    .populate("restaurants")
    .populate({
      path: "restaurants",
      populate: {
        path: "reviews",
        model: "Review",
      },
    })
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
      },
    });
    console.log(userRest.restaurants[0].reviews);
    
    res.render("restaurant/my-restaurants", { userRest });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Individual restaurant - details route (review-details.hbs)
router.get("/review-details/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    //Restaurant id
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id)
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          ref: "Restaurant",
        },
      });

    const review = restaurant.reviews.filter(
      (review) => review.author == userId
    )[0];
    //get all the users
    //const users = await User.find();
    //get all the restaurants
    //const restaurants = await Restaurant.find();
    //get the specific review

    console.log(review);

    res.render("restaurant/review-details", review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Display a página de form - GET (review-create.hbs)
router.get("/review-create/:id", isLoggedIn, (req, res, next) => {
  const restId = req.params.id;
  res.render("restaurant/review-create", { restId });
});
// Receber a informação do form - POST (review-create.hbs)
router.post("/review-create/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const restaurantId = req.params.id;
    let { description, rating } = req.body;
    rating = Number(rating);

    console.log(restaurantId);

    // Obrigar users a preencher os requisitos abaixo - Exemplo
    if (!rating) {
      res.redirect("/error");
    }

    const createdReview = await Review.create({
      description,
      rating,
      author: userId,
      restaurant: restaurantId,
    });

    const restaurantUpdate = await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: {
        reviews: createdReview._id,
      },
    });

    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: {
        reviews: createdReview._id,
      },
    });

    // Em vez de fazer render, redirecciona para o restaurante acabado de criar
    res.redirect(`/my-restaurants`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Display a página de Edit routes (review-edit.hbs)
router.get("/review-edit/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    res.render("restaurant/review-edit", review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// Receber a informação do EDIT form- POST (review-edit.hbs)
router.post("/review-edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(id, {
      description,
      rating,
    });
    // Em vez de fazer render, redirecciona para o restaurante acabado de editar
    res.redirect(`/review-details/${updatedReview.restaurant}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete review (no need for hbs file)
router.post("/review-delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    //take the review from the restaurant
    await Restaurant.findByIdAndUpdate(review.restaurant, {
      $pull: { reviews: review._id },
    });
    //take the review from the user
    await User.findByIdAndUpdate(review.author, {
      $pull: { reviews: review._id },
    });
    //take the restuarant from the user
    await User.findByIdAndUpdate(review.author, {
      $pull: { restaurants: review.restaurant },
    });

    //lastly, delete the review
    await Review.findByIdAndRemove(id);
    // Em vez de fazer render, redirecciona para os restaurantes do user
    res.redirect(`/my-restaurants`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

////////////////
/// COMMENTS ///
////////////////
//Comments (Individual Restaurant)
router.post("/comment/create/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const author = req.session.currentUser._id;
  try {
    //Create the review
    const newComment = await Comment.create({ content, author });

    //Add the review to the restaurant
    const restaurantUpdate = await Restaurant.findByIdAndUpdate(id, {
      $push: {
        comments: newComment._id,
      },
    });

    //Add the review to the user
    const userUpdate = await User.findByIdAndUpdate(author, {
      $push: {
        comments: newComment._id,
      },
    });

    //Redirect to the same page
    res.redirect(`/restaurant-details/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/comment/delete/:id/:restaurantId", async (req, res, next) => {
  const { id, restaurantId } = req.params;
  try {
    const removedComment = await Comment.findByIdAndRemove(id);
    await User.findByIdAndUpdate(removedComment.author, {
      $pull: { comments: removedComment._id },
    });
    res.redirect(`/restaurant-details/${restaurantId}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
