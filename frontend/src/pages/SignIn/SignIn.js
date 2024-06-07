import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField/inputField.js';
import React, { useState } from 'react';
import appUtil from '../../util/appUtil.js';

const SignIn = () => {
    const navigate = useNavigate();

    let [stateParams, updateState] = useState({
        Username: "",
        Password: ""
    });

    function routeToLandingPage() {
        navigate("/");
    }

    function routeToHomePage() {
        let usernameValidated = appUtil.validateEmail(stateParams.Username, "Username", true);
        let passwordValidated = appUtil.validatePassword(stateParams.Password, "Password", true);
        if (usernameValidated && passwordValidated) {
            navigate("/");
        } else {
            // console.log("a");
        }
    }

    function updateAndValidateValue(event, validateFunction) {
        validateFunction(event.target.value, event.target.className);
        updateState({ ...stateParams, [event.target.className]: event.target.value });
    }

    function clearError(event, validateFunction) {
        validateFunction("", event.target.className);
        updateState({ ...stateParams, [event.target.className]: event.target.value });
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
                <InputField label="Username" maxLength="20"
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validateEmail) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} />
                <InputField label="Password" maxLength="20"
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validatePassword) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} type="password" />
                <div className="SignInMainTabButtons">
                    {button("Sign In", routeToHomePage)}
                    {button("Go To Home", routeToLandingPage)}
                </div>
            </div>
        </div>
    );
};

export default SignIn;