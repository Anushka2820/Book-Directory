import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField/inputField.js';
import React from 'react';

const SignIn = () => {
    const navigate = useNavigate();
    function routeToHome() {
        navigate("/");
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
                <br />
                <InputField label="Password" type="password" maxLength="20" />
                <br />
                <div className="SignInMainTabButtons">
                    <div>
                        <button onClick={routeToHome} style={{
                            height: "5vh",
                            width: "8vw",
                            borderRadius: "5vh",
                            background: "#1B1340",
                            borderBlockColor: "#1B1340",
                            color: "#FFFFFF",
                            fontSize: "60%",
                            cursor: "pointer",
                            marginRight: "2vw"
                        }}>Sign In</button>
                    </div>
                    <div>
                        <button onClick={routeToHome} style={{
                            height: "5vh",
                            width: "8vw",
                            borderRadius: "5vh",
                            background: "#1B1340",
                            borderBlockColor: "#1B1340",
                            color: "#FFFFFF",
                            fontSize: "60%",
                            cursor: "pointer",
                            marginLeft: "2vw"
                        }}>Go To Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;