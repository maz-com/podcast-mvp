# In the Loop

This project is a React-based web application that allows users to search for podcasts, add them to favorites, rate them, and delete them.

## Getting Started

### MySQL setup

Open MySQL:

If you use MySQL Workbench, open that. OR:
If you have a Windows, open the MySQL Command Line Interface (CLI) tool. OR:
If you have Mac, run mysql -u root -p to open the MySQL CLI.
Create a database for your app by running CREATE DATABASE your-app-name; (replace with your actual app name). Don't worry about tables yet, that will come later! Check that it worked:

If you're using MySQL Workbench, you should see your new database name in your database list on the left.
If you're using the MySQL CLI (Mac or Windows), run SHOW DATABASES; to see a list of your databases: the new one should be there.

Follow the steps below to install your dependencies and start your server:

In your termina, `cd client` and then:
`npm install` to install packages.

In a different terminal, `cd server` and then:

`npm install` to install packages.
`npm run migrate` to set up the databas

### Add .env file

Create a `.env` file (in the root project directory) to store your database connection information. You can follow the format example below. It should include the name of your project's database, as well as your host, MySQL username and password.

DB_HOST=localhost
DB_USER=root
DB_PASS=YOURPASSWORD
DB_NAME=YOURDATABASE

### Run the project

Then, run `npm start` inside your `server` folder to start your back-end server.

In a different terminal, navigate to your main project folder and `cd client`. Then, `npm run dev` to run your client.

## Features

- Search Podcasts: users can search for podcasts by topic and country using the Spotify API
- Favorite Podcasts: users can add podcasts to their favorites list.
- Rate Podcasts: users can rate their favorite podcasts from 1 to 5.
- Delete favorites: users can remove podcasts from their favorite list.

## Technologies used

Frontend:

1. React
2. React Router
3. Axios
4. React Bootstrap
5. CSS
6. CodePen

Backend:

1. Node.js
2. Express.js
3. MySQL
4. Spotify API
5. Postman

## File Structure

src/
├── components/
│ ├── FavoritePodcast/
│ │ ├── FavoriteList.css  
│ │ ├── FavoriteList.jsx #Component to display the favorite podcasts list
│ │
│ ├── NavBar/
│ │ ├── NavBar.jsx # Component for the navigation bar
│ │
│ ├── Podcast/
│ ├── BannerSearch.css  
│ ├── BannerSearch.jsx # Component for the banner
│ ├── DisplayPodcast.css  
│ ├── DisplayPodcast.jsx # Component to display podcast details
│ ├── PodcastList.css  
│ ├── PodcastList.jsx # Component to display a list of podcasts
│ ├── SearchPodcast.css  
│ ├── SearchPodcast.jsx # Component for searching podcasts
│
├── pages/
│ ├── SearchPage.jsx # Page container for searching podcasts
│ ├── FavoritesPage.jsx # Page container for managing favorite podcasts

## Endpoints Favorites

### Add a Podcast to favorites

/api/favorites

### Get a Single Podcast

/api/favorites/:id

### Add a Rating to a Podcast

/api/favorites/:id/rating

### Delete a Podcast from Favorites

/api/favorites/:id

## Spotify API

### Get Spotify access token

/api/spotify/token

### Search Podcast

/api/spotify/search

## Running the Project

### Server

npm run start

### Client

npm run dev
