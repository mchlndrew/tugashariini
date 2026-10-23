const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true
  },
  serviceId: {
    type: Number,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
