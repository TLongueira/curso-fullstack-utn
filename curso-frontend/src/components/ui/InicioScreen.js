import React from 'react'

export const Inicio = ({history}) => {
    const idUsuario=localStorage.getItem("idLogeado")
    if (!idUsuario) {
        history.push("/login")
    }
    return (
        <div>
            aca full historieta y nada funcional
        </div>
    )
}

