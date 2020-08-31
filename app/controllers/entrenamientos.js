const express = require("express");

// Maneja /ejercicios
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Aquí irá la configuración del entrenamientos');
});

module.exports = router;