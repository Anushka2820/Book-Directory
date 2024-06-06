import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField/inputField.js';
// import InputTest from '../../components/inputTest/inputTest.js';
import React from 'react';

const SignIn = () => {
    const navigate = useNavigate();
    function routeToHome() {
        navigate("/");
    }

    function button(textValue, onClickFunction) {
        return (
            <button
                onClick={onClickFunction}
                style={{
                    height: "5vh",
                    width: "9vw",
                    borderRadius: "5vh",
                    background: "#1B1340",
                    borderBlockColor: "#1B1340",
                    color: "#FFFFFF",
                    fontSize: "0.6em",
                    cursor: "pointer"
                }}>
                {textValue}
            </button>
        );
    }

    return (
        <div className="SignInPage">
            <div className="SignInLeftTab">
                <div style={{ width: "50vw", textAlign: "center" }}>
                    <p>BOOK DIRECTORY</p>
                </div>
                Sign In
            </div>
            <div className="SignInMainTab">
                <InputField label="Username" maxLength="20" />
                <InputField label="Password" type="password" maxLength="20" />
                <div className="SignInMainTabButtons">
                    {button("Sign In", routeToHome)}
                    {button("Go To Home", routeToHome)}
                </div>
            </div>
        </div>
    );
};

export default SignIn;