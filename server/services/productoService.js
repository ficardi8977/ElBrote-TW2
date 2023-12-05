const repository = require("../repositories/productoRepository");

exports.obtenerTodos = async () => {
  try {
    return await repository.obtenerTodos();
  } catch (error) {
    throw error;
  }
};

exports.obtenerUnProducto = async (id) => {
  try {
    return await repository.obtenerUnProducto(id);
  } catch (error) {
    throw error;
  }
};

exports.guardarProducto = async (producto) => {
  try {
    return await repository.guardarProducto(producto);
  } catch (error) {
    throw error;
  }
};

exports.editarProducto = async (productoId, nuevosDatos) => {
  try {
    return await repository.editarProducto(productoId, nuevosDatos);
  } catch (error) {
    throw error;
  }
};

exports.eliminarProducto = async (productoId) => {
  try {
    return await repository.eliminarProducto(productoId);
  } catch (error) {
    throw error;
  }
};
