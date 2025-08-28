const express = require('express');
const { json } = require('express');
const morgan = require('morgan');


const CandidateController = require('./src/api/candidates/candidate-controller.js');


var app = express();

app.disable('etag');

app.use(morgan('dev')); // dev print calls
app.use(json()); // JSON format files

const cors = require('cors');
app.use(cors());

app.use('/api/candidates', CandidateController.CandidateController.router);

module.exports = app;  
