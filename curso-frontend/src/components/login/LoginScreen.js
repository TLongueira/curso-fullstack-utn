import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';

export const LoginScreen = ({ history }) => {
    localStorage.removeItem("idLogeado")

    const [formValues, handleInputChange] = useForm({
        email: "",
        clave: ""
    });
    const { email, clave } = formValues;
    const [formValuesRegister, handleInputChangeR] = useForm({
        nombre: "",
        apellido: "",
        edad: 0,
        emailR: "",
        claveR: "",
        dni:""
    });
    const { nombre, apellido, edad, emailR, claveR,dni } = formValuesRegister;

    const [login, setLogin] = useState([])
    useEffect(() => {
        if (login?.length >= 1) {
            localStorage.setItem("idLogeado",login[0].id_usuario)
            history.push("/inicio")
        }

    }, [login])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8085/api/usuarios/login?email=" + email + "&clave=" + clave + "")
            .then(resp => resp.json()
                .then(({ login }) => {
                    setLogin(login)
                })
            )
            .catch();
    }

    const [showRegistro, setShowRegistro] = useState(false)

    const handleRegistrarse = () => {
        setShowRegistro(!showRegistro)
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        const formD = new FormData();
        formD.append("nombre", nombre);
        formD.append("apellido", apellido);
        formD.append("edad", edad);
        formD.append("email", emailR);
        formD.append("clave", claveR);
        formD.append("dni", dni);

        fetch("http://localhost:8085/api/usuarios/alta",
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    edad,
                    emailR,
                    claveR,
                    dni
                }),
            })
            .then(resp => {
                if (resp.status === 200) {
                    alert("Registro exitoso")
                    setShowRegistro(false);
                }
                else {
                    alert("Algo salio mal :(")
                }
            }
            )
            .catch();
    }

    return (
        <section className="vh-100" >
            {(!showRegistro) &&
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" >
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Ingresar</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="email" id="typeEmailX-2" autoComplete="email" className="form-control form-control-lg"
                                                name="email"
                                                value={email}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="typePasswordX-2" autoComplete="current-password" className="form-control form-control-lg"
                                                name="clave"
                                                value={clave}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX-2">Clave</label>
                                        </div>
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Aceptar</button>
                                    </form>
                                    <hr />
                                    <a href="#" onClick={handleRegistrarse} className="">No tengo una cuenta</a>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(showRegistro) &&
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" >
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Registrate</h3>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="nombre" className="form-control form-control-lg"
                                            name="nombre"
                                            value={nombre}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">Nombre</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="apellido" className="form-control form-control-lg"
                                            name="apellido"
                                            value={apellido}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">Apellido</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="dni" className="form-control form-control-lg"
                                            name="dni"
                                            value={dni}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">DNI</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="numeric" id="edad" className="form-control form-control-lg"
                                            name="edad"
                                            value={edad}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">Edad</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" className="form-control form-control-lg"
                                            name="emailR"
                                            value={emailR}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
                                            name="claveR"
                                            value={claveR}
                                            onChange={handleInputChangeR}
                                        />
                                        <label className="form-label" htmlFor="typePasswordX-2">Clave</label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" onClick={handleSubmitRegister}>Registrarme</button>
                                    <hr/>
                                    <a href="#" onClick={handleRegistrarse} className="">Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}
