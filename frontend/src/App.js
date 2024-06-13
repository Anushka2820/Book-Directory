import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import NoPage from "./pages/NoPage/NoPage.js";
import SignIn from "./pages/SignIn/SignIn.js";
import SignUp from "./pages/SignUp/SignUp.js";
import HomePage from "./pages/HomePage/HomePage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<NoPage />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
