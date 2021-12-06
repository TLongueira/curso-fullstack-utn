const { response } = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const hospitalesGet = (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        conn.query("select * from hospital", (err, rows) => {
            rows.map((data) => {
                if(data.imagen){
                    fs.writeFileSync(
                        path.join(__dirname, "../dbimagenes/hospitales/" + data.id_hospital + "-front.png"),
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
const altaHospital = (req, res = response) => {
    req.getConnection((err, conn) => {
        let { nombre, direccion, telefono, email, imagen } = req.body;
        imagen=fs.readFileSync(
            path.join(__dirname, "../imagenes/" + req.file.filename)
        );
        if (err) return res.status(500).send("Server error");
        conn.query("insert into hospital set ?",
            [{ nombre, direccion, telefono, email, imagen }],
            (err, rows) => {
                if (err) return res.status(500).send("server error");

                res.send("hospital generado!");
            })
    })
}
const detalleHospital = (req, res = response) => {
    let { id } = req.query;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        conn.query("select * from hospital where id_hospital=" + id + "", (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}


module.exports = {
    hospitalesGet,
    altaHospital,
    detalleHospital
}