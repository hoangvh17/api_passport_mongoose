// const mongoose = require('mongoose');
const QRCode = require('qrcode');
const User = require('../models/user.model'); 


exports.createUser = async (req, res) => {
    try {
        const {fullname, birthdate, email, phoneNumber, address, nationality, profilePic } = req.body;
        if ( !fullname || !birthdate || !email || !phoneNumber || !address || !nationality ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
 
        // Tạo người dùng mới với kết quả để trống
        const user = new User({
            ...req.body,
            results: { 
                area1: "",
                area2: "",
                area3: "",
                area4: "",
                area5: ""
            }
        });
        const uniqueId = user._id.toString();
        const qrCodeBase64 = await QRCode.toDataURL(uniqueId);

        user.qrCodeBase64 = qrCodeBase64;

        await user.save();
        res.status(201).json({ success: true, fullname });
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
};  

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error retrieving user:', error); // Thêm logging để theo dõi lỗi
        res.status(500).json({ success: false, message: 'Error retrieving user', error: error.message });
    }
};
