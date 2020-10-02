const express = require("express");
const knex = require('knex');
// Maneja /ejercicios
const router = express.Router();
const db = require('../../database');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

/*let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploaded-files');
  },
  filename: (req, file, cb) => {
    console.log(file);    
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
*/
router.get('/', (req, res, next) => {
  db.select()
  .from('entrenamientos')
  .then( entrenamientos => {
    res.send({ entrenamientos });
  });  
});




// Repensar esto, que no creo que esté bien...
router.post('/', (req, res) => {
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

/*router.post('/importar', upload.single('tabifit-file'), (req, res) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  res.redirect(303, '/');
});*/

router.post('/importar', (req, res) => {
  //console.log('rutina 1 vuelta: ', req.body);
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


router.post('/:id/exportar', (req, res, next) => {
  //console.log('entre al post');  
  
  fs.writeFileSync(`./${req.params.id}.fit`, `${req.body.routineString}`);
  res.sendStatus(200)
  //fs.writeFileSync(`./${req.params.id}.fit`, `["${req.body.routineString}"]`);
  //res.download(path.resolve(__dirname, `../../${req.params.id}.fit`), `./${req.params.id}.fit`);

});

  /*

  //next();
  //res.send('funciona el post exportar');
  //después del send puedo eliminar el archivo
  //acá puedo hacer el fs.unlinkSync... buscar
  //const routineFile = fs.readFileSync(path.resolve(__dirname, `../../${req.params.id}.fit`), `./${req.params.id}.fit`); 
  res.set({    
    //"content-type": "application/octet-stream",
    "content-type": "text/plain",
    "content-disposition": "attachment; filename=descarga.txt"
  });
  res.download(path.resolve(__dirname, `../../${req.params.id}.fit`), `./${req.params.id}.fit`);
  //res.download();
  //res.send(routineFile);
*/

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


router.get('/:id/exportar', (req, res, next) => {
  //console.log('entre al get');
  

  const fileToDownload = path.resolve(__dirname, `../../${req.params.id}.fit`); // path valido
  //const fileToDownload = path.resolve(__dirname, `../../../../../../${req.params.id}.fit`); // path invalido para probar error en download
  const fileName = `${req.params.id}.fit`

  //console.log('fileToDownload: ',fileToDownload)
  //console.log('fileName: ',fileName)
  
  res.download(fileToDownload, fileName, function (err) {
    if (err) {
      console.log('error detectado en el download')
      console.log('err: ', err)
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }    
  });
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
  const duration = req.body;
  //console.log(duration);
  
  db('entrenamientos')
  .where('id', req.params.id)
  .update(duration)
  .then(durationUpdated => {
    res.status(201).send({
      id: req.params.id, 
      duracion: duration
    });
    //console.log('durationUpdated: ', durationUpdated);
  })  
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