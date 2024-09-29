import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }, // Duración en minutos
  showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }], // Relación con horarios de proyección
});

export default mongoose.model('Movie', movieSchema);
