const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/User.model");
const Comment = require("../models/Comments.model");

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
    const { id } = req.params;
    //get all the users
    const users = await User.find();
    //get the specific book
    const restaurant = await Restaurant.findById(id)
      .populate("comments author")
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

/*router.get("/restaurant/favorites", async (req, res, next) => {
  try {
  } catch (error) {}
});*/

// Display a página de form - GET (restaurant-create.hbs)
router.get("/restaurant-create", (req, res, next) =>
  res.render("restaurant/restaurant-create")
);
// Receber a informação do form - POST (restaurant-create.hbs)
router.post("/restaurant-create", async (req, res, next) => {
  try {
    let { name, description, rating } = req.body;
    console.log(req.body);
    rating = Number(rating);

    // Obrigar users a preencher os requisitos abaixo - Exemplo
    if (!name) {
      res.redirect("/error");
    }

    const createdRestaurant = await Restaurant.create({
      name,
      description,
      rating,
    });
    // Em vez de fazer render, redirecciona para o restaurante acabado de criar
    res.redirect(`/restaurant-details/${createdRestaurant._id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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
    const { name, description, rating } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, {
      name,
      description,
      rating,
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

//Reviews (Individual Books)
router.post("/comment/create/:id", async (req, res, next) => {
  const { id } = req.params;
  const { content, author } = req.body;
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
        createdComments: newComment._id,
      },
    });

    //Redirect to the same page
    res.redirect(`/restaurant-details/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/comment/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedComment = await Comment.findByIdAndRemove(id);
    await User.findByIdAndUpdate(removedComment.author, {
      $pull: { createdComments: removedComment._id },
    });
    res.redirect(`/restaurant-details/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
