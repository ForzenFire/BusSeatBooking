// File: src/controllers/api/driver.js
const express = require('express');
const { createDriver, getDrivers, getDriverById, updateDriver } = require('../api/driverController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createDriver);            
router.get('/', authenticate, getDrivers);              
router.get('/:id', authenticate, authorize('admin'), getDriverById);       
router.put('/:id', authenticate, authorize('admin'), updateDriver);         
// router.delete('/:nic', deleteDriver);     

module.exports = router;
