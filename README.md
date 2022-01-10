Watchful API

Created Movie reminder app with custom server

Summary: Custom API hosted on Heroku to connect to Watchful app frontend.  Created endpoints to store users and passwords as well as track movies that are added or deleted to help users keep track of titles they are keen to revisit in the future.  

Screenshot: ![image](https://user-images.githubusercontent.com/67128061/148728118-ca2d93e0-d102-42d9-be92-9b6f8aa2c2ca.png)

Live link: https://watchlist-app.vercel.app/

Server Link: https://secret-reaches-45778.herokuapp.com

Technology: This app was built using React Html Css Javascript jQuery Express Node.js PSQL

App github: https://github.com/KennethLandis/watchlist-app

Documentation

Routes and Endpoints

The watchful-api was written with a clients and a movies router built in with endpoints up date the two tables.
The "base url" + /clients route will allow you to GET a list of users or target a single by ID as well as POST a new user.
Each client posted will need to be serialized to prevent malicious scripting.

GET all users

"base url/clients"

GET user by Name

"base url/clients/{Name param}"

POST user

"base url/clients" including a req body with a client_name="" and user_password="".

We also include a route for manipulating the habits for each user to personalize their experience with the app.

These include a GET | POST | DELETE option targeting the movies by client id in the relational database. Each movie needs to be serialized to protect against malicious scripting.
