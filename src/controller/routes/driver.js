// File: src/controllers/api/driver.js
const express = require('express');
const { createDriver, getDrivers, getDriverById, updateDriver } = require('../api/driverController');

const router = express.Router();

router.post('/', createDriver);            
router.get('/', getDrivers);              
router.get('/:id', getDriverById);       
router.put('/:id', updateDriver);         
// router.delete('/:nic', deleteDriver);     

module.exports = router;
