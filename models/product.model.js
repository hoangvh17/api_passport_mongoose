const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    description: String,
    categoryID: Number
});  

module.exports = mongoose.model('Product', productSchema);