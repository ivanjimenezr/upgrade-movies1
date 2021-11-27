const express = require('express');
// const { router: moviesRouter } = require('./router/movies.router');

require('./utils/db')


const PORT = 3000;
const server = express();

const Movie = require('./models/Movie');
const router = express.Router();
const moviesRouter = require('./router/movies.router')

server.use('/movies', moviesRouter)

server.use('*', (req, res, next)=>{
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Manejador de errores, siempre se define con los 4 parametros
server.use((err, req, res, next) => {
    console.log('[ERROR] Ha ocurrido un error', err.status, err.message)
	return res.status(err.status || 500).json(err.message || 'Se ha producido un error en el servidor');
});

server.listen(PORT, ()=>{
    console.log(`The server running in http://localhost/${PORT}`)
})