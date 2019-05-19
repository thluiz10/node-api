
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require(`../../server`);
let should = chai.should();
const expect = require('chai').expect
chai.use(chaiHttp);

// Nossa suite de teste relacionada a artigos
describe('Products', () => {

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
  });
  
  describe('/POST Product', () => {
    it('Create product', (done) => {
        let product = {
            title: "Test", 
            description: "Test post",
            url: "test.com"
        }
        chai.request(server)
        .post('/api/products')
        .send(product) // send file
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  }); 

  describe('Delete Product', () => { 
    it.only('should delete a SINGLE product on /product/<id> DELETE', function(done) {
      chai.request(server)
        .get('/api/products')
        .end(function(err, res){
          chai.request(server)
            .delete('/api/products/'+res.body.docs[0]._id)
            .set('Accept', 'application/json')
            .end(function(error, response){
              response.should.have.status(200);
              done();
          });
        });
    });
  });
  
});