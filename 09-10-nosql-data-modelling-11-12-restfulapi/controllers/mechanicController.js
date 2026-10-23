const Mechanic = require('../models/mechanicModel');
const { buildSort, buildProjection, buildPagination } = require('../utils/queryOptions');

exports.getAllMechanics = async (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }

  if (req.query.specialty) {
    filter.specialty = { $regex: req.query.specialty, $options: 'i' };
  }

  const sort = buildSort(req.query.sort, ['name', 'specialty', 'status', 'createdAt', 'updatedAt'], 'name', req.query.order);
  const projection = buildProjection(req.query.fields, ['_id', 'name', 'specialty', 'status', 'createdAt', 'updatedAt']);
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit);
  const data = await Mechanic.find(filter).sort(sort).skip(skip).limit(limit).select(projection);
  const total = await Mechanic.countDocuments(filter);
  res.status(200).json({ message: "Daftar Mekanik", total, page, limit, data });
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
