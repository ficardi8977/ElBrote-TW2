const Producto = require("../models/producto");

// Obtener todos los productos
exports.obtenerTodos = async () => {
  try {
    return await Producto.find();
  } catch (error) {
    throw error;
  }
};

// Obtener un los producto
exports.obtenerUnProducto = async (id) => {
  try {
    return await Producto.findById(id);
  } catch (error) {
    throw error;
  }
};

//guardar productos
exports.guardarProducto = async (producto) => {
  try {
    const nuevoProducto = new Producto(producto);
    return await nuevoProducto.save(producto);
  } catch (error) {
    throw error;
  }
};

//editar productos
exports.editarProducto = async (productoId, nuevosDatos) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
      nuevosDatos,
      { new: true }
    );
    return productoActualizado;
  } catch (error) {
    throw error;
  }
};

// Eliminar productos
exports.eliminarProducto = async (productoId) => {
  try {
    const resultado = await Producto.findOneAndDelete({ _id: productoId });
    return resultado;
  } catch (error) {
    throw error;
  }
};
