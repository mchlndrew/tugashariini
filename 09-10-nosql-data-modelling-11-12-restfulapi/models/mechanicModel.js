const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama mekanik wajib diisi']
    },
    specialty: {
        type: String,
        default: 'Umum'
    },
    status: {
        type: String,
        enum: ['Tersedia', 'Sibuk', 'Cuti'],
        default: 'Tersedia'
    }
}, { timestamps: true });

module.exports = mongoose.model('Mechanic', mechanicSchema);