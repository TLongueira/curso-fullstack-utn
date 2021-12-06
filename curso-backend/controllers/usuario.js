const { response } = require('express');
const path = require("path");
const fs = require("fs");

const usuariosGet = (req, res = response) => {
    req.getConnection((err, conn) => {

        if (err) return res.status(500).send("server error");
        conn.query("select * from usuario", (err, rows) => {
            res.send({
                rows: rows
            })
        })

    });

}

const loginUsuario = (req, res = response) => {
    let { email, clave } = req.query;
    req.getConnection((err, conn) => {

        if (err) return res.status(500).send("server error");
        let sql = "select * from usuario where email='" + email + "' and clave='" + clave + "'";
        conn.query(sql, (err, rows) => {
            if (err) throw err
            res.send({
                login: rows
            })
        })

    });
}

const altaUsuario = (req, res = response) => {
    req.getConnection((err, conn) => {
        let { nombre, apellido, edad, emailR: email, claveR: clave, dni } = req.body;
        if (err) return res.status(500).send("Server error");
        conn.query("insert into usuario set ?",
            [{ nombre, apellido, edad, email, clave, dni }],
            (err, rows) => {
                if (err) return res.status(500).send("server error");

                res.send("usuario generado!");
            })
    })
}


const borrarUsuario = (req, res = response) => {
    let { id_usuario } = req.query;
    req.getConnection((err, conn) => {
        conn.query("delete from usuario where id_usuario='" + id_usuario + "'", (err, rows) => {
            res.send({
                rows: rows
            })
        })
    })
}
const obtenerUsuario = (req, res = response) => {
    let { id_usuario } = req.query;
    req.getConnection((err, conn) => {
        conn.query("select * from usuario where id_usuario=" + id_usuario + "", (err, rows) => {
            rows.map((data) => {
                if (data.fotoPerfil) {
                    fs.writeFileSync(
                        path.join(__dirname, "../dbimagenes/usuarios/" + data.id_usuario + "-front.png"),
                        data.fotoPerfil
                    );
                }
            });
            res.send({
                rows: rows
            })
        })
    })
}
const actualizarFotoPerfil = (req, res = response) => {
    req.getConnection((err, conn) => {
        let { imagen, id_usuario } = req.body;
        imagen = fs.readFileSync(
            path.join(__dirname, "../imagenes/" + req.file.filename)
        );
        if (err) return res.status(500).send("Server error");

        let sql = "update usuario set fotoPerfil=? where id_usuario=?";
        let data = [imagen, id_usuario];
        conn.query(sql, data,
            (err, rows) => {
                if (err) return res.status(500).send("server error");

                res.send("medico generado!");
            })

    })
}
const actualizarUsuario = (req, res = response) => {
    req.getConnection((err, conn) => {
        let { edad, email, clave, dni, id_usuario } = req.query;
        if (err) return res.status(500).send("Server error");
        let sql = "update usuario set email=?, edad=?, clave=?, dni=? where id_usuario=?";
        let data = [email, edad, clave, dni, id_usuario];
        conn.query(sql, data,
            (err, rows) => {
                if (err) return res.status(500).send("server error");

                res.send("medico generado!");
            })
    })
}



module.exports = {
    usuariosGet,
    loginUsuario,
    altaUsuario,
    borrarUsuario,
    obtenerUsuario,
    actualizarFotoPerfil,
    actualizarUsuario
}