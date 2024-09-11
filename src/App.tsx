import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboards  from './Componentes/dashboard'
import Categorias from './Componentes/categoria'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboards />}>
        <Route path="/categoria" element={<Categorias />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
