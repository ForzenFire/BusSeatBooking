const express = require('express');
const { createConductor, getConductors, getConductorById, updateConductor, deleteConductor, } = require('../api/conductorController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createConductor);
router.get('/', authenticate, getConductors);
router.get('/:id', authenticate, getConductorById);
router.get('/:id', authenticate, authorize('admin'), updateConductor);
router.get('/:id', authenticate, authorize('admin'), deleteConductor);

module.exports = router;