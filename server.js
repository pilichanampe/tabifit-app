const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Set static folder
//app.use(express.static('app/public/'));
app.use(express.static(path.join(__dirname, 'app')));

let ejercicios = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views/index.html'));
  console.log(__dirname);
});

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
});

app.listen(app.get('port'), () => {
  console.log('Listening on holiss server', app.get('port'));
})