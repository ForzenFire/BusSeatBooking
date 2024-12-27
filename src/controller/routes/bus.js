const express = require('express');
const { createBus, getBuses, updateBus, getBusById,} = require('../api/busController');

const router = express.Router();

router.post('/', createBus);
router.get('/', getBuses);
router.get('/:id', getBusById);
router.get('/:id', updateBus);

module.exports = router;