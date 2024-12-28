const Reservation = require('../../model/Reservation');
const BusSchedule = require('../../model/BusSchedule');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.reserveSeats = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { scheduleId, seatsReserved } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: 'Unauthorized! Token not availble'});

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const schedule = await BusSchedule.findOne({scheduleId}).populate('busId').session(session);
        if (!schedule) return res.status(404).json({message: 'Schedule not found'});

        const totalSeats = schedule.busId.seatingCapacity;

        const reservations = await Reservation.find({ scheduleId: schedule._id }).session(session);
        const reservedSeats = reservations
            .filter((r) => r.reservationStatus === 'Confirmed' || (r.reservationStatus === 'Hold' && r.holdExpiresAt > new Date() ))
            .reduce((total, r) => total + r.seatsReserved, 0);
        
        if (seatsReserved > totalSeats - reservedSeats) {
            return res.status(400).json({message: 'Not enough seats availble'});
        }

        const holdExpiresAt = new Date(Date.now() + 10*60*1000);
        const heldReservation = new Reservation({
            scheduleId: schedule._id,
            userId,
            seatsReserved,
            reservationStatus: 'Hold',
            holdExpiresAt,
        });
            await heldReservation.save({session});

        await session.commitTransaction();
        // session.endSession();
        res.status(200).json({message: 'Seats held successfully. Complete the reservation within 10 minutes.', heldReservation});

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({error: 'Server Error', error: error.message});
    } finally {
        session.endSession();
    }
};

exports.confirmReservation = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const { reservationId } = req.body;

        if(!mongoose.Types.ObjectId.isValid(reservationId)){
            return res.status(400).json({ message: 'Invalid reservation ID' });
        }

        const reservationData = await Reservation.findById(reservationId);
        if (!reservationData) {
            return res.status(404).json({ message: 'Reservation not found in the database' });
        }
        console.log('Reservation Data:', reservationData);

        // Step 2: Log userId and query conditions
        console.log('User ID:', userId);
        console.log('Query conditions: ', {
            _id: reservationId,
            userId,
            reservationStatus: 'Hold',
            holdExpiresAt: { $gt: new Date() },
        });

        const reservation = await Reservation.findOneAndUpdate(
            { 
                _id: reservationId, 
                userId, 
                reservationStatus: 'Hold', 
                holdExpiresAt: { $gt: new Date()},
            },
            { reservationStatus: 'Confirmed', holdExpiresAt: null },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({message: 'Reservation not found or Already expired'});
        }

        res.status(200).json({ message: 'Reservation Confiremed', reservation});
    } catch (error) {
        res.status(500).json({error: 'Failed to confirm reservation', details: error.message});
    }
};

exports.cleanupExpiredHolds = async () => {
    const now = new Date();
    try {
        const result = await Reservation.deleteMany({ reservationStatus: 'Hold', holdExpiresAt: {$lt: now} });
        console.log(`Expired holds cleaned up: ${result.deletedCount} reservations`);
    } catch (error) {
        console.log('Erro cleaning up expired holds', error);
    }
};