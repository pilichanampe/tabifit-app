const express = require("express");
const knex = require('knex');
// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');
const { createRoundSteps, multiplyRounds } = require('../public/js/routine');



router.get('/', (req, res, next) => {
  db.select()
  .from('entrenamientos')
  .then( entrenamientos => {
    res.send({ entrenamientos });
  });  
});

// Repensar esto, que no creo que esté bien...
router.post('/', (req, res) => {
  //quiero mostrar este error, pero no me estaría funcionando
 
  /*
  
  // Otro intento de mostrar el error, pero no funciona
  for(const key of Object.keys(req.body)) {
    if(key === '') {
      res.status(400).send({
        error: {
          tipo: 'falta_parametro',
          detalle: 'ejercicios'
        }
      })
    }
  }
  
  */ 
  
  //Intento de mostrar el error, pero no funciona
  if(req.body.ejercicios.length === 0) {
    res.status(400).send({
      error: {
        tipo: 'falta_parametro',
        detalle: 'ejercicios'
      }
    });
    return;
  }
  
  db('entrenamientos')
  .insert({
    // tengo que construir una fecha utilizando los métodos del objeto. Si no, me devuelve el objeto completo
    fecha: new Date().toJSON(),     
    vueltas: req.body.vueltas,
    series: req.body.series,
    // por qué me devuelve una string y no una lista??? Porque la base de datos devuelve string, está bien que sea así.
    lista_ejercicios: req.body.ejercicios      
   })
   .returning(["id", "fecha", "vuelta", "series", "ejercicios"])
   //Acá armo las respuestas como quiero
  .then(data => {
    //Acá tengo que acomodar la respuesta como yo quiero... pasosVuelta, etc...
    
    res.status(201).send({ 
      id: data[0],
      fecha: new Date().toJSON(),     
      vueltas: req.body.vueltas,
      series: req.body.series,
      ejercicios: req.body.ejercicios,
      pasosVuelta: createRoundSteps(req.body.series, req.body.ejercicios)});
      //console.log( data, { pasosVuelta: createRoundSteps(req.body.series, req.body.ejercicios) } );
  });  
});
module.exports = router;

//////////////// REVISAR SI HACE FALTA ESTA FUNCIÓN EN OTRO LADO, O DEBO BORRARLA DIRECTAMENTE /////////
/*
function stepsInPairs() {
  const steps = [];
  for(let i = 0; i < pasosVuelta.length; i++) {
      
      if(pasosVuelta.indexOf(pasosVuelta[i]) % 2 === 0) {
          steps.push([pasosVuelta[i], pasosVuelta[i + 1]]);
      }
      
  }
  return steps;
}
*/