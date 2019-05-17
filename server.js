const express = require('express');
const mongoose = require ('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true})
// req contains all possible details of the request and res is response to the request
app.get('/', (req,res) => {
  res.send("Hello World")
});

app.listen(3001);