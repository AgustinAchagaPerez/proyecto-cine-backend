import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }], // Referencia a asientos
    showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }] // Referencia a horarios
});

export default mongoose.model('Room', roomSchema);
