import loadable from '@loadable/component';
import React from 'react';
import {
    Routes,
    Route, 
} from 'react-router-dom';

const Login = loadable(()=>import('@pages/Login')) 
const SignUp = loadable(()=>import('@pages/SignUp')) 

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="SignUp" element={<SignUp />} />
        </Routes>
    )
}