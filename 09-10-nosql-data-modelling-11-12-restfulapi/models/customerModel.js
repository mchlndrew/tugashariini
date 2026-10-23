const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama pelanggan wajib diisi']
  },
  phone: {
    type: String,
    required: [true, 'Nomor HP wajib diisi'],
    unique: true
  },
  vehicleNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
