const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama layanan wajib diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga layanan wajib diisi']
    },
    duration: {
        type: String, // Contoh: "60 menit"
        required: [true, 'Durasi layanan wajib diisi']
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
