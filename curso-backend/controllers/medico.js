const { response } = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const medicosGet = (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        conn.query("select * from medico", (err, rows) => {
            rows.map((data) => {
                if (data.imagen) {
                    fs.writeFileSync(
                        path.join(__dirname, "../dbimagenes/medicos/" + data.id_medico + "-front.png"),
                        data.imagen
                    );
                }
            });
            res.send({
                rows: rows
            })
        })

    });

}
const altaMedico = (req, res = response) => {
    req.getConnection((err, conn) => {
        let { nombre, apellido, especialidad, matricula, telefono, imagen } = req.body;
        imagen = fs.readFileSync(
            path.join(__dirname, "../imagenes/" + req.file.filename)
        );
        if (err) return res.status(500).send("Server error");
        conn.query("insert into medico set ?",
            [{ nombre, apellido, especialidad, matricula, telefono, imagen }],
            (err, rows) => {
                if (err) return res.status(500).send("server error");

                res.send("medico generado!");
            })
    })
}
const detalleMedico = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        conn.query("select * from medico where id_medico=" + id + "", (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}


module.exports = {
    medicosGet,
    altaMedico,
    detalleMedico
}