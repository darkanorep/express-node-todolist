import { Routes, Route } from 'react-router-dom';
import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";

export default function Router() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
}