const express = require('express');
const { createBus, getBuses, updateBus, getBusById,} = require('../api/busController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createBus);
router.get('/', authenticate, getBuses);
router.get('/:id',authenticate, authorize('admin', 'operator'), getBusById);
router.get('/:id', authenticate, authorize('admin'), updateBus);

module.exports = router;