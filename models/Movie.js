import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  rating: {
    type: String
  },
  synopsis: {
    type: String
  }
});

export default mongoose.model('Movie', movieSchema);
