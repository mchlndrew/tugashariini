const Service = require('../models/serviceModel');

exports.getAllServices = async (req, res) => {
  const filter = {};
  if (req.query.price) {
    filter.price = req.query.price;
  }

  const data = await Service.find(filter).select('-__v');
  res.status(200).json({ message: "Daftar Layanan", total: data.length, data });
};

exports.getServiceById = async (req, res) => {
  const data = await Service.findById(req.params.id).select('-__v');
  if (!data) throw { status: 404, message: 'Layanan tidak ditemukan' };
  res.json({ message: "Detail layanan", data });
};

exports.createService = async (req, res) => {
  const newService = await Service.create(req.body);
  res.status(201).json({ message: "Layanan berhasil ditambahkan", data: newService });
};

exports.updateService = async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw { status: 404, message: 'Layanan tidak ditemukan' };
  res.json({ message: "Layanan berhasil diperbarui", data: updated });
};

exports.deleteService = async (req, res) => {
  const deleted = await Service.findByIdAndDelete(req.params.id);
  if (!deleted) throw { status: 404, message: 'Layanan tidak ditemukan' };
  res.json({ message: "Layanan berhasil dihapus", data: deleted });
};