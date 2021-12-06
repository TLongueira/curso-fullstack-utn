import React from 'react'
import { Link } from 'react-router-dom';

export const MedicoCard = ({
    id_medico,
    nombre,
    apellido,
    especialidad,
    matricula,
    telefono,
    imagen
}) => {
    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540, height: 300 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={'http://localhost:8085/medicos/' + id_medico +'-front.png'} className="card-img" alt={nombre} />
                </div>
                <div className="col-md-8">

                    <div className="card-body">
                        <h5 className="card-title"> {nombre} {apellido} </h5>
                        <p className="card-text">  {matricula} </p>

                        <p className="card-text">
                            <small className="text-muted">  {especialidad}  </small>
                        </p>
                        <p className="card-text">
                            <small className="text-muted">  {telefono}  </small>
                        </p>

                        <Link to={`../medico/${id_medico}`
                        }>
                            Más...
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}
