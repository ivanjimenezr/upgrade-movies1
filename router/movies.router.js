const express = require('express');

const router = express.Router();

const Movie = require('../models/Movie')


// GET todas las peliculas
router.get('/', (req, res) => {
  return Movie.find()
  .then(movies => {
      // Si encontramos las peliculas, los devolveremos al usuario
      res.status(200).json(movies)
  })
  .catch((err)=>{
      // Si hay un error, enviaremos por ahora una respuesta de error.
      console.log('Error en GET /', err)
      return res.status(500).json('Ha ocurrido un error en el servidor')
  })
})

// GET pelicula por ID
router.get('/:id',(req, res)=>{
  const id = req.params.id;
  Movie.findById(id)
    .then(movie => {
      if (!movie){
        return res.status(404).json('La película no existe')
      }
      res.json(movie)
    })
    .catch((err)=>{
      console.log(`Error en GET /${id}`, err)
      return res.status(500).json('Ha habido un error en el servidor')
    })

})

// GET peliculas por su titulo
router.get('/titulo/:titulo', (req, res)=>{
  const titulo = req.params.titulo;
  Movie.find({ title: titulo })
    .then(movies => {
      // Si encontramos las peliculas, los devolveremos al usuario
      res.status(200).json(movies)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        console.log(`Error en GET /error/${titulo}`, err)
        return res.status(500).json('Ha ocurrido un error en el servidor')
    })
})

// GET peliculas por su genero
router.get('/genero/:genero', (req, res)=>{
  const genero = req.params.genero;
  Movie.find({ genre: genero })
    .then(movies => {
      // Si encontramos los generos, los devolveremos al usuario
      res.status(200).json(movies)
    })
    .catch((err)=>{
        // Si hay un error, enviaremos por ahora una respuesta de error.
        console.log(`Error en GET /genero/${genero}`, err)
        return res.status(500).json('Ha ocurrido un error en el servidor')
    })
})

// GET peliculas estrenadas a partir de la fecha indicada
router.get('/fecha/:fecha', (req, res)=>{
  const fecha = req.params.fecha;
  Movie.find({year:{$gt:fecha}})
    .then(movies => {
      res.status(200).json(movies)
    })
    .catch((err)=>{
      console.log(`Error en GET /fecha/${fecha}`, err)
      return res.status(500).json('ha ocurrido un error en el servidor')
    })
})





// router.get('/movies',(req,res) => {
//     res.send(movies)
// })
// router.get('/movies/:titulo', (req, res) => {
//     let tituloPeli = req.params.titulo;
//     const peliPorTitulo = movies.filter(tituloEnArray => tituloEnArray.title === tituloPeli);
//     if (!peliPorTitulo){
//         res.status(404).send('No se ha encontrado la peli')
//         return;
//     }

//     res.send(peliPorTitulo)
// })
// router.get('/id/:id', (req, res) => {
//     let idPeli = Number(req.params.id);
//     if (Number.isNaN(idPeli)){
//         res.sendStatus(400);
//         return;
//     }
//     //const idPeliADevolver = movies.find(idEnElArray=>idEnElArray.id ===idPeli)
//     idPeli = idPeli.toString()
//     res.send(idPeli)
// })
// router.get('/genero/:genero', (req, res) => {
//     let genPeli = req.params.genero;
    
//     const genderPeli = movies.filter(genderEnArray => genderEnArray.genre === genPeli)
//     if (!genderPeli){
//         res.status(404).send('El género no coincide con ninguno existente')
//         return;
//     }
//     res.send(genderPeli)
// })
// router.get('/anos/:ano', (req, res) => {
//     const anoPeli = Number(req.params.ano);
//     if (Number.isNaN(anoPeli)){
//         res.sendStatus(400)
//         return;
//     }

//     const pelisMas2010 = movies.filter(pelisEnArray => pelisEnArray.year > anoPeli)
//     res.send(pelisMas2010)

// })


// router.get('/peliculas/:titulo',(req, res) => {
//     const tituloPeli =req.params.titulo;
//     res.send('titulo: ',tituloPeli)
// })


module.exports = router;