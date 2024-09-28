import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room' // Reference to the rooms in the complex
  }]
});

export default mongoose.model('Cinema', cinemaSchema);