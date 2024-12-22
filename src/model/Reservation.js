const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    reservationId : {type: String, required: true, unique: true },
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusSchedule', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatsReserved: {type: Number, required: true },
    reservationStatus: { type: String, enum: ['Hold', 'Confirmed'], default: 'Hold'},
    holdExpiresAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);