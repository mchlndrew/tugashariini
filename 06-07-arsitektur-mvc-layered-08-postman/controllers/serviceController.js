const serviceModel = require('../models/serviceModel');

exports.getAllServices = (req, res) => {
    const data = serviceModel.getAll();
    res.json({ message: "Daftar Layanan MettaCareHub", total: data.length, data });
};

exports.getServiceById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = serviceModel.getById(id);
        if (!data) {
            const err = new Error("Layanan tidak ditemukan");
            err.status = 404;
            throw err;
        }
        res.json({ message: "Detail layanan ditemukan", data });
    } catch (err) {
        next(err);
    }
};

exports.createService = (req, res) => {
    const newService = serviceModel.create(req.body);
    res.status(201).json({ message: "Layanan baru berhasil ditambahkan", data: newService });
};

exports.updateService = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = serviceModel.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.json({ message: "Data layanan berhasil diperbarui", data: updated });
};

exports.deleteService = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = serviceModel.remove(id);
    if (!deleted) {
        return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.json({ message: "Layanan berhasil dihapus", data: deleted });
};