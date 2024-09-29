import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cinema from './models/cinema.js';
import Room from './models/Room.js';
import Movie from './models/Movie.js';
import Showtime from './models/Showtime.js';
import Seat from './models/Seat.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error al conectar MongoDB:', err));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// ============================
// CRUD for Cinemas
// ============================

app.post('/cines', async (req, res) => {
  try {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201).json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/cines', async (req, res) => {
  try {
    const cinemas = await Cinema.find().populate('rooms');
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).populate('rooms');
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Movies
// ============================

app.post('/peliculas', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/peliculas', async (req, res) => {
  try {
    const movies = await Movie.find().populate('showtimes');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('showtimes');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Seats
// ============================

app.post('/butacas', async (req, res) => {
  try {
    const seat = new Seat({
      number: req.body.number,
      showtime: req.body.showtime,
      room: req.body.room // Asegúrate de que este campo esté incluido en la solicitud
    });
    await seat.save();

    // Actualizar la función para agregar la butaca creada
    await Showtime.findByIdAndUpdate(req.body.showtime, { $push: { seats: seat._id } });

    // También actualizar la sala para agregar la butaca
    await Room.findByIdAndUpdate(req.body.room, { $push: { seats: seat._id } });

    res.status(201).json(seat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/butacas', async (req, res) => {
  try {
    const seats = await Seat.find().populate('showtime room');
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('showtime room');
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });

    // Remover la butaca de la función
    await Showtime.findByIdAndUpdate(seat.showtime, { $pull: { seats: seat._id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Showtimes
// ============================

app.post('/funciones', async (req, res) => {
  try {
    const showtime = new Showtime(req.body);
    await showtime.save();

    // Actualizar la sala para agregar la función creada
    await Room.findByIdAndUpdate(req.body.room, { $push: { showtimes: showtime._id } });

    // Actualizar la película para agregar la función
    await Movie.findByIdAndUpdate(req.body.movie, { $push: { showtimes: showtime._id } });

    res.status(201).json(showtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/funciones', async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate('room movie seats');
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate('room movie seats');
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    // Remover la función de la sala
    await Room.findByIdAndUpdate(showtime.room, { $pull: { showtimes: showtime._id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Rooms
// ============================

app.post('/salas', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();

    // Actualizar el cine para agregar la sala creada
    await Cinema.findByIdAndUpdate(req.body.cinema, { $push: { rooms: room._id } });

    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/salas', async (req, res) => {
  try {
    const rooms = await Room.find().populate('cinema showtimes seats');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('cinema showtimes seats');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Remover la sala del cine
    await Cinema.findByIdAndUpdate(room.cinema, { $pull: { rooms: room._id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Función para formatear la fecha a la hora local en Buenos Aires
const formatDateToLocal = (utcDate) => {
  return new Date(utcDate).toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// Limpiar la base de datos (opcional)
app.delete('/clean-database', async (req, res) => {
  try {
    await Cinema.deleteMany({});
    await Room.deleteMany({});
    await Movie.deleteMany({});
    await Showtime.deleteMany({});
    await Seat.deleteMany({});
    res.status(200).send('Database cleaned');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});