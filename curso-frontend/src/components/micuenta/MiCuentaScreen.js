import React, { Component, useEffect, useState } from 'react'
import profile from '../placeholder.jpg'
import './miCuenta.css'
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const MiCuentaScreen = ({ history }) => {
    
    const [ocultarClave, setOcultarClave] = useState(true)
    let idUsuario = localStorage.getItem("idLogeado");
    const [usuario, setUsuario] = useState({})
    const { nombre, apellido, edad, email, clave, dni } = usuario;
    useEffect(() => {
        if (!idUsuario) {
            history.push("/login")
        }
        else {
            fetch("http://localhost:8085/api/usuarios/obtenerusuario?id_usuario=" + idUsuario + "")
                .then(resp => resp.json()
                    .then(({ rows }) => {
                        setUsuario(rows[0])
                    })
                )
                .catch();
        }
    }, [])
    const handleReturn = () => {

        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }

    }
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }



    function closeModal() {
        setIsOpen(false);
    }
    const [file, setFile] = useState(null)
    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const handleMostrarClave = () => {
        setOcultarClave(!ocultarClave)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formD = new FormData();

        formD.append('imagen', file)
        formD.append('id_usuario', idUsuario)

        fetch("http://localhost:8085/api/usuarios/actualizarfoto",
            {
                method: 'PUT',
                body: formD
            })
            .then(resp => {
                if (resp.status == 200) {
                    alert("Registro exitoso")
                }
                else {
                    alert("Algo salio mal :(")
                }
            }
            )
            .catch();
        closeModal();
    }

    const handleErrorImg = (e) => {
        e.target.src = profile
    }
    const [showEdicion, setShowEdicion] = useState(false)
    const handleShowEdicion = () => {
        setShowEdicion(!showEdicion)
    }

    const handleInputChange=({target})=>{
        setUsuario({
            ...usuario,
            [target.name]:target.value
        })
    }

    const handleGuardarCambios=(e)=>{
        e.preventDefault();

        fetch("http://localhost:8085/api/usuarios/actualizarusuario?"+
        "edad="+edad+""+"&"+
        "dni="+dni+""+"&"+
        "email="+email+""+"&"+
        "clave="+clave+""+"&"+
        "id_usuario="+idUsuario+"",
        {
            method:"PUT"
        })
            .then(resp => {
                if (resp.status == 200) {
                    alert("Actualizacion exitosa")
                }
                else {
                    alert("Algo salio mal :(")
                }
            }
            )
            .catch();
            handleShowEdicion()
    }
    const [eliminar, setEliminar] = useState({
        clicks:0,
        mensaje:"Eliminar mi cuenta"
    })

    const handleClickEliminar=(e)=>{
        switch (eliminar.clicks) {
            case 0:
                setEliminar({
                    clicks:1,
                    mensaje:"Click para confirmar"
                })
                break;
            case 1:
                setEliminar({
                    clicks:0,
                    mensaje:"Eliminar mi cuenta"
                })

                e.preventDefault();

                fetch("http://localhost:8085/api/usuarios/borrarusuario?"+
                "id_usuario="+idUsuario+"",
                {
                    method:"DELETE"
                })
                    .then(resp => {
                        if (resp.status == 200) {
                            alert("Actualizacion exitosa")
                            history.push("/login")
                        }
                        else {
                            alert("Algo salio mal :(")
                        }
                    }
                    )
                    .catch();

            default:
                break;
        }
    }
    return (
        <div className="row mt-5">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="card-body m-5 text-center">

                            <h3 className="mb-5">Cambia tu foto de perfil</h3>

                            <div className="form-outline mb-4">
                                <input type="file" id="fileInput" className="form-control form-control-lg"
                                    name="img"
                                    onChange={selectedHandler}
                                    placeholder="Carga una imagen"
                                />
                                <label className="form-label" htmlFor="typePasswordX-2">Imagen</label>
                            </div>
                            <button className="btn btn-success btn-lg btn-block" onClick={handleSubmit}>Listo</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="col-3">
            </div>

            <div className="col-6 animate__animated animate__fadeIn">

                <div className="container">
                    <img
                        src={'http://localhost:8085/usuarios/' + idUsuario + '-front.png'}
                        alt={nombre}
                        onError={handleErrorImg}
                        className="img-thumbnail fotoPerfil mx-auto d-block animate__animated animate__fadeInLeft "
                    />
                    <button id="cambiarFotoPerfil" onClick={openModal} className="btn btn-success mx-auto d-block animate__animated animate__fadeIn">Cambiar Imagen</button>
                </div>
                <h3 className="text-center mt-5">{nombre} {apellido}</h3>
                {(!showEdicion) &&

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <b> Edad: </b> {edad} </li>
                        <li className="list-group-item"> <b> Documento: </b> {dni} </li>
                    </ul>
                }
                {(showEdicion) &&

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <b> Edad:  </b>

                            <input type="number"
                                name="edad"
                                value={usuario.edad}
                                placeholder="Nueva Edad"
                                onChange={handleInputChange}
                                className="form-control form-control-sm">
                                    

                            </input>

                        </li>
                        <li className="list-group-item"> <b> Documento: </b>

                            <input type="text"
                                name="dni"
                                value={usuario.dni}
                                placeholder="Nuevo Documento"                                
                                onChange={handleInputChange}
                                className="form-control form-control-sm">

                            </input>

                        </li>
                    </ul>
                }
                <hr />
                <h3 className="text-center mt-2"> DATOS DE ACCESO </h3>
                <ul className="list-group list-group-flush mt-5">
                    {(!showEdicion) &&
                        <li className="list-group-item"> <b> Email: </b> {email} </li>

                    }
                    {(showEdicion) &&
                        <li className="list-group-item"> <b> Email: </b> 

                            <input type="email"
                                name="email"
                                value={usuario.email}
                                placeholder="Nuevo Email"                                
                                onChange={handleInputChange}
                                className="form-control form-control-sm">

                            </input>

                        </li>

                    }
                    {(!ocultarClave && !showEdicion) &&
                        <li className="list-group-item"> <b> Clave: </b> {clave} </li>
                    }
                    {(ocultarClave && !showEdicion) &&
                        <li className="list-group-item"> <b> Clave: </b> ********** </li>
                    }
                    {(showEdicion) &&
                        <li className="list-group-item"> <b> Clave: </b>

                            <input type="text"
                                name="clave"
                                value={usuario.clave}
                                placeholder="Nueva Clave"                                
                                onChange={handleInputChange}
                                className="form-control form-control-sm">

                            </input>

                        </li>
                    }

                </ul>

                <h5 className="text-center mt-2"> ACCIONES </h5>
                <div className="btn-group d-flex justify-content-around" role="group" aria-label="Basic outlined example">
                    {(!ocultarClave && !showEdicion) &&
                        <button type="button" onClick={handleMostrarClave} className="btn btn-outline-success acciones">Ocultar datos de Acceso</button>
                    }
                    {(ocultarClave && !showEdicion) &&
                        <button type="button" onClick={handleMostrarClave} className="btn btn-outline-danger acciones">Ver datos de Acceso</button>
                    }
                    {(showEdicion) &&
                        <>
                            <button type="button" onClick={handleShowEdicion} className="btn btn-outline-danger acciones">Cancelar</button>
                            <button type="button" onClick={handleGuardarCambios} className="btn btn-outline-success acciones">Guardar cambios</button>
                        </>
                    }
                    {(!showEdicion) &&
                        <button type="button" onClick={handleShowEdicion} className="btn btn-outline-primary acciones">Editar mi Cuenta</button>
                    }
                    {(!showEdicion) &&
                        <button type="button" onClick={handleClickEliminar} className="btn btn-outline-danger acciones">{eliminar.mensaje}</button>

                    }
                </div>
                <button
                    className="btn btn-outline-info w-100 mt-4"
                    onClick={handleReturn}
                >
                    Regresar a la página anterior!
                </button>

            </div>
            <div className="col-3">
            </div>

        </div>
    )
}