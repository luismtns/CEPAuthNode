var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var rotas = require('./app/routes/rotas');

var app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

app.use('/node/', rotas);


// || 3000
app.listen(process.env.PORT || 3000);