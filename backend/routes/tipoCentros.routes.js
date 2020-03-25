const express = require('express');
const router = express.Router();

const ctrlTipoCenter = require('../controllers/tipoCentros.controller');

router.post('/register', ctrlTipoCenter.CrearTipoCentro);//registro
router.get('/', ctrlTipoCenter.getTipoCenters); //pide todos los usuarios
router.get('/:id', ctrlTipoCenter.getTipoCenter); // pide un solo usuario
router.put('/edit/:id', ctrlTipoCenter.UpdateTipoCenter); //editar datos
router.delete('/:id', ctrlTipoCenter.DeleteTipoCenter); //cambia estado usuario "eliminar"


module.exports = router;


