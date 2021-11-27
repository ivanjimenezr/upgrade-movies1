const express = require('express');
// const { router: moviesRouter } = require('./router/movies.router');

require('./utils/db')


const PORT = 3000;
const server = express();

const Movie = require('./models/Movie');
const router = express.Router();
const moviesRouter = require('./router/movies.router')

server.use('/movies', moviesRouter)

server.use('*', (req, res)=>{
    res.status(404).json('Not Found*')
});


server.listen(PORT, ()=>{
    console.log(`The server running in http://localhost/${PORT}`)
})