const express = require('express');
var bodyParser = require('body-parser')
const app = express();
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

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send(200, 'this is root, use an endpoint')
})

app.get('/movies', (req, res) => {

    if(req.query.title) {
        const title = req.query.title
        knex
        .select('*')
        .from('movies')
        .where({title: title})
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
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
                    'The data you are looking for could not be found. Please try again'
            })
        );
});

app.post('/movies', (req, res) => {
    knex('movies')
        .insert(req.body)
        .then(() => res.send(200))
        .catch(err =>
            res.status(500))
})



app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});