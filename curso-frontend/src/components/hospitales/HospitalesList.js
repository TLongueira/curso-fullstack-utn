import React, { useEffect, useState } from 'react'
import { HospitalCard } from './HospitalCard'

export const HospitalesList = (params) => {
    let { idBuscar } = params;
    useEffect(() => {
        if (idBuscar) {
            fetch("http://localhost:8085/api/hospitalmedico/obtenerhospitales?id="+idBuscar+"")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setHospitales(rows)
                })
            )
            .catch();
        }
        else {
            fetch("http://localhost:8085/api/hospital")
                .then(resp => resp.json()
                    .then(({ rows }) => {
                        setHospitales(rows)
                    })
                )
                .catch();
        }

    }, [idBuscar])
    const [hospitales, setHospitales] = useState([])



    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                hospitales.map(hospital => (
                    <HospitalCard key={hospital.id_hospital}
                        {...hospital} />
                ))
            /*
            heroes.map( hero => (
                <HeroCard 
                     key={ hero.id }
                     { ...hero }
                 />
                
            ))
            */}
        </div>
    )
}
