const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');   
require('dotenv').config(); 
const app = express();

const dbUri = process.env.MONGODB_URI
// const dbUri = process.env.MONGODB_URI  && 'mongodb://localhost:27017/passport';

const port = process.env.PORT || 3001 
const hostname = process.env.HOST_NAME || 'localhost';
const corsWeb = process.env.CORS_WEB
// console.log(process.env.CORS_WEB);  

console.log('CORS_WEB:', corsWeb);
require('dotenv').config(); 



// Kết nối đến MongoDB 
// mongoose.connect(dbUri )
//     .catch(err => console.error('Could not connect to MongoDB', err));


mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  

// Cấu hình chi tiết CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500', 'https://itehcmc2024.suntoursgroup.asia', corsWeb].filter(Boolean),
    optionsSuccessStatus: 200,
};   
// HELLO 

// Middleware 
// app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));  // Tăng giới hạn kích thước payload
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "connected and hello" });
  });

// Khởi động server
app.listen(port, hostname, () => {
    console.log(`Server is running on port ${port}`);
});
