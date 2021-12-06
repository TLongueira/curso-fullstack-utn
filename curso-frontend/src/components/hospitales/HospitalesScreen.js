import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { HospitalesList } from './HospitalesList'
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

export const HospitalesScreen = () => {

    const [key, setKey] = useState()
    const [file, setFile] = useState(null)
    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const [formValues, handleInputChange] = useForm({
        nombre: "",
        direccion: "",
        email: "",
        telefono: ""
    });
    const { nombre,
        direccion,
        email,
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
        formD.append("direccion", direccion);
        formD.append("email", email);
        formD.append("telefono", telefono);
        formD.append('imagen', file)

        fetch("http://localhost:8085/api/hospital/alta",
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
            <h1>Listado de Hospitales afiliados
                <button onClick={openModal} className="btn btn-success m-5">Nuevo Hospital</button>
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

                                <h3 className="mb-5">Dar de alta un Hospital</h3>
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
                                    <input type="text" id="direccion" className="form-control form-control-lg"
                                        name="direccion"
                                        value={direccion}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa una direccion"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Direccion</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="telefono" className="form-control form-control-lg"
                                        name="telefono"
                                        value={telefono}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa un telefono"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Telefono</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control form-control-lg"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        placeholder="Ingresa una email"
                                    />
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
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

            <HospitalesList  key={key} />


        </div>
    )
}
