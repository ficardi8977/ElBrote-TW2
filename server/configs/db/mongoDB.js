const mongoose = require('mongoose');
mongoose.connect('-', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión a la base de datos exitosa');
});

module.exports = db;