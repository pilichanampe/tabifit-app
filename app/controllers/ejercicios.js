const express = require("express");
const knex = require('knex');

const router = express.Router();
const db = require('../../database');

router.get('/', (req, res, next) => {
  db.select()
  .from('ejercicios')
  .then( ejercicios => {
    if(!ejercicios.length) {
      res.status(204).end();
    }
    res.status(200).send({ ejercicios });
  });  
});

//POST adicional a los requeridos en el trabajo, creado para poder agregar más ejercicios a través de Insomnia o Postman en la base de datos.
router.post('/', (req, res, next) => {
  // Manejo de errores por falta de campos requeridos.
  if (!req.body.nombre) {
    res.status(400).send({ error: {
      tipo: "falta_parametro",
      detalle: "nombre"
    }});
    return;
  }
  if (!req.body.abreviatura) {
    res.status(400).send({ error: {
      tipo: "falta_parametro",
      detalle: "abreviatura"
    }});
    return
  }
  
  // Agrego a la base de datos el nuevo ejercicio
  db('ejercicios')
  .insert({
    nombre: req.body.nombre,
    abreviatura: req.body.abreviatura
  })
  .then(data => {
    res.status(201).send({ data });
  })
})

// DELETE agregado por si se quiere eliminar algún ejercicio que se haya creado y no se quiera que esté.
router.delete("/", (req, res, next) => {
 // Manejo de errores por falta de campos requeridos.
 if (!req.body.nombre) {
  res.status(400).send({ error: {
    tipo: "falta_parametro",
    detalle: "nombre"
  }});
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