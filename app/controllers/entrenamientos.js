const express = require("express");
const knex = require('knex');
const router = express.Router();
const db = require('../../database');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

// Quedó comentado este código, ya que se resolvió no generar la subida del archivo con Multer desde Node, ya que generaba algunos inconvenientes. En cambio, se utilizó la API FileReader desde el frontend.
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
    if(!entrenamientos.length) {
      res.status(204).end();
    }
    res.status(200).send({ entrenamientos });
  });  
});

router.post('/', (req, res) => {
  if(!req.body.ejercicios) {    
    res.status(400).send({
      error: {
        tipo: 'falta_parametro',
        detalle: 'ejercicios'
      }
    });    
    return;
  }

  if(!req.body.series) {    
    res.status(400).send({
      error: {
        tipo: 'falta_parametro',
        detalle: 'series'
      }
    });    
    return;
  }
    
  if(!req.body.vueltas) {    
    res.status(400).send({
      error: {
        tipo: 'falta_parametro',
        detalle: 'vueltas'
      }
    });    
    return; 
  }  
  
  db('entrenamientos')
  .insert({
    fecha: new Date().toJSON(),     
    vueltas: req.body.vueltas,
    series: req.body.series,
    // por qué me devuelve una string y no una lista??? Porque la base de datos devuelve string, está bien que sea así.
    lista_ejercicios: req.body.ejercicios      
   })
   .returning(["id", "fecha", "vuelta", "series", "ejercicios"])
   .then(data => {
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

/*router.post('/importar', upload.single('tabifit-file'), (req, res) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  res.redirect(303, '/');
});*/

router.post('/importar', (req, res) => {
  if(!(req.body.vueltas && req.body.series && req.body.ejercicios && req.body.pasosVuelta)) {
    res.status(400).send({
      error: {
        tipo: 'formato_invalido'
      }
    });
  } else {  
    db('entrenamientos')
    .insert({
      fecha: new Date().toJSON(),     
      vueltas: req.body.vueltas,
      series: req.body.series,
      lista_ejercicios: req.body.ejercicios      
    })
    .returning(["id", "fecha", "vuelta", "series", "ejercicios"])
    .then(data => {
        res.status(201).send({ 
        id: data[0],
        fecha: new Date().toJSON(),     
        vueltas: req.body.vueltas,
        series: req.body.series,
        ejercicios: req.body.ejercicios,
        pasosVuelta: req.body.pasosVuelta
      });        
    }); 
  } 
});

router.post('/:id/exportar', (req, res, next) => {
  db('entrenamientos')
  .select()
  .from('entrenamientos').where('id', req.params.id)
  .then(entrenamiento => {    
    if(entrenamiento.length === 0) {
      console.log('el entrenamiento no existe')
      res.status(404).send({
        error: {
          tipo: 'entrenamiento_no_existe'
        }
      });
    } else {
      fs.writeFileSync(`./${req.params.id}.fit`, `${req.body.routineString}`);
      res.status(201).send('Created');
    }
  });
});

router.get('/:id', (req, res, next) => {
  db.select()
  .from('entrenamientos').where('entrenamientos.id', req.params.id)
  .then( entrenamientos => {
    if(entrenamientos.length === 0) {
      res.status(404).send({
        error: {
          tipo: 'entrenamiento_no_existe'
        }
      });
    } else {
      res.status(200).send({ 
        id: entrenamientos[0].id,
        fecha: entrenamientos[0].fecha,
        vueltas: entrenamientos[0].vueltas,
        series: entrenamientos[0].series,
        ejercicios: entrenamientos[0].lista_ejercicios
      });
    }
  });   
});

// GET adicional al trabajo, para poder descargar archivo desde el browser pegando a la ruta del backend.
router.get('/:id/exportar', (req, res, next) => { 
  const fileToDownload = path.resolve(__dirname, `../../${req.params.id}.fit`);
  const fileName = `${req.params.id}.fit`  
  res.download(fileToDownload, fileName, err => {
    if (err) {      
      res.status(404).send({
        error: {
          tipo: 'archivo_no_encontrado'
        }
      });
    }    
  });
});

// Para actualizar la duración total del entrenamiento
router.put('/:id', (req, res) => {  
  if(!(req.body.duracion && Object.keys(req.body).length === 1)) {
    res.status(400).send({
      error: {
        tipo: 'atributo_no_permitido'
      }
    })
  } else {
    db.select()
    .from('entrenamientos').where('entrenamientos.id', req.params.id)
    .then( entrenamientos => {
      if(entrenamientos.length === 0) {
        res.status(404).send({
          error: {
            tipo: 'entrenamiento_no_existe'
          }
        });
      } else {
        db('entrenamientos')
        .where('id', req.params.id)
        .update({ duracion: req.body.duracion })
        .then(entrenamiento => {          
          res.status(200).send({
            id: req.params.id, 
            duracion: req.body.duracion
          });      
        })  
      }
    });
  }  
});

router.get('/:id/ejercicios', (req, res, next) => {
  db.select()
  .from('entrenamientos').where('entrenamientos.id', req.params.id)
  .then(entrenamientos => {
    if(entrenamientos.length === 0) {
      res.status(404).send({
        error: {
          tipo: 'entrenamiento_no_existe'
        }
      });
    } else {
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
        res.status(200).send({ 
          id: entrenamientos[0].id,
          ejercicios: exercises
        });      
      });    
    }
  });
});

module.exports = router;
