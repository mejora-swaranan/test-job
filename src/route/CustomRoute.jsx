import React from 'react';
import { Routes, Route } from 'react-router-dom';

export const CustomRoute = ({ path, element }) => {
    return (        
        <Routes>
            <Route path={path} element={element} />;
        </Routes>
    ) 
};
