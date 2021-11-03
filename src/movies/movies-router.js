const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const MoviesService = require('./movies-service')
const bodyParser = express.json()
const moviesRouter = express.Router();

const serializeMovie = movie => ({
    id: xss(movie.id),
    title: xss(movie.title),
    description: xss(movie.description),
    image: xss(movie.image),
    client_id: (movie.client_id)
})

moviesRouter
    .route('/movies')
    .get((req, res, next) => {
        MoviesService.getAllMovies(req.app.get('db'))
        .then(movies => {
            res.json(movies.map(serializeMovie))
        })
        .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        for (const field of ['id', 'title', 'description', 'image', 'client_id'])
        if(!req.body[field]) {
            logger.error(`${field} is required`)
            return res.status(400).send({
                error: { message: `'${field} is required`}
            })
        }
        const { id, title, description, image, client_id } = req.body

        const newMovie = { id, title, description, image, client_id }

        MoviesService.insertMovie(
            req.app.get('db'),
            newMovie
        )
            .then(movie => {
                logger.info(`Movie with id ${movie.id} created`)
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${movie.id}`))
                    .json(serializeMovie(movie))
            })
            .catch(next)
    })

moviesRouter
    .route('/movies/:client_id')
    .all((req, res, next) => {
        const { client_id } = req.params
        console.log(client_id)
        MoviesService.findByClient(req.app.get('db'), client_id)
        .then(movies => {
            res.json(movies.map(serializeMovie))
        })
        .catch(next)
    })

moviesRouter
    .route('/movies/delete/:id')
    .delete((req, res, next) => {
        const { id } = req.params
        MoviesService.deleteMovie(
            req.app.get('db'),
            id
        )
            .then(numRowsAffected => {
                logger.info(`Movie with id ${id} deleted.`)
                res.status(204).json({});
            })
            .catch(next)
    })


module.exports = moviesRouter
