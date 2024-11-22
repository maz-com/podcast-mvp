import React, { useState, useEffect } from "react";
import axios from "axios";
import { FavoriteList } from "../components/FavoritePodcast/FavoriteList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

//import Col from "react-bootstrap/Col";

export const FavoritesPage = ({ updateLoginState }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/favorites");

        const { podcasts } = response.data;

        setFavorites(podcasts);
      } catch (error) {
        console.error("Could not fetch favorites:", error);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const postRating = async (id, rating) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/favorites/${id}/rating`,
        { rating }
      );
      return response.data;
    } catch (error) {
      console.error("Could not post rating:", error);
    }
  };

  const handlePodcastRating = async (id, rating) => {
    try {
      const updatedPodcast = await postRating(id, rating);
      //update  favorites podcast with  rating
      setFavorites((oldFavorites) =>
        oldFavorites.map((podcast) =>
          podcast.id === id ? { ...podcast, rating } : podcast
        )
      );
      alert("Rating has been updated!");
    } catch (error) {
      console.error("Could not update podcast rating:", error);
      alert("Could not updated rating. Please try again.");
    }
  };

  const deleteFavorites = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/favorites/${id}`
      );

      return response.data;
    } catch (error) {
      console.error("Could not delete podcast:", error);
    }
  };

  const handleDeleteFavorites = async (id) => {
    try {
      await deleteFavorites(id);
      setFavorites((oldFavorites) =>
        oldFavorites.filter((podcast) => podcast.id !== id)
      );
      alert("Podcast was removed from favorites!");
    } catch (error) {
      console.error("Could not delete podcast:", error);
      alert("Could not delete podcast. Please try again.");
    }
  };

  const handleLogout = () => {
    updateLoginState();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    handleLogout();
  };

  return (
    <Container>
      <Row>
        <h3>
          My Profile{" "}
          <Button variant="outline-secondary" onClick={logout}>
            Log Out
          </Button>
        </h3>
      </Row>
      <Row>
        {favorites.length > 0 ? (
          <FavoriteList
            favorites={favorites}
            handleDeleteFavorites={handleDeleteFavorites}
            handlePodcastRating={handlePodcastRating}
          />
        ) : (
          <p>No favorites added</p>
        )}
      </Row>
    </Container>
  );
  {
    /* <div>
      {favorites.length > 0 ? (
        <FavoriteList
          favorites={favorites}
          handleDeleteFavorites={handleDeleteFavorites}
          handlePodcastRating={handlePodcastRating}
        />
      ) : (
        <p>No favorites added</p>
      )}
    </div> */
  }
};
