const express = require('express');
const mongoose = require ('mongoose');
const requireDir = require('require-dir');

const app = express();

mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true})
requireDir('./src/models')

// const Product = mongoose.model('Product');

// req contains all possible details of the request and res is response to the request
app.get('/', (req,res) => {
  // Product.create({ 
  //   title: "React native", 
  //   description: "Build native apps with React",
  //   url:"http://github.com/facebook/react-native"
  // })
  return res.send("Hello World")
});

app.listen(3001);