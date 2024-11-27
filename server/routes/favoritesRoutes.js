var express = require("express");
var router = express.Router();
require("dotenv").config();
const authController = require("../controllers/authController");
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn"); // import the guard

const {
  addPodcast,
  getPodcasts,
  getPodcast,
  addRating,
  getFavorites,
  deletePodcast,
} = require("../controllers/favoriteController");

//adds podcasts to favorite list
router.post("/", userShouldBeLoggedIn, addPodcast);
//displays all podcasts saved in fav list
router.get("/", getPodcasts);
//router.get("/user/:user_id", getFavorites);
router.get("/user", userShouldBeLoggedIn, getFavorites);
//get podcast
router.get("/:id", getPodcast);
//adds rating once it's been listened
//router.put("/:id/rating", addRating);
router.put("/:id/rating", userShouldBeLoggedIn, addRating);
//get all podcasts by user_id

//deletes it
router.delete("/:id", deletePodcast);

module.exports = router;
