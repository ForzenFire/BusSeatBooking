// File: src/controllers/api/driver.js
const express = require('express');
const {
    createDriver,
    getDrivers,
    getDriverByNic,
    updateDriver,
    deleteDriver,
} = require('./driverController');

const router = express.Router();

router.post('/', createDriver);            
router.get('/', getDrivers);              
router.get('/:nic', getDriverByNic);       
router.put('/:nic', updateDriver);         
router.delete('/:nic', deleteDriver);     

module.exports = router;
