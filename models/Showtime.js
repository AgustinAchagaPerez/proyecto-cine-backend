import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
  time: { type: Date, required: true }, // Fecha y hora de la función
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Relación con película
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Relación con sala
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }] // Relación con butacas
});

export default mongoose.model('Showtime', showtimeSchema);
