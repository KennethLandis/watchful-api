const app = require('../src/app')
const knex = require('knex')
const supertest = require('supertest')
const { expect } = require('chai')
const { default: contentSecurityPolicy } = require('helmet/dist/middlewares/content-security-policy')
const { makeUsersArray } = require('./users.fixtures')
const { makeMoviesArray } = require('./movies.fixtures')

describe('Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE clients, movies RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE clients, movies RESTART IDENTITY CASCADE'))

    describe('GET /clients', () => {
        context('Given no clients', () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/clients')
                    .expect(200, [])
            })
        })

        context(`Given there are users in the database`, () => {
            const testUsers = makeUsersArray();
            const testMovies = makeMoviesArray();

            beforeEach('insert data', () => {
                return db
                    .into('clients')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('movies')
                            .insert(testMovies)
                    })
            })

            it('responds with 200 and all of the users', () => {
                return supertest(app)
                    .get('/clients')
                    .expect(200, testUsers)
            })
        })        
    })
    describe(`GET /clients:client_id`, () => {
        context('Given no clients', () => {
            it(`responds with 404`, () => {
                const userId = 6
                return supertest(app)
                    .get(`/clients/${userId}`)
                    .expect(404, { error: { message: `Client Not Found` } })
            })
        })
        context(`Given there are users in the database`, () => {
            const testUsers = makeUsersArray();
            const testMovies = makeMoviesArray();
            console.log(testUsers)

            beforeEach('insert data', () => {
                return db
                    .into('clients')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('movies')
                            .insert(testMovies)
                    })
            })

            it(`responds with 200 and the specified user`, () => {
                const userId = 2
                const expectedUser = testUsers[userId - 1]
                
                return supertest(app)
                    .get(`/clients/${expectedUser.client_name}`)
                    .expect(200, expectedUser)
            })
        })
    })
    describe(`Post /clients`, () => {
        it(`creates an user, responding with 201 and the new user`, () => {
            const newUser = {
                client_name: 'cale',
                user_password: 'dragonglory'
            }
            return supertest(app)
                .post('/clients')
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body.client_name).to.eql(newUser.client_name)
                    expect(res.body.user_password).to.eql(newUser.user_password)
                    expect(res.body).to.have.property('id')
                })
                .then(res =>
                    supertest(app)
                    .get(`/clients/${res.body.client_name}`)
                    .expect(res.body))
        })
    })
    describe('GET /movies', () => {
        context('Given no movies', () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/movies')
                    .expect(200, [])
            })
        })

        context(`Given there are movies in the database`, () => {
            const testUsers = makeUsersArray();
            const testMovies = makeMoviesArray();

            beforeEach('insert data', () => {
                return db
                    .into('clients')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('movies')
                            .insert(testMovies)
                    })
            })

            it('responds with 200 and all of the users', () => {
                return supertest(app)
                    .get('/movies')
                    .expect(200, testMovies)
            })
        })        
    })
    describe(`Post /movies`, () => {
        const testUsers = makeUsersArray();
        beforeEach('insert data', () => {
            return db
                .into('clients')
                .insert(testUsers)
        })
        it(`creates a habit, responding with 201 and the new habit`, () => {
            const newMovie = {
                id: 'tt0241528',
                title: "Something",
                image: 'insert-image',
                description: '(2021)',
                client_id: 1
            }
            return supertest(app)
                .post('/movies')
                .send(newMovie)
                .expect(201)
                .expect(res => {
                    expect(res.body.id).to.eql(newMovie.id)
                    expect(res.body.title).to.eql(newMovie.title)
                    expect(res.body.image).to.eql(newMovie.image)
                    expect(res.body.description).to.eql(newMovie.description)
                    expect(res.body.client_id).to.eql(newMovie.client_id)
                })
                .then(res =>
                    supertest(app)
                    .get(`/movies`)
                    .expect(200))
        })
    })
    describe(`DELETE /movies/delete/:id`, () => {
        const testUsers = makeUsersArray();
        const testMovies = makeMoviesArray();

        beforeEach('insert data', () => {
            return db
                .into('clients')
                .insert(testUsers)
                .then(() => {
                    return db
                        .into('movies')
                        .insert(testMovies)
                })
        })
    
         it('responds with 204 and removes the movie', () => {
           const idToRemove = 'tt0241527'
           const expectedMovies = testMovies.filter(movie => movie.id !== idToRemove)
           return supertest(app)
             .delete(`/movies/delete/${idToRemove}`)
             .expect(204)
             .then(res =>
               supertest(app)
                 .get(`/movies`)
                 .expect(expectedMovies)
             )
         })
       })
  })