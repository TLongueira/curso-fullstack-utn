import React, { useEffect, useState } from 'react'
import { MedicosList } from './MedicosList'
import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
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
export const MedicosScreen = ({history}) => {
    let idUsuario = localStorage.getItem("idLogeado");
    useEffect(() => {
        if (!idUsuario) {
            history.push("/login")
        }
        
    }, [])
    const [key, setKey] = useState()
    const [file, setFile] = useState(null)
    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const [formValues, handleInputChange] = useForm({
        nombre: "",
        apellido: "",
        especialidad: "",
        matricula: "",
        telefono: ""
    });
    const { nombre,
        apellido,
        especialidad,
        matricula,
        telefono,
        } = formValues;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }



    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formD = new FormData();
        formD.append("nombre", nombre);
        formD.append("apellido", apellido);
        formD.append("especialidad", especialidad);
        formD.append("matricula", matricula);
        formD.append("telefono", telefono);
        formD.append('imagen', file)

        fetch("http://localhost:8085/api/medico/alta",
            {
                method: 'POST',
                body: formD
            })
            .then(resp => {
                if (resp.status === 200) {
                    setKey(Math.random());
                }
                else {
                    alert("Algo salio mal :(")
                }
            }
            )
            .catch();
            closeModal();
    }


    return (
        <div>
            <h1>Listado de Medicos afiliados
                <button onClick={openModal} className="btn btn-success m-5">Nuevo Medico</button>
            </h1>
            <hr />

            <div>
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

                                <h3 className="mb-5">Dar de alta un Medico</h3>
                                <div className="form-outline mb-4">
                                    <input type="text" id="nombre" className="form-control form-control-lg"
                                        name="nombre"
                                        value={nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa un nombre"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Nombre</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="apellido" className="form-control form-control-lg"
                                        name="apellido"
                                        value={apellido}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa un apellido"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Apellido</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="especialidad" className="form-control form-control-lg"
                                        name="especialidad"
                                        value={especialidad}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa una especialidad"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Especialidad</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="matricula" className="form-control form-control-lg"
                                        name="matricula"
                                        value={matricula}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa una matricula"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Matricula</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="telefono" className="form-control form-control-lg"
                                        name="telefono"
                                        value={telefono}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa un telefono"
                                    />
                                    <label className="form-label" htmlFor="typePasswordX-2">Telefono</label>
                                </div>
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
            </div>
            <MedicosList  key={key} />


        </div>
    )
}
