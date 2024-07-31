const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();


router.get('/hot', productController.getHotProduct);
router.get('/categoryID/:categoryID', productController.getRelatedProducts);
router.get('', productController.getProducts);
router.get('/:id', productController.getProduct)


module.exports = router; 