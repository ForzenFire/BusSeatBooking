const express = require('express');
const { createBusSchedule, getBusSchedules, getBusSchedulesById, updateBusSchedule, deleteBusSchedule, } = require('../api/busScheduleController');

const router = express.Router();

router.post('/', createBusSchedule); 
router.get('/', getBusSchedules);  
router.get('/:id', getBusSchedulesById);
router.put('/:id', updateBusSchedule); 
router.delete('/:id', deleteBusSchedule); 

module.exports = router;