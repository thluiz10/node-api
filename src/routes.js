const express = require ('express');

const routes = express.Router();

const ProductController = require ('./controllers/ProductController');

const products_route = '/products';

const products_id_route = '/products/:id';

routes.get(products_route, ProductController.index);
routes.get(products_id_route, ProductController.show);
routes.post(products_route, ProductController.store);
routes.put(products_id_route, ProductController.update);
routes.delete(products_id_route, ProductController.destroy);

module.exports = routes;

