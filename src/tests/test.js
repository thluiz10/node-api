
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require(`../../server`);
let should = chai.should();
chai.use(chaiHttp);

let productId;
// Nossa suite de teste relacionada a artigos
describe('Products', () => {

  describe('/POST Product', () => {
    it('Create product', (done) => {
      let product = {
          title: "Test mock", 
          description: "Test post",
          url: "test.com"
      }
      chai.request(server)
      .post('/api/products')
      .send(product) // send file
      .end((err, res) => {
        productId = res.body._id
        res.should.have.status(200);
        done();
      });
    });
  }); 
  // No describe podemos passar um texto para identificação 
  describe('/GET Products', () => {
    it('Testing GET from api', (done) => {
      chai.request(server) // Endereço do servidor
        .get('/api/products') // endpoint que vamos testar
        .end((err, res) => { // testes a serem realizados
          res.should.have.status(200); // verificando se o retorno e um status code 200
          res.body.should.be.a('Object'); // Verificando se o retorno e um array
          res.body.should.all.have.property('docs');
          res.body.should.all.have.property('total');
          res.body.should.all.have.property('page');
          res.body.should.all.have.property('pages');
          done();
        });
    });
    it ('Testing get one product', (done) => {
      chai.request(server)
        .get('/api/products/'+productId)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.all.have.property('_id');
          res.body.should.all.have.property('description');
          res.body.should.all.have.property('url');
          done();
        })
    })
  });

  describe('/PUT Product', () => {
    let product = {
      title: "Test edit 3", 
      description: "Test post",
      url: "test.com/edit"
    }
    it('Update product ', function (done) {
      chai.request(server)
        .put('/api/products/'+productId)
        .send(product)
        .end(function(err, res) {
          res.should.have.status(200);
          done()
        })
    })
  })

  describe('Delete Product', () => { 
    it('Delete single product', function(done) {
      chai.request(server)
        .delete('/api/products/'+productId)
        .set('Accept', 'application/json')
        .end(function(error, res){
          res.should.have.status(200);
          done();
        });
    });
  });

});