// productoController.js
const express = require("express");
const router = express.Router();
const productoService = require("../services/productoService");
const Compra = require('../models/compra');

////////////////////////////// APIS /////////////////////////////////////////////////////

router.post("", async (req, res) => {
  try {
    const nuevoProducto = await productoService.guardarProducto(req.body);
    res.json({
      mensaje: `Producto registrado correctamente.`,
      data: nuevoProducto,
    });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

router.put("/:id", async (req, res) => {
  const productoId = req.params.id;
  const nuevosDatos = req.body;
  try {
    const productoActualizado = await productoService.editarProducto(
      productoId,
      nuevosDatos
    );
    res.json({
      mensaje: `Producto actualizado correctamente.`,
      data: productoActualizado,
    });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

router.delete("/:id", async (req, res) => {
  const productoId = req.params.id;
  try {
    const resultado = await productoService.eliminarProducto(productoId);
    res.json({
      mensaje: `Producto eliminado correctamente.`,
      data: resultado,
    });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

router.get("", async (req, res) => {
  try {
    const response = await productoService.obtenerTodos();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productoEncontrado = await productoService.obtenerUnProducto(id);
    if (productoEncontrado) {
      res.status(200).send(productoEncontrado);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener el producto por ID");
  }
});


router.post("/compras", async (req, res) => {
  try {
    const nuevaCompra = new Compra(req.body);
    const resultado = await nuevaCompra.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// confirmamos el ruteo
module.exports = router;
