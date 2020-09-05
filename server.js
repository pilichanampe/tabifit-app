const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');

const exercisesController = require(path.join(__dirname, './app/controllers/ejercicios'));
const trainingsController = require(path.join(__dirname, './app/controllers/entrenamientos'));

// Settings
app.set('port', process.env.PORT || 3000);



// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/ejercicios', exercisesController);
app.use('/entrenamientos', trainingsController);

// Set static folder
//app.use(express.static('app/public/'));
app.use(express.static(path.join(__dirname, 'app')));

let ejercicios = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views/index.html'));
  console.log(__dirname);
});

app.listen(app.get('port'), () => {
  console.log('Listening on holiss server', app.get('port'));
})