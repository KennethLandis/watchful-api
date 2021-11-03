const MoviesService = {
    getAllMovies(knex) {
        return knex.select('*').from('movies')
    },

    findByClient(knex, client_id) {
        return knex.from('movies').select('*').where({client_id})
    },


    insertMovie(knex, newMovie) {
        return knex
            .insert(newMovie)
            .into('movies')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    
    deleteMovie(knex, id) {
        return knex('movies')
            .where({ id })
            .delete()
    },
}

module.exports = MoviesService