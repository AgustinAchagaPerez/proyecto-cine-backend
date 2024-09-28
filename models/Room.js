import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  seats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat' // Reference to the seats in the room
  }],
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema', // Reference to the cinema that the room belongs to
    required: true
  }
});

export default mongoose.model('Room', roomSchema);
