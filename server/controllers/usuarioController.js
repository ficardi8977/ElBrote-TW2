// usuarioController.js

// Importa express
const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService.js');

// APIS
// Ruta POST para registrar usuario // 
router.post('/registrar', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ mensaje: 'Es obligatorio el cuerpo de la solicitud'});
  }
  if (!req.body.email) {
    res.status(400).json({ mensaje: 'El email es obligatorio en el cuerpo de la solicitud'});
  }
  if (!req.body.password) {
    res.status(400).json({ mensaje: 'La constraseña es obligatoria en el cuerpo de la solicitud'});
  }
  if (!req.body.nombre) {
    res.status(400).json({ mensaje: 'El nombre es obligatorio el cuerpo de la solicitud'});
  } 
  if (!req.body.apellido) {
    res.status(400).json({ mensaje: 'El apellido es obligatorio el cuerpo de la solicitud'});
  }
  if (!req.body.direccion) {
    res.status(400).json({ mensaje: 'El direccion es obligatorio el cuerpo de la solicitud'});
  }
  else {
    try {
      await usuarioService.registrar(req);
      res.status(200).json({ mensaje: `usuario ${req.body.email} registrado correctamente.` });
    } catch (error) {
      res.status(500).json({ mensaje: 'error al registrase, intentar nuevamente' });
    }  
  }
});

//login // 
router.post('/ingresar', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Debe completar todos los campos.' });
  } else {
    try {
      const response = await usuarioService.login(req.body.email, req.body.password); 
      res.status(200).json({ message: 'Inicio de sesión exitoso', data: response });

    } catch (error) {
      console.log(error);
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  }
});

//solicitar recuparacion de contraseña // 
router.post('/recuperacion/solicitud', async (req, res) => {
    try {
      result = await usuarioService.solicitarRecuperacion(req.body.email); 
      res.status(200).json({ message: 'solicitud existosa, verificar código en mail ' + req.body.email});

    } catch (error) {
      res.status(500).json({ error: 'Fallo en la solicitud de recuperación' });
    }  
});

//confirmar recuparacion de contraseña // 
router.post('/recuperacion/confirmar', async (req, res) => {
  try {
    result = await usuarioService.confirmarPasswordRecuperacion(req.body.email,req.body.password, req.body.codigoVerificador); 
    res.status(200).json({ message: 'cambio realizado exitosamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al confirmar el cambio de mail' });
  }  
});

module.exports = router;