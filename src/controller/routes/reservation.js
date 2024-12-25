const express = require('express');
const { reserveSeats, confirmReservation } = require('../api/reservationController');

const router = express.Router();

router.post('./reserve', reserveSeats);
router.post('./confirm', confirmReservation);

module.exports = router;