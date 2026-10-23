const Booking = require('../models/bookingModel');


exports.getAllBookings = async (req, res) => {
    const filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
    }

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) limit = 50;

    const sortField = req.query.sort || 'createdAt';

    const data = await Booking.find(filter)
        .sort({ [sortField]: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-__v');

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
        message: "Data berhasil diambil",
        total: total,
        page: page,
        limit: limit,
        data: data
    });
};


exports.getBookingById = async (req, res) => {
    const data = await Booking.findById(req.params.id).select('-__v');
    if (!data) throw { status: 404, message: 'Data booking tidak ditemukan' };
    res.json({ message: "Detail booking", data });
};


exports.createBooking = async (req, res) => {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({ message: "Booking berhasil dibuat", data: newBooking });
};

exports.updateBooking = async (req, res) => {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) throw { status: 404, message: 'Data booking tidak ditemukan' };
    res.json({ message: "Booking berhasil diperbarui", data: updatedBooking });
};


exports.deleteBooking = async (req, res) => {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) throw { status: 404, message: 'Data booking tidak ditemukan' };
    res.json({ message: "Booking berhasil dihapus", data: deletedBooking });
};