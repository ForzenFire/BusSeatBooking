const express = requrie('express');
const {
    createBusSchedule,
    getAllBusSchedules,
    getBusScheduleById,
    updateBusSchedule,
    deleteBusSchedule,
} = requrie('./busScheduleController');

const router = express.Router();

router.post('/', createBusSchedule); 
router.get('/', getAllBusSchedules);  
router.get('/:scheduleId', getBusScheduleById);
router.put('/:scheduleId', updateBusSchedule); 
router.delete('/:scheduleId', deleteBusSchedule); 

module.exports = router