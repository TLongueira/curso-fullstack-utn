import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { HospitalesList } from '../hospitales/HospitalesList';

export const MedicoScreen = ({ history }) => {
    const { medicoId } = useParams();
    const [medicoObtenido, setMedicoObtenido] = useState({})
    const { id_medico, nombre, apellido, especialidad, matricula, telefono, imagen } = medicoObtenido;



    useEffect(() => {
        fetch("http://localhost:8085/api/medico/detalle?id=" + medicoId + "")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setMedicoObtenido(rows[0])
                })
            )
            .catch();

    }, [])
    const handleReturn = () => {

        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }

    }
    const [showAsignacion, setshowAsignacion] = useState(false)
    const handleShowAsignaciones = () => {
        setshowAsignacion(!showAsignacion)
    }
    const [refresh, setRefresh] = useState(0)
    const [hospitalesSinAsignar, setHospitalesSinAsignar] = useState([])
    const [hospitalesAsignados, setHospitalesAsignados] = useState([])
    useEffect(() => {
        fetch("http://localhost:8085/api/hospitalmedico/hospitalessinasignar?id=" + medicoId + "")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setHospitalesSinAsignar(rows)
                })
            )
            .catch();

        fetch("http://localhost:8085/api/hospitalmedico/hospitalesasignados?id=" + medicoId + "")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setHospitalesAsignados(rows)
                })
            )
            .catch();

    }, [refresh])

    const handleAsignarHospital = (e) => {
        fetch("http://localhost:8085/api/hospitalmedico/alta?idhospital=" + e.target.value + "&idmedico=" + medicoId + "")
            .then(resp => {
                setRefresh(refresh + 1)
            }
            )
            .catch();
    }
    const handleDesasignarHospital = (e) => {
        fetch("http://localhost:8085/api/hospitalmedico/baja?idhospitalmedico=" + e.target.value + "",
            {
                method: "DELETE"
            })
            .then(resp => {
                setRefresh(refresh + 1)
            }
            )
            .catch();
    }
    return (
        <section>
            {!showAsignacion &&
                <div>
                    <button type="button" onClick={handleReturn} name="" id="" className="btn btn-primary btn-sm">Regresar</button>
                    <div className="row mt-5">
                        <div className="col-4">
                            <img
                                src={'http://localhost:8085/medicos/' + id_medico + '-front.png'}
                                alt={nombre}
                                className="img-thumbnail animate__animated animate__fadeInLeft"
                            />
                        </div>
                        <div className="col-8 animate__animated animate__fadeIn">
                            <h3> {nombre} </h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> <b> Nombre: </b> {nombre} {apellido} </li>
                                <li className="list-group-item"> <b> Matricula: </b> {matricula} </li>
                                <li className="list-group-item"> <b> Especialidad: </b> {especialidad} </li>
                                <li className="list-group-item"> <b> Telefono: </b> {telefono} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <h1>Este medico trabaja en los siguientes hospitales</h1>
                        <button onClick={handleShowAsignaciones} className="btn btn-success ml-5">Ver Asignaciones</button>
                        <hr />
                        <HospitalesList idBuscar={id_medico} />
                    </div>
                </div>
            }
            {(showAsignacion) &&
                <div>
                    <button onClick={handleShowAsignaciones}  name="" id="" className="btn btn-primary btn-sm">Regresar</button>
                    <div className="row mt-5">

                        <div className="col-6">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
                                        <th>Asignar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        hospitalesSinAsignar.map(hospital => (
                                            <tr key={hospital.id_hospital}>
                                                <td scope="row">{hospital.nombre}</td>
                                                <td>{hospital.direccion}</td>
                                                <td>
                                                    <button value={hospital.id_hospital} onClick={handleAsignarHospital} type="button" className="btn btn-success">Asignar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>

                        </div>
                        <div className="col-6">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
                                        <th>Asignar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        hospitalesAsignados.map(hospital => (
                                            <tr key={hospital.id_hospital_medico}>
                                                <td scope="row">{hospital.nombre}</td>
                                                <td>{hospital.direccion}</td>
                                                <td>
                                                    <button value={hospital.id_hospital_medico} onClick={handleDesasignarHospital} type="button" className="btn btn-danger">Desasignar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            }
        </section>
    )
}
