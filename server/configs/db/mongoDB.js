const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@tallerweb2.tom4g9j.mongodb.net/TP_TALLERWEB_2', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión a la base de datos exitosa');
});

module.exports = db;