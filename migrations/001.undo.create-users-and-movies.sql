ALTER TABLE movies DROP COLUMN IF EXISTS client_id;

DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS movies;