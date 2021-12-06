const { response } = require('express');


const obtenerMedicos = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        let query = "SELECT m.id_medico,m.nombre,m.apellido,m.especialidad,m.especialidad,m.matricula,m.telefono, m.imagen from hospital h " +
            "inner join hospital_medico hm on h.id_hospital=hm.id_hospital " +
            "inner join medico m on m.id_medico=hm.id_medico " +
            "where hm.id_hospital=" + id + "";
        conn.query(query, (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}
const obtenerHospitales = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        let query = "SELECT h.id_hospital,h.nombre,h.direccion,h.telefono,h.email,h.imagen from hospital h " +
            "inner join hospital_medico hm on h.id_hospital=hm.id_hospital " +
            "inner join medico m on m.id_medico=hm.id_medico " +
            "where hm.id_medico=" + id + "";
        conn.query(query, (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}

const altaRelacion = (req, res = response) => {
    let { idhospital: id_hospital, idmedico: id_medico } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query("insert into hospital_medico set ?",
            [{ id_hospital, id_medico }],
            (err, rows) => {
                if (err) return res.status(500).send("Server error");
                res.send({
                    rows: rows
                });
            })
    })
}
const bajaRelacion = (req, res = response) => {
    let { idhospitalmedico: id_hospital_medico } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query("delete from hospital_medico where id_hospital_medico = "+id_hospital_medico+"",
            (err, rows) => {
                if (err) return res.status(500).send("Server error");
                res.send({
                    rows: rows
                });
            })
    })
}

const obtenerHospitalesdeMedico = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        
        if (err) return res.status(500).send("server error");
        let query = "select hm.id_hospital_medico,h.nombre, h.direccion from hospital h " +
            "inner join hospital_medico hm on h.id_hospital=hm.id_hospital " +
            "where hm.id_medico=" + id + "";
        conn.query(query, (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}

const obtenerHospitalesSinAsignar = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        let query = "select h.id_hospital, h.nombre, h.direccion from hospital h " +
            "where h.id_hospital not IN (select hm.id_hospital from hospital_medico hm where hm.id_medico=" + id + ")";
        conn.query(query, (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}


module.exports = {

    obtenerHospitales,
    obtenerMedicos,
    altaRelacion,
    obtenerHospitalesdeMedico,
    obtenerHospitalesSinAsignar,
    bajaRelacion
}