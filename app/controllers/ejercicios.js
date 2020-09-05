const express = require("express");

// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');

router.get('/', (req, res, next) => {
  db.select()
  .from('ejercicios')
  .then( ejercicios => {
    res.send({ ejercicios });
  });  
});

module.exports = router;