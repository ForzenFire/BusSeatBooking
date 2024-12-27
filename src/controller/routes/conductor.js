const express = require('express');
const { createConductor, getConductors, getConductorById, updateConductor, deleteConductor, } = require('../api/conductorController');

const router = express.Router();

router.post('/', createConductor);
router.get('/',getConductors);
router.get('/:id', getConductorById);
router.get('/:id', updateConductor);
router.get('/:id', deleteConductor);

module.exports = router;