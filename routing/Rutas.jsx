import React from 'react'
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import RegistroIngreso from '../src/components/registringreso'
import RegistroGasto from '../src/components/registrogasto'
import ListaIngresos from './../src/components/listaingresos';
import Nav from '../layout/Nav';


export default function rutas() {
    return (
        <BrowserRouter>

            <section>
                <Nav />
                <Routes>

                    <Route path="/" element={<div className='text-center'><h1>Bienvenido a la Aplicación</h1></div>} />
                    {/* {nav} */}
                    <Route path="/ingresos" element={<RegistroIngreso />} />
                    <Route path="/lista-ingresos" element={<ListaIngresos />} />
                    <Route path="/gasto" element={<RegistroGasto />} />
                    <Route path="/categoria" element={<h2>Administración de Categorías</h2>} />
                    {/* {footer} */}
                </Routes>

            </section>
            {/* {footer} */}

        </BrowserRouter>
    )
}


