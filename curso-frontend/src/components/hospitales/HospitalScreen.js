import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MedicosList } from '../medicos/MedicosList';
import { HospitalesList } from './HospitalesList';

export const HospitalScreen = ({ history }) => {
    const { hospitalId } = useParams();
    const [hospitalObtenido, setHospitalObtenido] = useState({})
    const { id_hospital, nombre, direccion, telefono, imagen, email } = hospitalObtenido;

    useEffect(() => {
        fetch("http://localhost:8085/api/hospital/detalle?id=" + hospitalId + "")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setHospitalObtenido(rows[0])
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
    return (
        <section>
        <button type="button" onClick={handleReturn} name="" id="" className="btn btn-primary btn-sm">Regresar</button>
            <div className="row mt-5">
                <div className="col-4">
                    <img
                        src={'http://localhost:8085/hospitales/'+id_hospital+'-front.png'}
                        alt={nombre}
                        className="img-thumbnail animate__animated animate__fadeInLeft"
                    />
                </div>

                <div className="col-8 animate__animated animate__fadeIn">
                    <h3> {nombre} </h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <b> Hospital: </b> {nombre} </li>
                        <li className="list-group-item"> <b> Correo: </b> {email} </li>
                        <li className="list-group-item"> <b> Telefono: </b> {telefono} </li>
                        <li className="list-group-item"> <b> Ubicado en: </b> {direccion} </li>
                    </ul>
                </div>

            </div>

            <div className="row mt-5">
                <h1>Listado de Medicos de este hospital</h1>
                <hr />
                <MedicosList idBuscar={id_hospital} />
            </div>
        </section>
    )
}
