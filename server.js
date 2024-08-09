// const express = require('express');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // Kết nối MongoDB
// mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Tạo schema và model cho form data
// const formDataSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   // Các trường khác tùy theo form của bạn
// });

// const FormData = mongoose.model('FormData', formDataSchema);

// // Lark API credentials
// const LARK_APP_ID = 'your_app_id';
// const LARK_APP_SECRET = 'your_app_secret';

// // Hàm lấy access token
// const getAccessToken = async () => {
//   const response = await axios.post('https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal', {
//     app_id: LARK_APP_ID,
//     app_secret: LARK_APP_SECRET,
//   });

//   return response.data.app_access_token;
// };

// // Endpoint để nhận dữ liệu từ Lark form
// app.post('/api/fetch-form-data', async (req, res) => {
//   try {
//     const accessToken = await getAccessToken();
//     const response = await axios.get(`https://open.larksuite.com/open-apis/form/v1/forms/{form_id}/responses`, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });

//     const formData = response.data;
//     // Lưu dữ liệu vào MongoDB
//     const newFormData = new FormData(formData);
//     await newFormData.save();
    
//     res.status(201).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// app.post('/webhook', async (req, res) => {
//     const data = req.body;
  
//     // Xử lý dữ liệu từ webhook và lưu vào MongoDB
//     const newFormData = new FormData(data);
//     await newFormData.save();
    
//     res.status(200).json({ message: 'Webhook received and data saved' });
//   });
  

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
