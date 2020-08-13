const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

let ejercicios = [];

app.post('/sesion', (req, res, next) => {
  res.send('Aquí irá el objeto con la propiedad sesion y el string de JWT');
});
app.get('/ejercicios', (req, res, next) => {
  if(ejercicios.length === 0) {
    //res.status(204).send('HTTP 204 No Content');    
  } else {
    res.status(200).send({ ejercicios });
  } 
  
});

app.post('/entrenamientos', (req, res, next) => {
  res.send('Aquí irá la configuración del entrenamientos');
})

app.listen(3000, () => {
  console.log('Listening on port 3000!');
})