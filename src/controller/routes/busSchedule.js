const express = require('express');
const { createBusSchedule, getBusSchedules, getBusSchedulesById, updateBusSchedule, deleteBusSchedule, } = require('../api/busScheduleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createBusSchedule); 
router.get('/', authenticate, getBusSchedules);  
router.get('/:id', authenticate, authorize('admin', 'operator'), getBusSchedulesById);
router.put('/:id', authenticate, authorize('admin'), updateBusSchedule); 
router.delete('/:id', authenticate, authorize('admin'), deleteBusSchedule); 

module.exports = router;