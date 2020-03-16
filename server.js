const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const app = express();
app.use(express.json()); //allow me to send json to the application
app.use(cors()); //enable access for any doms

mongoose.connect(
  'mongodb://mongo:27017/nodeapi', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
).then ( () => console.log("mongo connected"))
.catch(err => console.log(err))

requireDir('./src/models')

app.use('/api', require('./src/routes'))

app.listen(3000);

module.exports = app;
