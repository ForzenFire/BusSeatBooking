const Reservation = require('../../model/Reservation');
const BusSchedule = require('../../model/BusSchedule');
const mongoose = require('mongoose');

exports.reserveSeats = async (req, res) => {
    const session = await mongoose.startSession();
    session.startSession();

    try {
        const { scheduleId, userId, seatsReserved } = req.body;
        const schedule = await BusSchedule.findById(scheduleId).populate('busId').session(session);
        if (!schedule) return res.status(404).json({message: 'Schedule not found'});
        const totalSeats = schedule.busId.seatingCapacity;

        const reservations = await Reservation.find({ scheduleId }).session(session);
        const reservedSeats = reservations
            .filter(r => r.reservationStatus === 'Confirmed' || (r.reservationStatus === 'Hold' && r.holdExpiresAt > new Date() ))
            .reduce((total, r) => total + r.seatsReserved, 0);
        
        if (seatsReserved > (totalSeats - reservedSeats)) {
            return res.status(400).json({message: 'Not enough seats availble'});
        }

        const holdExpiration = new Date(Date.now() + 10*60*1000);
        const heldReservation = await Reservation.create(
            [{
                reservationId: 'HOLD-${Date.now()}',
                scheduleId,
                userId,
                seatsReserved,
                reservationStatus: 'Hold',
                holdExpiresAt: holdExpiration,
            }], {session}
        );

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({message: 'Seats held successfully. Complete the reservation within 10 minutes.', heldReservation});

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({error: 'Server Error'});
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

        if(!mongoose.isValidObjectId(reservationId)){
            return res.status(400).json({ message: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findOneAndUpdate(
            { reservationId, userId, reservationStatus: 'Hold', holdExpiresAt: { $gt: new Date()} },
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