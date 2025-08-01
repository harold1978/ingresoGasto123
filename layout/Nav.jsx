import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../src/assets/favicon-32x32.png'; // Assuming you have a logo image in the assets folder

const Nav = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-2">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={logo} /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ingresos">Ingresos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/gasto">Gastos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categoria">Categorías</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>






    )
}

export default Nav
