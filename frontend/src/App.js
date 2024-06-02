import React from 'react';
import Home from "./pages/Home/Home";
import NoPage from "./pages/NoPage/NoPage";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NoPage />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
