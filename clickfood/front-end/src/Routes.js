import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes'

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/restaurantes" element={<Restaurantes />} />
            
            <Route path="/sobre" element={<h1>Sobre</h1>} />
        </Routes>
    );
};