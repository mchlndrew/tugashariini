const mechanicModel = require('../models/mechanicModel');

exports.getAllMechanics = (req, res) => {
  const data = mechanicModel.getAll();
  res.json({ message: "Daftar Mekanik MettaCareHub", total: data.length, data });
};

exports.getMechanicById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = mechanicModel.getById(id);
    if (!data) {
      const err = new Error("Mekanik tidak ditemukan");
      err.status = 404;
      throw err;
    }
    res.json({ message: "Detail mekanik ditemukan", data });
  } catch (err) {
    next(err);
  }
};

exports.createMechanic = (req, res) => {
  const baru = mechanicModel.create(req.body);
  res.status(201).json({ message: "Mekanik berhasil ditambahkan", data: baru });
};

exports.updateMechanic = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = mechanicModel.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Mekanik tidak ditemukan" });
  }
  res.json({ message: "Data mekanik berhasil diperbarui", data: updated });
};

exports.deleteMechanic = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = mechanicModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Mekanik tidak ditemukan" });
  }
  res.json({ message: "Data mekanik berhasil dihapus", data: deleted });
};