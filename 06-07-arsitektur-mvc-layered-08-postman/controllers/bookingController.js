const bookingModel = require('../models/bookingModel');
const customerModel = require('../models/customersModel');
const serviceModel = require('../models/serviceModel');

// 1. Ambil semua data booking terintegrasi
exports.getAllBookings = (req, res) => {
  const allBookings = bookingModel.getAll();

  const detailedBookings = allBookings.map(b => {
    // Cari data customer dan service berdasarkan ID
    const customerObj = customerModel.getById ? customerModel.getById(b.customerId) : null;
    const serviceObj = serviceModel.getById ? serviceModel.getById(b.serviceId) : null;

    return {
      id: b.id,
      // Ambil properti 'name'-nya saja
      customerName: customerObj ? customerObj.name : "Tidak diketahui",
      serviceType: serviceObj ? serviceObj.name : "Tidak diketahui",
      vehicleNumber: b.vehicleNumber,
      bookingDate: b.bookingDate,
      status: b.status
    };
  });

  res.json({ message: "Data booking terintegrasi", data: detailedBookings });
};

// 2. Ambil booking berdasarkan ID
exports.getBookingById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const booking = bookingModel.getById(id);
    if (!booking) {
      const err = new Error("Data reservasi tidak ditemukan");
      err.status = 404;
      throw err;
    }

    // Cari data customer dan service berdasarkan ID
    const customerObj = customerModel.getById(booking.customerId);
    const serviceObj = serviceModel.getById(booking.serviceId);

    // Gabungkan detail menjadi string nama
    const detailedBooking = {
      id: booking.id,
      customerName: customerObj ? customerObj.name : "Tidak diketahui",
      serviceType: serviceObj ? serviceObj.name : "Tidak diketahui",
      vehicleNumber: booking.vehicleNumber,
      bookingDate: booking.bookingDate,
      status: booking.status
    };

    res.json({ message: "Detail reservasi ditemukan", data: detailedBooking });
  } catch (err) {
    next(err);
  }
};

// 3. Tambah booking baru (Auto-Register Customer)
exports.createBooking = (req, res) => {
  const { customerName, phone, serviceId, vehicleNumber, bookingDate } = req.body;

  // Cek validasi Service
  const service = serviceModel.getById(parseInt(serviceId));
  if (!service) {
    return res.status(400).json({ message: "Layanan service tidak ditemukan" });
  }

  // Cek atau buat Customer baru
  let customer = customerModel.findByPhone ? customerModel.findByPhone(phone) : null;
  if (!customer && customerModel.create) {
    customer = customerModel.create({ name: customerName, phone, vehicleNumber });
  }

  // Simpan Booking
  const newBooking = bookingModel.create({
    customerId: customer ? customer.id : null,
    serviceId: service.id,
    vehicleNumber,
    bookingDate
  });

  res.status(201).json({
    message: "Booking berhasil dibuat",
    data: {
      bookingId: newBooking.id,
      customerName: customer ? customer.name : customerName,
      serviceName: service.name,
      vehicleNumber: newBooking.vehicleNumber,
      bookingDate: newBooking.bookingDate,
      status: newBooking.status
    }
  });
};

// 4. Update Booking
exports.updateBooking = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = bookingModel.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }
  res.json({ message: "Data reservasi berhasil diperbarui", data: updated });
};

// 5. Patch Booking
exports.patchBooking = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = bookingModel.patch(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }
  res.json({ message: "Data reservasi berhasil diperbarui (patch)", data: updated });
};

// 6. Delete Booking
exports.deleteBooking = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = bookingModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Data reservasi tidak ditemukan" });
  }
  res.json({ message: "Data reservasi berhasil dihapus", data: deleted });
};