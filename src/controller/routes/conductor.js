const express = require('express');
const { createConductor, getConductors, getConductorById, updateConductor, deleteConductor, } = require('../api/conductorController');

const router = express.Router();

router.post('/', createConductor);
router.get('/',getConductors);
router.get('/:conductorId', getConductorById);
router.get('/:conductorId', updateConductor);
router.get('/:conductorId', deleteConductor);

module.exports = router;