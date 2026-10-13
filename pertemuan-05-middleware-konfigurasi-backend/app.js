require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ?? 3000;

// 1. Custom Middleware Global (Logger)
function logger(req, res, next) {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next();
}
app.use(logger);

// 2. Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.set('json spaces', 2);

// 3. Custom Middleware khusus Route (Pemeriksaan API Key)
function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== 'rahasia123') {
    return res.status(401).json({ message: 'API key tidak valid' });
  }
  next();
}

// Data In-Memory Array AutoCare Hub
let bookings = [
  {
    id: 1,
    customerName: "Budi Santoso",
    vehicleNumber: "BG 8888 XX",
    serviceType: "Tune Up & Ganti Oli",
    bookingDate: "2026-10-01 10:00",
    status: "Pending"
  },
  {
    id: 2,
    customerName: "Siti Aminah",
    vehicleNumber: "BG 1234 YY",
    serviceType: "Detailing",
    bookingDate: "2026-10-02 14:00",
    status: "In Progress"
  },
  {
    id: 3,
    customerName: "Ahmad Rizky",
    vehicleNumber: "BG 5555 ZZ",
    serviceType: "Ganti Kampas Rem",
    bookingDate: "2026-10-03 09:00",
    status: "Completed"
  }
];

// -------------------------------------------------------------
// ROUTES / ENDPOINTS CRUD
// -------------------------------------------------------------

// READ ALL / FILTER QUERY
app.get("/bookings", (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
    return res.json({ message: `Data status '${status}'`, total: filtered.length, data: filtered });
  }
  res.json({ message: "Seluruh data reservasi", total: bookings.length, data: bookings });
});

// READ BY ID (Menggunakan try-catch & next(err))
app.get("/bookings/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = bookings.find((b) => b.id === id);
    if (!data) {
      const err = new Error("Data reservasi tidak ditemukan");
      err.status = 404; // Menyertakan kode status 404
      throw err;
    }
    res.json({ message: "Detail reservasi ditemukan", data });
  } catch (err) {
    next(err);
  }
});

// CREATE (POST) - Disisipkan middleware 'cekApiKey'
app.post("/bookings", cekApiKey, (req, res) => {
  const { customerName, vehicleNumber, serviceType, bookingDate, status } = req.body;
  const baru = {
    id: bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1,
    customerName,
    vehicleNumber,
    serviceType,
    bookingDate,
    status: status || "Pending"
  };
  bookings.push(baru);
  res.status(201).json({ message: "Reservasi berhasil dibuat", data: baru });
});

// UPDATE (PUT) - Disisipkan middleware 'cekApiKey'
app.put("/bookings/:id", cekApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });

  bookings[index] = { ...bookings[index], ...req.body };
  res.json({ message: "Data berhasil diperbarui", data: bookings[index] });
});

// DELETE - Disisipkan middleware 'cekApiKey'
app.delete("/bookings/:id", cekApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });

  const deleted = bookings.splice(index, 1);
  res.json({ message: "Data berhasil dihapus", data: deleted[0] });
});

// -------------------------------------------------------------
// CENTRALIZED ERROR HANDLING MIDDLEWARE
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Terjadi kesalahan pada server',
  });
});

app.listen(PORT, () => {
  console.log(`Server AutoCare Hub berjalan di http://localhost:${PORT}`);
});