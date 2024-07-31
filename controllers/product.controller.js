const Product = require('../models/product.model');

exports.getHotProduct = async(req, res) =>{
    try {
        const products = await Product.find({hot: 1});
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getProducts = async(req, res) =>{
    try {
        const products = await Product.find();
        res.json(products); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getProduct = async(req, res)=>{
    const {id}  = req.params;

    try {
        const product = await Product.findOne({id: parseInt(id)}); 
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getRelatedProducts = async(req, res)=>{
    const {categoryID} = req.params;
    try {
        const relatedProducts = await Product.find({categoryID: parseInt(categoryID)});
        res.json(relatedProducts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}