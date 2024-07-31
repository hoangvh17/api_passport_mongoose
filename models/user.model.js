const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    fullname: String,
    birthdate: String,
    email: String,
    phoneNumber: String,
    address: String,
    nationality: String,
    profilePic: String,
    results: {
        area1: String,
        area2: String,
        area3: String,
        area4: String,
        area5: String
    },
    qrCodeBase64: String
});  

module.exports = mongoose.model('User', userSchema);