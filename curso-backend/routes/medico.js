const { Router } = require('express');
const { medicosGet, altaMedico,detalleMedico } = require('../controllers/medico');
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//const upload = multer({ dest: 'uploads/' })

  
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../imagenes/"),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    },
});

const fileUpload = multer({
    storage: diskstorage,
}).single("imagen");

router.get("/", medicosGet );
router.get("/detalle",detalleMedico);

router.post("/alta",fileUpload,altaMedico);



module.exports = router;