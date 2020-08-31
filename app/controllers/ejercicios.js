const express = require("express");

// Maneja /ejercicios
const router = express.Router();

const ejercicios = [
  { nombre: 'Flexiones'},
  { nombre: 'Sentadillas'},
  { nombre: 'Abdominales'},
];

router.get('/', (req, res, next) => {
  res.send({ ejercicios });
  
});

module.exports = router;