require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Customer = require('../models/customerModel');
const Mechanic = require('../models/mechanicModel');
const Service = require('../models/serviceModel');

const bookings = [
  { customerId: 1, serviceId: 1, vehicleNumber: 'Z 11 PLI', bookingDate: '2026-10-01 10:00', status: 'Pending' },
  { customerId: 2, serviceId: 2, vehicleNumber: 'BG 44 HAU', bookingDate: '2026-10-02 09:30', status: 'Completed' },
  { customerId: 3, serviceId: 3, vehicleNumber: 'T 4 NTK', bookingDate: '2026-10-03 09:00', status: 'Completed' },
  { customerId: 4, serviceId: 4, vehicleNumber: 'J 4 KUS', bookingDate: '2026-10-03 11:00', status: 'Pending' },
  { customerId: 5, serviceId: 5, vehicleNumber: 'K 1 OPG', bookingDate: '2026-10-03 13:00', status: 'Pending' }
];

const customers = [
  { name: 'Jiching', phone: '08123456789', vehicleNumber: 'Z 11 PLI' },
  { name: 'Ahau', phone: '08987654321', vehicleNumber: 'BG 44 HAU' },
  { name: 'Tantok', phone: '08112233445', vehicleNumber: 'T 4 NTK' },
  { name: 'Jakues', phone: '08526677889', vehicleNumber: 'J 4 KUS' },
  { name: 'Derren', phone: '08139900112', vehicleNumber: 'K 1 OPG' }
];

const mechanics = [
  { name: 'Joko', specialty: 'Spesialis Mesin & Tune Up', status: 'Tersedia' },
  { name: 'Bambang', specialty: 'Kelistrikan & Detailing', status: 'Sibuk' },
  { name: 'Agus', specialty: 'Sistem Pengereman & Kaki-kaki', status: 'Tersedia' }
];

const services = [
  { name: 'Tune Up & Ganti Oli', price: 350000, duration: '60 menit' },
  { name: 'Detailing', price: 500000, duration: '120 menit' },
  { name: 'Ganti Kampas Rem', price: 200000, duration: '45 menit' },
  { name: 'Ganti Kaki kaki', price: 750000, duration: '180 menit' },
  { name: 'Servis AS Roda Dan Detailing', price: 850000, duration: '210 menit' }
];

async function upsertMany(Model, data, filterFields) {
  for (const item of data) {
    const filter = Object.fromEntries(filterFields.map((field) => [field, item[field]]));
    await Model.updateOne(filter, { $set: item }, { upsert: true });
  }
}

async function seedDatabase() {
  await upsertMany(Customer, customers, ['phone']);
  await upsertMany(Mechanic, mechanics, ['name']);
  await upsertMany(Service, services, ['name']);
  await upsertMany(Booking, bookings, ['customerId', 'serviceId', 'vehicleNumber', 'bookingDate']);
}

module.exports = { seedDatabase };

if (require.main === module) {
  const atlasHosts = [
    'ac-damjcga-shard-00-00.6zqolpf.mongodb.net',
    'ac-damjcga-shard-00-01.6zqolpf.mongodb.net',
    'ac-damjcga-shard-00-02.6zqolpf.mongodb.net'
  ].join(',');

  const mongoUri = process.env.MONGODB_URI.replace(
    /^mongodb\+srv:\/\/([^@]+)@[^/]+(\/.*)?$/,
    (_, credentials, databasePath = '/') =>
      `mongodb://${credentials}@${atlasHosts}${databasePath}${databasePath.includes('?') ? '&' : '?'}tls=true&authSource=admin&retryWrites=true&w=majority`
  );

  mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
    .then(seedDatabase)
    .then(() => console.log('[OK] Seeder berhasil dijalankan'))
    .catch((err) => {
      console.error('[ERROR] Seeder gagal dijalankan:', err.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}
