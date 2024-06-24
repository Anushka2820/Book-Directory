import "./SignIn.css";
import React, { useState } from "react";
import appUtil from "../../util/appUtil.js";
import postData from "../../components/callAPI/callAPI.js";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/inputField.js";

const SignIn = () => {
    const navigate = useNavigate();

    let [stateParams, updateState] = useState({
        Username: "",
        Password: ""
    });

    let [errorMessage, updateErrorMessage] = useState({
        Username: "",
        Password: ""
    });

    function routeToLandingPage() {
        navigate("/", { replace: true });
    }

    async function routeToHomePage() {
        let usernameValidated = appUtil.validateEmail(stateParams.Username, "Username", true);
        let passwordValidated = appUtil.validatePassword(stateParams.Password, "Password", true);
        updateErrorMessage({ Username: usernameValidated, Password: passwordValidated });
        if (!usernameValidated && !passwordValidated) {

            await postData(`${process.env.REACT_APP_BACKEND_HOST}/signin`, "POST", {
                username: stateParams.Username,
                password: stateParams.Password
            }).then(response => {
                console.log(response);
                if (response.data.body.isAuthorizedUser) {
                    navigate("/home", { state: { jwt: response.data.body.authorizationToken } });
                } else {
                    navigate("/asdf", { replace: true });
                }
            }).catch(err => {
                console.log(err);
                navigate("/asdf", { replace: true });
            });
        }
    }

    function updateAndValidateValue(event, validateFunction) {
        updateErrorMessage({ ...errorMessage, [event.target.className]: validateFunction(stateParams[event.target.className], event.target.className) });
    }

    function clearError(event, validateFunction) {
        updateErrorMessage({ ...errorMessage, [event.target.className]: validateFunction("", event.target.className) });
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
                <InputField label="Username"
                    maxLength="20"
                    stateParamDetails={{
                        stateValues: stateParams, stateFunction: updateState, keyName: "Username"
                    }}
                    value={stateParams.Username}
                    errorMessage={errorMessage.Username}
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validateEmail) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} />
                <InputField label="Password"
                    maxLength="20"
                    stateParamDetails={{
                        stateValues: stateParams, stateFunction: updateState, keyName: "Password"
                    }}
                    value={stateParams.Password}
                    errorMessage={errorMessage.Password}
                    onBlurFunction={(event) => { updateAndValidateValue(event, appUtil.validatePassword) }}
                    onChangeFunction={(event) => { clearError(event, appUtil.validateEmail) }} fieldType="password" />
                <div className="SignInMainTabButtons">
                    {button("Sign In", routeToHomePage)}
                    {button("Go To Home", routeToLandingPage)}
                </div>
            </div>
        </div>
    );
};

export default SignIn;