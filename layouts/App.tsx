import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(()=>import('@pages/Login')) 
const SignUp = loadable(()=>import('@pages/SignUp')) 

export default function App() {
    return (
        <Routes>
            <Route path="/" element="/login"/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}