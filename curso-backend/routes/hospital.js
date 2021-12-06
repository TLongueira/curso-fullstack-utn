const { Router } = require('express');
const { hospitalesGet, altaHospital,detalleHospital } = require('../controllers/hospital');
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

router.get("/", hospitalesGet );
router.post("/alta",fileUpload,altaHospital);
router.get("/detalle",detalleHospital);




module.exports = router;