const express = require("express");
const knex = require('knex');
// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');
const path = require('path');
const fs = require('fs');


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
      pasosVuelta: req.body.pasosVuelta
    });
      
  });  
});

/////////// PETICIONES FALTANTES ////////////

router.post('/importar', (req, res) => {
  
});

router.post('/:id/exportar', (req, res, next) => {
  
  fs.writeFileSync(`./${req.params.id}.fit`, req.body.routineString);  
  //next();
  //res.send('funciona el post exportar');
  //después del send puedo eliminar el archivo
  //acá puedo hacer el fs.unlinkSync... buscar
  const routineFile = fs.readFileSync(`./${req.params.id}.fit`); 
 
  res.set({
    // Cómo se envía el contenido, si inline (no genera una descarga)
    // o como un descargable.
    "content-disposition": "attachment; filename=descarga.txt"
  });
  res.download(path.resolve(__dirname, `../../${req.params.id}.fit`), `./${req.params.id}.fit`);
});

/*
router.get('/:id/exportar', (req, res) => {
  
  // Leer archivo utilizado fs.
  const routineFile = fs.readFileSync(`./${req.params.id}.fit`); 
 
  res.set({
    // Cómo se envía el contenido, si inline (no genera una descarga)
    // o como un descargable.
    "content-disposition": "attachment; filename=descarga.txt"
  });
  res.download(path.resolve(__dirname, `./${req.params.id}.fit`), `./${req.params.id}.fit`);
});
*/


// Para actualizar la duración total del entrenamiento
router.put('/:id', (req, res) => {

});

router.get('/:id', (req, res, next) => {
    db.select()
    .from('entrenamientos').where('entrenamientos.id', req.params.id)
    .then( entrenamientos => {
      res.send({ 
        id: entrenamientos[0].id,
        fecha: entrenamientos[0].fecha,
        vueltas: entrenamientos[0].vueltas,
        series: entrenamientos[0].series,
        ejercicios: entrenamientos[0].lista_ejercicios
      });
    });  
});


router.get('/:id/ejercicios', (req, res, next) => {
    
  db.select()
  .from('entrenamientos').where('entrenamientos.id', req.params.id)
  .then( entrenamientos => {
    const exercisesList = entrenamientos[0].lista_ejercicios.split(',');
    db.select()
    .from('ejercicios')
    .then( ejercicios => {
      let exercises = [];
      for(let i = 0; i < ejercicios.length; i++) {
        for(let j = 0; j < exercisesList.length; j++ ) {       
          if(ejercicios[i].id === parseInt(exercisesList[j])) {
            exercises.push(ejercicios[i]);            
          }  
        }
      }      
      res.send({ 
        id: entrenamientos[0].id,
        ejercicios: exercises
      });      
    });    
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