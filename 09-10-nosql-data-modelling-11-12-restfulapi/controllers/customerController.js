const Customer = require('../models/customerModel');

// 1. GET ALL
exports.getAllCustomers = async (req, res) => {
  const data = await Customer.find().select('-__v');
  res.status(200).json({
    message: "Daftar pelanggan",
    total: data.length,
    data
  });
};

// 2. GET BY ID
exports.getCustomerById = async (req, res) => {
  const data = await Customer.findById(req.params.id).select('-__v');
  if (!data) throw { status: 404, message: 'Data pelanggan tidak ditemukan' };
  res.json({ message: "Detail pelanggan", data });
};

// 3. CREATE
exports.createCustomer = async (req, res) => {
  const newCustomer = await Customer.create(req.body);
  res.status(201).json({ message: "Pelanggan berhasil ditambahkan", data: newCustomer });
};

// 4. UPDATE
exports.updateCustomer = async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedCustomer) throw { status: 404, message: 'Data pelanggan tidak ditemukan' };
  res.json({ message: "Pelanggan berhasil diperbarui", data: updatedCustomer });
};

// 5. DELETE
exports.deleteCustomer = async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
  if (!deletedCustomer) throw { status: 404, message: 'Data pelanggan tidak ditemukan' };
  res.json({ message: "Pelanggan berhasil dihapus", data: deletedCustomer });
};