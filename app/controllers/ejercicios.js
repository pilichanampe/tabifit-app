const express = require("express");
const knex = require('knex');

// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');

// La idea de tener varios manejadores es para separar responsabilidades.
// No usar varios manejadores que hagan la misma cosa. Se puede resolver en uno solo.

router.get('/', (req, res, next) => {
  db.select()
  .from('ejercicios')
  .then( ejercicios => {
    res.status(200).send({ ejercicios });
  });  
});


// Los siguientes metodos son solamente para poder editar la DB sin tener que usar algo externo.
// Desde insomnia puede hacerse un API call a /ejercicios para agregar o borrar ejercicios.

router.post('/', (req, res, next) => {

// Para agregar multiples opciones al post, es necesario diferenciar que queremos hacer.
// Para eso, podemos agregar una propiedad llamada operacion que se usa para elegir la funcion a realizar...
// Esta nueva propiedad deberia ser agregada al body del API
//
// if (req.body.operacion == "add") {funcionParaAgregar(req.body.nombre, req.body.abreviatura)}
// else if (req.body.operacion == "modificar") {funcionParaAgregar(req.body.id, req.body.nombre, req.body.abreviatura)}
//
  
  // Manejo de errores por falta de campos requeridos.
  if (!req.body.nombre) {
    res.status(400).send({error: "Falta la propiedad nombre en el body del call"})
    return;
  }
  if (!req.body.abreviatura) {
    res.status(400).send({error: "Falta la propiedad abreviatura en el body del call"})
    return;
  }
  
  // Agregar a la DB el nuevo ejercicio
  db('ejercicios')
  .insert({
    nombre: req.body.nombre,
    abreviatura: req.body.abreviatura
  })
  .then(data => {
    res.status(201).send({ data });
  })
})

router.delete("/", (req, res, next) => {
 // Manejo de errores por falta de campos requeridos.
 if (!req.body.nombre) {
  res.status(400).send({error: "Falta la propiedad nombre en el body del call"})
  return;
  }
  
  db('ejercicios')
    .where("nombre", req.body.nombre)
    .del()
    .then(() => {
      res.status(204).end();
    });
});



module.exports = router;