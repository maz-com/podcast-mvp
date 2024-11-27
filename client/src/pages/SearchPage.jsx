import React, { useState } from "react";
import { BannerSearchPage } from "../components/Podcast/BannerSearchPage";
import { SearchPodcast } from "../components/Podcast/SearchPodcast";
import { PodcastList } from "../components/Podcast/PodcastList";
import { DisplayPodcast } from "../components/Podcast/DisplayPodcast";
import axios from "axios";
import "./SearchPage.css";

export const SearchPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
  };

  //adds podcasts to database
  const addFavorites = async (podcast) => {
    try {
      await axios("http://localhost:4000/api/favorites", {
        method: "POST",
        data: {
          spotify_id: podcast.id,
          title: podcast.name,
          description: podcast.description,
          cover_image: podcast.images?.[0].url,
        },
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      //return response.data;
    } catch (error) {
      console.error("Could not add to favorites:", error);
      if (error.response) {
        console.error(error);
      }
      throw error;
    }
  };

  const handleAddFavorites = async (podcast) => {
    try {
      await addFavorites(podcast);
      alert("Podcast has been added to favorites!");
    } catch (error) {
      alert("Please log in to your account to add a podcast to your favorites");
    }
  };

  return (
    <div className="search-page-background">
      <BannerSearchPage />
      <SearchPodcast setPodcasts={setPodcasts} />
      <PodcastList
        podcasts={podcasts}
        handlePodcastClick={handlePodcastClick}
      />
      {selectedPodcast && (
        <DisplayPodcast
          selectedPodcast={selectedPodcast}
          handleAddFavorites={handleAddFavorites}
        />
      )}
    </div>
  );
};
