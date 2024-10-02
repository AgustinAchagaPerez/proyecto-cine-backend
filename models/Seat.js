import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false }, // Estado de ocupación
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true }, // Relación con horario de proyección
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true } // Nueva relación con la sala
});


