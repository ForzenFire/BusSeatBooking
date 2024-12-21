const express = require('express');
const { createBus, getBuses, updateBus,} = require('../api/busController');

const router = express.Router();

router.post('/', createBus);
router.get('/', getBuses);
router.get('/:busNumber', updateBus);

module.exports = router;