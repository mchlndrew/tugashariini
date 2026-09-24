const express = require('express');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.set('json spaces', 2); // Merapikan format tampilan JSON

// Data In-Memory Array (3 Data awal)
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
    bookingDate: "2026-10-02 9:30",
    status: "Completed"
  },
  {
    id: 3,
    customerName: "Ahmad Rizky",
    vehicleNumber: "BG 5555 ZZ",
    serviceType: "Ganti Kampas Rem",
    bookingDate: "2026-10-03 09:00",
    status: "Completed"
  },
  {
    id: 4,
    customerName: "Jakues",
    vehicleNumber: "BG 5555 ZZ",
    serviceType: "Ganti Kaki kaki",
    bookingDate: "2026-10-03 11:00",
    status: "Pending"

  }, {
    id: 5,
    customerName: "Derren",
    vehicleNumber: "K 1 OPG",
    serviceType: "Servis AS Roda Dan Detailing",
    bookingDate: "2026-10-03 13:00",
    status: "Pending"

  }
];

// 1. READ ALL BOOKINGS (Bisa filter via query: /api/bookings?status=Pending)
app.get('/api/bookings', (req, res) => {
  const { status } = req.query;

  if (status) {
    const filteredBookings = bookings.filter(
      b => b.status.toLowerCase() === status.toLowerCase()
    );
    return res.status(200).json({
      message: `Berhasil mengambil data dengan status '${status}'`,
      total: filteredBookings.length,
      data: filteredBookings
    });
  }

  res.status(200).json({
    message: "Berhasil mengambil seluruh data reservasi",
    total: bookings.length,
    data: bookings
  });
});

// 2. READ BY STATUS ENDPOINT (misal: /api/bookings/status/Pending)
app.get('/api/bookings/status/:status', (req, res) => {
  const targetStatus = req.params.status.toLowerCase();
  const filtered = bookings.filter(b => b.status.toLowerCase() === targetStatus);

  res.status(200).json({
    message: `Data reservasi dengan status '${req.params.status}'`,
    total: filtered.length,
    data: filtered
  });
});

// 3. READ BY ID (Detail Reservasi)
app.get('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }

  res.status(200).json({
    message: "Berhasil mengambil detail reservasi",
    data: booking
  });
});

// 4. CREATE (Tambah Reservasi Baru)
app.post('/api/bookings', (req, res) => {
  const { customerName, vehicleNumber, serviceType, bookingDate, status } = req.body;

  if (!customerName || !vehicleNumber || !serviceType || !bookingDate) {
    return res.status(400).json({ message: "Field customerName, vehicleNumber, serviceType, dan bookingDate wajib diisi!" });
  }

  const newBooking = {
    id: bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1,
    customerName,
    vehicleNumber,
    serviceType,
    bookingDate,
    status: status || "Pending"
  };

  bookings.push(newBooking);
  res.status(201).json({
    message: "Reservasi berhasil dibuat",
    data: newBooking
  });
});

// 5. UPDATE (Ubah Data / Status Reservasi)
app.put('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === bookingId);

  if (index === -1) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }

  const { customerName, vehicleNumber, serviceType, bookingDate, status } = req.body;

  bookings[index] = {
    ...bookings[index],
    customerName: customerName || bookings[index].customerName,
    vehicleNumber: vehicleNumber || bookings[index].vehicleNumber,
    serviceType: serviceType || bookings[index].serviceType,
    bookingDate: bookingDate || bookings[index].bookingDate,
    status: status || bookings[index].status
  };

  res.status(200).json({
    message: "Data reservasi berhasil diperbarui",
    data: bookings[index]
  });
});

// 6. DELETE (Hapus Reservasi)
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === bookingId);

  if (index === -1) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }

  const deletedBooking = bookings.splice(index, 1);
  res.status(200).json({
    message: "Data reservasi berhasil dihapus",
    data: deletedBooking[0]
  });
});

// Listener Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server AutoCare Hub berjalan di http://localhost:${PORT}`);
});