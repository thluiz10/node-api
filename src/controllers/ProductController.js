const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const notFound = 'Not Found';

const badRequest = 'Bad Request';

module.exports = {
  async index(req, res) {
    Product.find(function(err, result) {
      if(err) {
        return res.status(404).send('Not Found');
      }
      else {
        return res.json(result);
      }
    });
  },
  async show(req, res) {
    Product.findById(req.params.id, function(err, result) {
      if(err) {
        return res.status(404).send(notFound);
      }
      else {
        return res.json(result);
      }
    });
  },
  async store(req, res) {
    Product.create(req.body, function(err, result){
      if(err) {
        return res.status(400).send(badRequest);
      }
      else {
        return res.json(result);
      }
    });
  },
  async update(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if(err) {
        return res.status(400).send(badRequest);
      }
      else {
        return res.json(result);
      }
    })
  },
  async destroy(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, results) {
      if(err) {
        return res.status(400).send(badRequest);
      }
      else {
        return res.send();
      }
    });
  }
}

