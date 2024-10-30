const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


module.exports = app;