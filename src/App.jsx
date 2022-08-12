//import css
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/app.css'
//import hooks
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
//import components
import Navbar from './components/navbar'
//import pages
import Home from './pages/home'
import Painting from './pages/painting'
import Mug from './pages/shirt'
import Funko from './pages/shirt'
import Cushion from './pages/shirt'
import Shirt from './pages/shirt'
//firebase

function App() {

    return (
        <div className="App d-flex justify-content-center">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/painting" element={<Painting />} />
                    <Route path="/mug" element={<Mug />} />
                    <Route path="/funko" element={<Funko />} />
                    <Route path="/cushion" element={<Cushion />} />
                    <Route path="/shirt" element={<Shirt />} />
                </Routes>
                <Navbar />
            </BrowserRouter>
        </div>
    )
}

export default App
