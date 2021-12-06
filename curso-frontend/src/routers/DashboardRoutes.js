import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Inicio } from '../components/ui/InicioScreen';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HospitalesScreen } from '../components/hospitales/HospitalesScreen';
import { HospitalScreen } from '../components/hospitales/HospitalScreen';
import { MedicosScreen } from '../components/medicos/MedicosScreen';
import { MedicoScreen } from '../components/medicos/MedicoScreen';
import { MiCuentaScreen } from '../components/micuenta/MiCuentaScreen';

export const DashboardRoutes = () => {
    /*
    <Route exact path="/marvel" component={ MarvelScreen } />
    <Route exact path="/hero/:heroeId" component={ HeroScreen } />
    <Route exact path="/dc" component={ DcScreen } />
    <Route exact path="/search" component={ SearchScreen } />
    <Redirect to="/marvel" />
    */
    return (
        <>
            <Navbar />

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/" component={HospitalesScreen} />
                    <Route exact path="/listadohospitales" component={HospitalesScreen} />
                    <Route exact path="/hospital/:hospitalId" component={HospitalScreen} />
                    <Route exact path="/listadomedicos" component={MedicosScreen} />
                    <Route exact path="/medico/:medicoId" component={MedicoScreen} />
                    <Route exact path="/micuenta" component={MiCuentaScreen} />
                    <Redirect to="/" />

                </Switch>
            </div>


        </>
    )
}
