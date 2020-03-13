const request = require('supertest');
const server = require('../../server');
const chai = require('chai');
const should = chai.should();

chai.use(require('chai-json-schema'));

describe('Products', () => {
  let testSchema = {
    required: ['_id', 'title', 'description', 'url', 'createdAt'],
    properties: {
      _id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },      
      url: {
        type: 'string'
      },
      createdAt: {
        type: 'string'
      }
    }
  };

  describe('GET /products', () => {
    it('respond with json of all registers', (done) => {
      request(server)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.all.be.jsonSchema(testSchema);
          done();
        });
    });
    
    it('respond with json of a single user', (done) => {
      request(server)
        .get('/api/products/5e6a90ce08e3600d98437b9f')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.all.be.jsonSchema(testSchema);
          done();
        });
    });
    
    it('respond with error', (done) => {
      request(server)
        .get('/api/products/1')
        .set('Accept', 'application/json')
        .expect('Not Found')
        .expect(404, done);
    });
  });
  
  describe('POST /products', () => {
    it('sucessfully add new item', (done) => {
      let item = {
        'title': 'post_test',
        'description': 'post',
        'url': 'http://google.com'
      }
      request(server)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(item)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          res.body.should.all.be.jsonSchema(testSchema);
          done();
        });
    });
    
    it('empty json', (done) => {
      let item = {}
      request(server)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(item)
        .expect(400, done);
    });
    
    it('missing title', (done) => {
      let item = {
        'description': 'post',
        'url': 'http://google.com'
      }
      request(server)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(item)
        .expect(400, done);
    });
    
    it('missing description', (done) => {
      let item = {
        'title': 'post_test',
        'url': 'http://google.com'
      }
      request(server)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(item)
        .expect(400, done);
    });
    
    it('missing url', (done) => {
      let item = {
        'title': 'post_test',
        'description': 'post'
      }
      request(server)
        .post('/api/products')
        .set('Accept', 'application/json')
        .send(item)
        .expect(400, done);
    });
  });

  describe('UPDATE /products', () => {
    it('sucessfully update', (done) => {
      let item = {
        'title': 'UPDATE_TEST',
        'description': 'UPDATING'
      }
      request(server)
        .put('/api/products/5e6a90ce08e3600d98437b9f')
        .set('Accept', 'application/json')
        .send(item)
        .expect(200, done);
    });

    it('updating wrong id', (done) => {
      request(server)
        .put('/api/products/123')
        .set('Accept', 'application/json')
        .expect(400, done);
    });
  });

  describe('DELETE /products', () => {
    it('sucessfully delete', (done) => {
      request(server)
        .delete('/api/products/5e6a90ce08e3600d98437b9f')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('deleting wrong id', (done) => {
      request(server)
        .delete('/api/products/123')
        .expect(400, done);
    });
  });
});
