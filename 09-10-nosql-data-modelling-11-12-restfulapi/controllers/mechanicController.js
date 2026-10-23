const Mechanic = require('../models/mechanicModel');

exports.getAllMechanics = async (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const data = await Mechanic.find(filter).select('-__v');
  res.status(200).json({ message: "Daftar Mekanik", total: data.length, data });
};

exports.getMechanicById = async (req, res) => {
  const data = await Mechanic.findById(req.params.id).select('-__v');
  if (!data) throw { status: 404, message: 'Mekanik tidak ditemukan' };
  res.json({ message: "Detail mekanik", data });
};

exports.createMechanic = async (req, res) => {
  const newMechanic = await Mechanic.create(req.body);
  res.status(201).json({ message: "Mekanik berhasil ditambahkan", data: newMechanic });
};

exports.updateMechanic = async (req, res) => {
  const updated = await Mechanic.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw { status: 404, message: 'Mekanik tidak ditemukan' };
  res.json({ message: "Mekanik berhasil diperbarui", data: updated });
};

exports.deleteMechanic = async (req, res) => {
  const deleted = await Mechanic.findByIdAndDelete(req.params.id);
  if (!deleted) throw { status: 404, message: 'Mekanik tidak ditemukan' };
  res.json({ message: "Mekanik berhasil dihapus", data: deleted });
};