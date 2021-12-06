const { Router } = require('express');
const { usuariosGet, loginUsuario, altaUsuario, actualizarFotoPerfil, actualizarUsuario, borrarUsuario, obtenerUsuario } = require('../controllers/usuario');
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../imagenes/"),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    },
});

const fileUpload = multer({
    storage: diskstorage,
}).single("imagen");

router.get("/", usuariosGet);
router.get("/login", loginUsuario);
router.post("/alta", altaUsuario);
router.put("/actualizarfoto", fileUpload, actualizarFotoPerfil);
router.put("/actualizarusuario", actualizarUsuario);
router.delete("/borrarusuario", borrarUsuario);
router.get("/obtenerusuario", obtenerUsuario)




module.exports = router;