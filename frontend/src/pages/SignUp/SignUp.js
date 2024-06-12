import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField/inputField.js';
import React, { useState } from 'react';
import appUtil from '../../util/appUtil.js';

const SignUp = () => {
    const navigate = useNavigate();

    let [stateParams, updateState] = useState({
        ["Email Id"]: "",
        Password: ""
    });

    function routeToLandingPage() {
        navigate("/");
    }

    function routeToHomePage() {
        let usernameValidated = appUtil.validateEmail(stateParams["Email Id"], "Email Id", true);
        let passwordValidated = appUtil.validatePassword(stateParams.Password, "Password", true);
        if (usernameValidated && passwordValidated) {
            navigate("/");
        } else {
            // console.log("a");
        }
    }

    function updateAndValidateValue(event, validateFunction) {
        if (validateFunction) {
            validateFunction(event.target.value, event.target.className);
        }
        updateState({ ...stateParams, [event.target.className]: event.target.value });
    }

    function clearError(event, validateFunction) {
        if (validateFunction) {
            validateFunction("", event.target.className);
        }
        updateState({ ...stateParams, [event.target.className]: event.target.value });
    }

    function button(textValue, onClickFunction) {
        return (
            <button
                onClick={onClickFunction}
                style={{
                    height: "5vh",
                    width: "9vw",
                    // border: "none",
                    borderRadius: "5vh",
                    background: "#1B1340",
                    borderBlockColor: "#000000",
                    color: "#FFFFFF",
                    fontSize: "0.6em",
                    cursor: "pointer"
                }}>
                {textValue}
            </button>
        );
    }

    return (
        <div className="SignUpPage">
            <div className="SignUpLeftTab">
                <div style={{ width: "50vw", textAlign: "center" }}>
                    <p>BOOK DIRECTORY</p>
                </div>
                Sign Up
            </div>
            <div className="SignUpMainTab">
                <InputField label="Name" maxLength="20"
                    onBlurFunction={(event) => { updateAndValidateValue(event) }}
                    onChangeFunction={(event) => { clearError(event) }} />
                <InputField label="Email Id" maxLength="50"
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validateEmail) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} />
                <InputField label="Password" maxLength="20"
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validatePassword) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} type="password" />
                <InputField label="Confirm Password" maxLength="20"
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validatePassword) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} type="password" />
                <div className='SignUpPageButtons'>
                    <div className="GoToHomeButton">
                        {button("Sign Up", routeToHomePage)}
                    </div>
                    <div className="GoToHomeButton">
                        {button("Go To Home", routeToLandingPage)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;