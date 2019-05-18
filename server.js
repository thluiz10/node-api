const express = require('express');
const mongoose = require ('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json()); //allow me to send json to the application

mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true, useFindAndModify: false})
requireDir('./src/models')

// const Product = mongoose.model('Product');

// req contains all possible details of the request and res is response to the request

// First route
app.use('/api', require('./src/routes'))

app.listen(3001);