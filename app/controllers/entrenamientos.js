const express = require("express");
const knex = require('knex');
// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');



router.get('/', (req, res, next) => {
  db.select()
  .from('entrenamientos')
  .then( entrenamientos => {
    res.send({ entrenamientos });
  });  
});

// Repensar esto, que no creo que esté bien...
router.post('/', (req, res) => {
  db('entrenamientos')
  .insert({
    // tengo que construir una fecha utilizando los métodos del objeto. Si no, me devuelve el objeto completo
    fecha: new Date().toJSON(),     
    vueltas: req.body.vueltas,
    series: req.body.series,
    // por qué me devuelve una string y no una lista???
    lista_ejercicios: req.body.ejercicios ,
      //Esto no va acá, por eso me tira error
    //pasosVuelta: "algo"  
   })
   //Acá armo las respuestas como quiero
  .then(data => {
    //Acá tengo que acomodar la respuesta como yo quiero... pasosVuelta, etc...
    res.status(201).send({ data });
  }); 
  
});
module.exports = router;