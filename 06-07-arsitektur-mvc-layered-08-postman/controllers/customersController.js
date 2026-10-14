const customerModel = require('../models/customersModel');

// 1. Pastikan nama fungsi persis: getAllCustomers
exports.getAllCustomers = (req, res) => {
  const data = customerModel.getAll();
  res.json({ message: "Daftar Pelanggan MettaCareHub", total: data.length, data });
};

// 2. Pastikan nama fungsi persis: getCustomerById (Sering typo di sini)
exports.getCustomerById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = customerModel.getById(id);
    if (!data) {
      const err = new Error("Pelanggan tidak ditemukan");
      err.status = 404;
      throw err;
    }
    res.json({ message: "Detail pelanggan ditemukan", data });
  } catch (err) {
    next(err);
  }
};

// 3. Pastikan nama fungsi persis: createCustomer
exports.createCustomer = (req, res) => {
  const baru = customerModel.create(req.body);
  res.status(201).json({ message: "Pelanggan baru berhasil ditambahkan", data: baru });
};

// 4. Pastikan nama fungsi persis: updateCustomer
exports.updateCustomer = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = customerModel.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
  }
  res.json({ message: "Data pelanggan berhasil diperbarui", data: updated });
};

// 5. Pastikan nama fungsi persis: deleteCustomer
exports.deleteCustomer = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = customerModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
  }
  res.json({ message: "Data pelanggan berhasil dihapus", data: deleted });
};