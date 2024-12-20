const express = require('express');
const { createBusSchedule, getBusSchedules, getBusSchedulesById, updateBusSchedule, deleteBusSchedule, } = require('./busScheduleController');

const router = express.Router();

router.post('/', createBusSchedule); 
router.get('/', getBusSchedules);  
router.get('/:scheduleId', getBusSchedulesById);
router.put('/:scheduleId', updateBusSchedule); 
router.delete('/:scheduleId', deleteBusSchedule); 

module.exports = router;