

import './App.css'
import Rutas from '../routing/rutas';
import Header from '../layout/Header';
import Nav from './../layout/Nav';
import Footer from './../layout/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className='container'>


        <Rutas />

        < Footer />
      </div>


    </>
  )
}

export default App
