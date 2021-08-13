const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'admin',
        password: 'password',
        database: 'postgres'
    }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
    res.send(200, 'this is root, use an endpoint')
})

app.get('/movies', (req, res) => {

    if (req.query.title) {
        const title = req.query.title
        knex
            .select('*')
            .from('movies')
            .where({ title: title })
            .then(data => res.status(200).json(data))
            .catch(err =>
                res.status(404).json({
                    message:
                        'No Movie with that Title was found'
                })
            );
    }
    else {
        console.log(req.query)
        knex
            .select('*')
            .from('movies')
            .then(data => res.status(200).json(data))
            .catch(err =>
                res.status(404).json({
                    message:
                        'The data you are looking for could not be found. Please try again'
                })
            );
    }
});

app.get('/movies/:id', (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    knex
        .select('*')
        .from('movies')
        .where({ id: id })
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'Movie ID not found'
            })
        );
});

app.post('/movies', (req, res) => {
    knex('movies').max('id').then(data => {
        if (data) {
            let incrementedId = data[0].max;
            incrementedId++
            console.log('movieID', incrementedId)
            knex('movies')
                .insert({
                    id: incrementedId,
                    title: req.body.title,
                    genre: req.body.genre,
                    release_date: req.body.release_date,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at
                })
                .then(data => {
                    res.status(200).json(data)
                })
        }
    })
})

app.delete('/movies/:id', (req, res) => {
    console.log(req.body)
    knex('movies')
        .where({ id: req.params.id })
        .del()
        .then(() => res.send(200))
        .catch((err) => res.status(500))
})



app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});