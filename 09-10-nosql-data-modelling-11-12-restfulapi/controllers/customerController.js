const Customer = require('../models/customerModel');
const { buildSort, buildProjection, buildPagination } = require('../utils/queryOptions');

// 1. GET ALL
exports.getAllCustomers = async (req, res) => {
  const filter = {};

  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }

  if (req.query.phone) {
    filter.phone = { $regex: req.query.phone, $options: 'i' };
  }

  const sort = buildSort(req.query.sort, ['name', 'phone', 'vehicleNumber', 'createdAt', 'updatedAt'], 'name', req.query.order);
  const projection = buildProjection(req.query.fields, ['_id', 'name', 'phone', 'vehicleNumber', 'createdAt', 'updatedAt']);
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit);
  const data = await Customer.find(filter).sort(sort).skip(skip).limit(limit).select(projection);
  const total = await Customer.countDocuments(filter);
  res.status(200).json({
    message: "Daftar pelanggan",
    total,
    page,
    limit,
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
