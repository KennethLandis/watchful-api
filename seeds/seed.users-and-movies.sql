INSERT INTO clients (client_name, user_password)
VALUES
    ('test1', 'Thinkful'),
    ('test2', 'Watchful');

INSERT INTO movies (id, title, image, description, client_id)
VALUES
    ('tt0241527', 'Harry Potter and the Sorcerer''s Stone', 'https://imdb-api.com/images/original/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_Ratio0.7273_AL_.jpg', '(2001)', 1),
    ('tt0304141', 'Harry Potter and the Prisoner of Azkaban', 'https://imdb-api.com/images/original/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_Ratio0.7273_AL_.jpg', '(2004)', 1),
    ('tt0330373', 'Harry Potter and the Goblet of Fire', 'https://imdb-api.com/images/original/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_Ratio0.7273_AL_.jpg', '(2005)', 2);