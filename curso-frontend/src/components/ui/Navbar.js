import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {

    return (





        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link
                className="navbar-brand"
                to="/"
            >
                Medic.Net
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/listadohospitales"
                    >
                        Hospitales
                    </NavLink>

                    </li>
                    <li className="nav-item">
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/listadomedicos"
                    >
                        Medicos
                    </NavLink>
                    </li>
                </ul>
                
                <ul className="navbar-nav ml-auto">
                <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/micuenta"
                    >
                        Mi cuenta
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/login"
                    >
                        Desconectarse
                    </NavLink>
                    </ul>
            </div>
        </nav>




    )

}



