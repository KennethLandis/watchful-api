require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./error-handler');
const clientsRouter = require('./clients/clients-router');
const moviesRouter = require('./movies/movies-router');
const {CLIENT_ORIGIN} = require('./config');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  }))

app.use(helmet());
app.use(cors({origin: CLIENT_ORIGIN}));

app.use(clientsRouter)
app.use(moviesRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app