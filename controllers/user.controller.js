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

        const checkemail = await User.findOne({ email: email });
        if(checkemail){
            return res.status(409).json({message: 'registered account'});
        }
        
        const uniqueId = user._id.toString();
        const qrCodeBase64 = await QRCode.toDataURL(uniqueId);

        user.qrCodeBase64 = qrCodeBase64;

        await user.save();
        return res.status(201).json({ success: true, user });
    } catch (error) {
        console.error('Error creating user:', error); 
        return res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
};  

exports.loginUser = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;
        const user = await User.findOne({ email: email });
        console.log(email, phoneNumber);

        if (!user) {
            return res.status(400).json({ message: 'Not match Email' });
        }
        
        if (user.phoneNumber !== phoneNumber) {
            return res.status(401).json({ message: 'Not match Phone' });
        } 

        // Chỉ gửi phản hồi một lần khi tất cả điều kiện đều đúng
        return res.status(201).json({ success: true, user });
    } catch (error) { 
        // Xử lý lỗi và gửi phản hồi một lần
        return res.status(500).json({ message: error.message });
    }
};

exports.detailUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.editDetailUser = async (req, res) => {
    const { id } = req.params;
    const { results } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Chỉ cập nhật các trường results nếu chúng tồn tại trong req.body
        if (results) {
            if (results.area1 !== undefined) user.results.area1 = results.area1;
            if (results.area2 !== undefined) user.results.area2 = results.area2;
            if (results.area3 !== undefined) user.results.area3 = results.area3;
            if (results.area4 !== undefined) user.results.area4 = results.area4;
            if (results.area5 !== undefined) user.results.area5 = results.area5;
        }

        await user.save();

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
    }
};




