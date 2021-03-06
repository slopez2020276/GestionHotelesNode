const express = require('express');
const hotelController = require('../controllers/Hoteles.controller');
const mdAuth = require('../middlewares/autenticated.middlewares');

var api = express.Router();

api.put("/agregarhotel",[mdAuth.Auth, mdAuth.ensureAuthAdmin],hotelController.AgregarHoteles);
api.put("/editarHotel/:idHotel",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],hotelController.EditarHoteles);//necesita el ID del hotel(validaciones No necesarias)
api.put("/eliminarHoteles/:idHotel",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],hotelController.ElimnarHotel);//necesita el ID del hotel(validaciones No necesarias)
api.get("/obtenerHoteles",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],hotelController.ObtenerHoteles);
api.get("/obtenerHotelesxId/:idHotel",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],hotelController.ObtenerHotelesxId);//necesita el ID del hotel(validaciones No necesarias)
api.get("/obtenerHotelesxNombre",[mdAuth.Auth],hotelController.ObtenerHotelesxNombre);
module.exports =api