const express = require('express');
const { reserveSeats, confirmReservation } = require('../api/reservationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('./reserve', authenticate, reserveSeats);
router.post('./confirm', authenticate, confirmReservation);

module.exports = router;