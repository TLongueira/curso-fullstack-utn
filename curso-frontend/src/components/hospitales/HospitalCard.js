import React from 'react'
import { Link } from 'react-router-dom';

export const HospitalCard = ({
    id_hospital,
    nombre,
    direccion,
    telefono,
    email,
    imagen
}) => {

    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540, height: 300 }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={'http://localhost:8085/hospitales/'+id_hospital+'-front.png'} className="card-img" alt={nombre} />
                </div>
                <div className="col-md-8">

                    <div className="card-body">
                        <h5 className="card-title"> {nombre} </h5>
                        <p className="card-text">  {direccion} </p>

                        <p className="card-text">
                            <small className="text-muted">  {telefono}  </small>
                        </p>
                        <p className="card-text">
                            <small className="text-muted">  {email}  </small>
                        </p>

                        <Link to={`../hospital/${id_hospital}`
                        }>
                            Más...
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}
