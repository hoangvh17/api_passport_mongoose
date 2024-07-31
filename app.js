const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const cors = require('cors');   

const app = express();

// Kết nối đến MongoDB
mongoose.connect(config.db)
    // .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Cấu hình chi tiết CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500'],
    optionsSuccessStatus: 200,
};  

// Middleware 
// app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));  // Tăng giới hạn kích thước payload
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


// Khởi động server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
