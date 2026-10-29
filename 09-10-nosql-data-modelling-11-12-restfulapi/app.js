require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { seedDatabase } = require('./config/seeder');

const app = express();
app.set('json spaces', 2);
app.use(express.json());


const atlasHosts = [
  'ac-damjcga-shard-00-00.6zqolpf.mongodb.net',
  'ac-damjcga-shard-00-01.6zqolpf.mongodb.net',
  'ac-damjcga-shard-00-02.6zqolpf.mongodb.net'
].join(',');

const mongoUri = process.env.MONGODB_URI.replace(
  /^mongodb\+srv:\/\/([^@]+)@[^/]+(\/.*)?$/,
  (_, credentials, databasePath = '/') =>
    `mongodb://${credentials}@${atlasHosts}${databasePath}${databasePath.includes('?') ? '&' : '?'}tls=true&authSource=admin&retryWrites=true&w=majority`
);

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 10000
})
  .then(() => console.log('[OK] Berhasil terhubung ke MongoDB Atlas'))
  .catch((err) => console.error('[ERROR] Gagal terhubung ke MongoDB Atlas:', err));

mongoose.connection.once('connected', () => {
  seedDatabase()
    .then(() => console.log('Data booking, customer, mechanic, dan service berhasil disiapkan'))
    .catch((err) => console.error('Gagal menyiapkan data awal:', err));
});

const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');


app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);
app.use('/services', serviceRoutes);
app.use('/mechanics', mechanicRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] MettaCareHub API berjalan di http://localhost:${PORT}`);
});
