import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  complex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Format "HH:MM"
    required: true
  },
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat' // Reference to the seats
  }]
});



export default mongoose.model('Showtime', showtimeSchema);