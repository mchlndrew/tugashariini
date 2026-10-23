require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
})
  .then(() => console.log('✅ Berhasil terhubung ke MongoDB Atlas'))
  .catch((err) => console.error('❌ Gagal terhubung ke MongoDB Atlas:', err));

const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');

app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);
app.use('/services', serviceRoutes);
app.use('/mechanics', mechanicRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server MettaCareHub API berjalan di http://localhost:${PORT}`);
});
