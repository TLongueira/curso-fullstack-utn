import React, { useEffect, useState } from 'react'
import { MedicoCard } from './MedicoCard';

export const MedicosList = (params) => {
    let { idBuscar } = params;
    useEffect(() => {
        if (idBuscar) {
            fetch("http://localhost:8085/api/hospitalmedico/obtenermedicos?id="+idBuscar+"")
            .then(resp => resp.json()
                .then(({ rows }) => {
                    setMedicos(rows)
                })
            )
            .catch();
        }
        else {
            //get medicos from back 
            fetch("http://localhost:8085/api/medico")
                .then(resp => resp.json()
                    .then(({ rows }) => {
                        setMedicos(rows)
                    })
                )
                .catch();
        }

    }, [idBuscar])
    const [medicos, setMedicos] = useState([])
    return (
        <div className="card-columns animate__animated animate__fadeIn">
        {
            medicos.map(medico => (
                <MedicoCard key={medico.id_medico}
                    {...medico} />
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
