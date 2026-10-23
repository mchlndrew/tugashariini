const Service = require('../models/serviceModel');
const { buildSort, buildProjection, buildPagination } = require('../utils/queryOptions');

exports.getAllServices = async (req, res) => {
  const filter = {};
  if (req.query.price) {
    filter.price = Number(req.query.price);
  }

  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }

  if (req.query.duration) {
    filter.duration = { $regex: req.query.duration, $options: 'i' };
  }

  const sort = buildSort(req.query.sort, ['name', 'price', 'duration', 'createdAt', 'updatedAt'], 'name', req.query.order);
  const projection = buildProjection(req.query.fields, ['_id', 'name', 'price', 'duration', 'createdAt', 'updatedAt']);
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit);
  const data = await Service.find(filter).sort(sort).skip(skip).limit(limit).select(projection);
  const total = await Service.countDocuments(filter);
  res.status(200).json({ message: "Daftar Layanan", total, page, limit, data });
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
