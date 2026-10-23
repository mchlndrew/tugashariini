const Booking = require('../models/bookingModel');
const { buildSort, buildProjection, buildPagination } = require('../utils/queryOptions');


exports.getAllBookings = async (req, res) => {
    const filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
    }

    if (req.query.customerId) {
        filter.customerId = Number(req.query.customerId);
    }

    if (req.query.serviceId) {
        filter.serviceId = Number(req.query.serviceId);
    }

    if (req.query.vehicleNumber) {
        filter.vehicleNumber = { $regex: req.query.vehicleNumber, $options: 'i' };
    }

    const { page, limit, skip } = buildPagination(req.query.page, req.query.limit);

    const sort = buildSort(req.query.sort, [
        'customerId', 'serviceId', 'vehicleNumber', 'bookingDate', 'status', 'createdAt', 'updatedAt'
    ], 'createdAt', req.query.order);
    const projection = buildProjection(req.query.fields, [
        '_id', 'customerId', 'serviceId', 'vehicleNumber', 'bookingDate', 'status', 'createdAt', 'updatedAt'
    ]);

    const data = await Booking.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(projection);

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
