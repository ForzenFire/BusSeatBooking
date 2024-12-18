const BusSchedule = require('../../model/BusSchedule');
const Route = require('../../model/Routes');
const Bus = require('../../model/Bus');

exports.createBusSchedule = async (req, res) => {
    try {
        const { scheduleId, routeId, busId, routeDate, startingTime, closingTime, status } = req.body;
        const route = await Route.findOne({ routeId });
        if (!route) {
            return res.status(404).json({ message: 'Route not found with the provided routeId' });
        }
        const bus = await Bus.findOne({ busNumber: busId });
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found with the provided busId' });
        }

        const schedule = new BusSchedule({
            scheduleId,
            routeId: route.routeId,
            busId: bus.busNumber,
            routeDate,
            startingTime,
            closingTime,
            status,
        });
        await schedule.save();
        res.status(201).json({ message: 'Bus schedule created successfully', schedule });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create bus schedule', details: error.message });
    }
};

exports.getBusSchedules = async (req, res) => {
    try {
        const schedules = await BusSchedule.find()
            .populate('routeId', 'origin destination distance')
            .populate('busId', 'busNumber type seatingCapacity');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bus schedules', details: error.message });
    }
};

exports.getBusSchedulesById = async (req, res) => {
    try {
        const schedule = await BusSchedule.findOne({ scheduleId: req.params.scheduleId })
            .populate('routeId', 'origin destination distance') 
            .populate('busId', 'busNumber type seatingCapacity');
        if (!schedule) {
            return res.status(404).json({ message: 'Bus schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bus schedule', details: error.message });
    }
};

exports.updateBusSchedule = async (req, res) => {
    try {
        const { routeId, busId, routeDate, startingTime, closingTime, status } = req.body;
        if (routeId) {
            const route = await Route.findOne({ routeId });
            if (!route) {
                return res.status(404).json({ message: 'Route not found with the provided routeId' });
            }
        }
        if (busId) {
            const bus = await Bus.findOne({ busNumber: busId });
            if (!bus) {
                return res.status(404).json({ message: 'Bus not found with the provided busId' });
            }
        }

        const updatedSchedule = await BusSchedule.findOneAndUpdate(
            { scheduleId: req.params.scheduleId },
            { routeId, busId, routeDate, startingTime, closingTime, status },
            { new: true }
        );
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Bus schedule not found' });
        }
        res.status(200).json({ message: 'Bus schedule updated successfully', schedule: updatedSchedule });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bus schedule', details: error.message });
    }
};

exports.deleteBusSchedule = async (req, res) => {
    try {
        const schedule = await BusSchedule.findOneAndDelete({ scheduleId: req.params.scheduleId });
        if (!schedule) {
            return res.status(404).json({ message: 'Bus schedule not found' });
        }
        res.status(200).json({ message: 'Bus schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bus schedule', details: error.message });
    }
};