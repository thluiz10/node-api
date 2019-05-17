const express = require('express');

const app = express();

// req contains all possible details of the request and res is response to the request
app.get('/', (req,res) => {
  res.send("Hello World")
});

app.listen(3001);