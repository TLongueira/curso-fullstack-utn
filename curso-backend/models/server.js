const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const path = require('path')
const bodyParser = require('body-parser');


const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.hospitalPath = "/api/hospital";
    this.medicoPath = "/api/medico";
    this.hospitalMedicoPath = "/api/hospitalmedico";
    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }
  middlewares() {
    this.app.use(myconn(mysql, {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tiago-longueira-proyecto-final'
    }))
    this.app.use(cors())
    //Lectura y parseo del body
    this.app.use ( express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //directorio
    
    this.app.use('/public',express.static('public'));
    this.app.use(express.static(path.join(__dirname, '../dbimagenes')))
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuario"));
    this.app.use(this.hospitalPath, require("../routes/hospital"));
    this.app.use(this.medicoPath, require("../routes/medico"));
    this.app.use(this.hospitalMedicoPath, require("../routes/hospital_medico"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
