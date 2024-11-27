// import the DB pool from your config folder
const pool = require("../config/db");

// Add podcast to fav list

/* const addPodcast = async (req, res) => {
  const { spotify_id, title, description, cover_image, user_id } = req.body;

  try {
    const [podcast] = await pool.query(
      "INSERT INTO favorites(spotify_id, title, description, cover_image, user_id) VALUES (?,?,?,?,?)",
      [spotify_id, title, description, cover_image, user_id]
    );

    return res.status(201).json({
      podcast: {
        spotify_id,
        title,
        description,
        cover_image,
        user_id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while creating a podcast",
    });
  }
}; */

const addPodcast = async (req, res) => {
  const { spotify_id, title, description, cover_image, user_id } = req.body;

  try {
    const [podcast] = await pool.query(
      "INSERT INTO favorites (spotify_id, title, description, cover_image, user_id) VALUES (?,?,?,?,?)",
      [spotify_id, title, description, cover_image, req.user_id]
    );

    return res.status(201).json({
      podcast: {
        spotify_id,
        title,
        description,
        cover_image,
        user_id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while creating a podcast",
    });
  }
};

//get all podcasts
const getPodcasts = async (req, res) => {
  try {
    const [podcasts] = await pool.query("SELECT * FROM favorites");

    return res.status(200).json({ podcasts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching podcasts" });
  }
};

//get podcast

const getPodcast = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM favorites WHERE id=?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "An error occurred while fetching podcast",
      });
    }

    return res.json({
      data: rows[0],
    });
  } catch (error) {
    console.log("Error fetching podcast:", error);

    return res.status(500).json({
      error: "Failed to get podcast",
    });
  }
};

//update rating

/* const addRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (!rating) {
    return res.status(400).json({
      error: "Rating is required to update the podcast",
    });
  }

  try {
    const [result] = await pool.query(
      "UPDATE favorites SET rating = ? WHERE id =?",
      [rating, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Rating could not be updated",
      });
    }

    return res.status(200).json({
      message: "Successfully updated rating",
      podcast: {
        id: id,
        rating,
      },
    });
  } catch (error) {
    console.error("there was an error updating the rating:", error);
    return res.status(500).json({
      error: "An error occurred while updating student",
    });
  }
}; */

const addRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (!rating) {
    return res.status(400).json({
      error: "Rating is required to update the podcast",
    });
  }

  try {
    const [result] = await pool.query(
      "UPDATE favorites SET rating = ?, user_id = ? WHERE id = ?",
      [rating, req.user_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Rating could not be updated",
      });
    }

    return res.status(200).json({
      message: "Successfully updated rating",
      podcast: {
        id: id,
        rating,
      },
    });
  } catch (error) {
    console.error("there was an error updating the rating:", error);
    return res.status(500).json({
      error: "An error occurred while updating student",
    });
  }
};

//get favorites by user_id
/* const getFavorites = async (req, res) => {
  //get user_id from request object
  const { user_id } = req.params;

  //make a database query to search for an item by id
  const [result] = await pool.query(
    "SELECT * FROM favorites WHERE user_id = ?",
    [user_id]
  );
  //return result
  res.status(200).send(result);
}; */
const getFavorites = async (req, res) => {
  // the user id should come from the token
  // decode the token - I can use the guard for that
  // if ny getFavorites is being called after the guard, I can get the user id from req.user_id

  //get user_id from request object
  //const { user_id } = req.params;

  //make a database query to search for an item by id
  const [result] = await pool.query(
    /* "SELECT * FROM favorites WHERE user_id = ?" */ `SELECT * FROM favorites WHERE user_id = ?`,
    [req.user_id] /* ,
    [user_id] */
  );
  //return result
  res.status(200).send(result);
};
//delete podcast

const deletePodcast = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM favorites WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Podcast does not exist",
      });
    }
    return res.status(200).json({
      messae: "Successfully deleted podcast",
    });
  } catch (error) {
    console.error("Error deleting podcast", error);
    return res.status(500).json({
      error: "An error occurred while deleting the podcast",
    });
  }
};

module.exports = {
  addPodcast,
  getPodcasts,
  getPodcast,
  addRating,
  getFavorites,
  deletePodcast,
};
