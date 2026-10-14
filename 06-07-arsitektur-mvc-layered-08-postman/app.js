require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Import Routes (SESUAIKAN DENGAN NAMA FILE DENGAN AKHIRAN 's')
const bookingRoute = require('./routes/bookingRoutes');
const serviceRoute = require('./routes/serviceRoutes');
const mechanicRoute = require('./routes/mechanicRoutes');
const customerRoute = require('./routes/customerRoutes');

// 1. Global Middleware (Logger)
function logger(req, res, next) {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next();
}
app.use(logger);

// 2. Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use(express.json());
app.set('json spaces', 2);


app.use('/bookings', bookingRoute);
app.use('/services', serviceRoute);
app.use('/mechanics', mechanicRoute);
app.use('/customers', customerRoute);

// 4. Fallback 404 Route Handler
app.use((req, res, next) => {
  const err = new Error("Endpoint tidak ditemukan");
  err.status = 404;
  next(err);
});

// 5. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Terjadi kesalahan pada server'
  });
});

app.listen(PORT, () => {
  console.log(`Server MettaCareHub berjalan di http://localhost:${PORT}`);
});