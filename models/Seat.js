import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied'], // Status of the seat
    default: 'available'
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtime', // Reference to the showtime it belongs to
    required: true
  }
});

export default mongoose.model('Seat', seatSchema);