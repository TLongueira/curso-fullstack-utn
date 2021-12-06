const { Router } = require('express');
const { obtenerMedicos,obtenerHospitales,altaRelacion,obtenerHospitalesdeMedico, obtenerHospitalesSinAsignar,bajaRelacion } = require('../controllers/hospital_medico');
const router = Router();

router.get("/obtenermedicos",obtenerMedicos);
router.get("/obtenerhospitales",obtenerHospitales);
router.get("/hospitalesasignados",obtenerHospitalesdeMedico);
router.get("/hospitalessinasignar",obtenerHospitalesSinAsignar);
router.get("/alta",altaRelacion);
router.delete("/baja",bajaRelacion);




module.exports = router;