const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

function cekApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'rahasia123') {
        return res.status(401).json({ message: 'API key tidak valid' });
    }
    next();
}

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', cekApiKey, bookingController.createBooking);
router.put('/:id', cekApiKey, bookingController.updateBooking);
router.patch('/:id', cekApiKey, bookingController.patchBooking);
router.delete('/:id', cekApiKey, bookingController.deleteBooking);

module.exports = router;