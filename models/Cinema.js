import mongoose from 'mongoose';

const CinemaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  salas: [
    {
      numero_sala: {
        type: Number,
        required: true
      },
      butacas: {
        type: Number,
        required: true,
        default: 100
      },
      pelicula: {
        titulo: {
          type: String,
          required: true
        },
        director: {
          type: String,
          required: true
        },
        duracion: {
          type: Number,
          required: true
        },
        genero: {
          type: String,
          required: true
        }
      },
      horarios: [
        {
          type: String,  // Ej. "10:00", "13:00"
          required: true
        }
      ]
    }
  ]
});

export default mongoose.model('Cinema', CinemaSchema);