
-- Clear the tables if they already exists

DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

/* CREATE TABLE `favorites`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `spotify_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `cover_image` VARCHAR(255) NOT NULL,
    `rating` INT UNSIGNED
); */

CREATE TABLE `favorites`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `spotify_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `cover_image` VARCHAR(255) NOT NULL,
    `rating` INT UNSIGNED,
    `user_id` INT UNSIGNED
);
CREATE TABLE `reviews`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `text` VARCHAR(255) NOT NULL,
    `spotify_id` INT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `favorites` ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `reviews` ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);