import React, { useState } from "react";
import "./inputField.css";

const InputField = ({ label, type, maxLength, locked, value, className, onBlurFunction, onChangeFunction }) => {

    let [stateParams, updateState] = useState({
        active: locked || false,
        value: value || "",
        label: label || "Label",
        type: type || "text",
        maxLength: maxLength,
        showPassword: (type === "password") ? false : undefined,
        className: className || label || "Label"
    });

    function changeValue(event) {
        const value = event.target.value;
        updateState({ ...stateParams, value });
        onChangeFunction(event);
    }

    function blurInput(event) {
        if (onBlurFunction && !stateParams.locked) {
            updateState({ ...stateParams, active: false });
            onBlurFunction(event);
        } else {
            !stateParams.locked && updateState({ ...stateParams, active: false });
        }
    }

    let fieldClassName = "field nonActive";

    if (locked ? stateParams.active : stateParams.active || stateParams.value) {
        fieldClassName = "field active";
    }

    if (locked && !stateParams.active) {
        fieldClassName += " locked";
    }

    return (
        <div >
            <style>
                @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
                @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
            </style>
            <div>
                <div id={stateParams.className + "Component"} className={fieldClassName} style={{ marginBottom: "2vh" }}>
                    <input
                        type={(stateParams.type === "password" && stateParams.showPassword) ? "text" : stateParams.type}
                        value={stateParams.value}
                        placeholder={stateParams.label}
                        autoComplete="off"
                        onChange={changeValue}
                        maxLength={stateParams.maxLength}
                        onFocus={() => !locked && updateState({ ...stateParams, active: true })}
                        onBlur={blurInput}
                        className={stateParams.className}
                    />

                    <label htmlFor={1} className="title" style={{ display: (stateParams.active || stateParams.value) ? "block" : "none" }}>
                        {stateParams.label}
                    </label>
                    <div>
                        <i className={stateParams.showPassword ? "bi-eye passwordIcon" : "bi bi-eye-slash passwordIcon"}
                            onClick={() => updateState({ ...stateParams, showPassword: !stateParams.showPassword })}
                            style={{ display: (stateParams.type === "password") ? "block" : "none" }}>
                        </i>
                    </div>
                </div>
                <div id={stateParams.className + "Error"} className="error"
                    style={{ display: "none", marginBottom: "2vh" }}>
                    <div><i className="material-icons" style={{ fontSize: "1.8vh", marginRight: "0.5vw" }}>&#xe001;</i></div>
                    <div id={stateParams.className + "ErrorMsg"}></div>
                </div>
            </div>
        </div>
    );
};

export default InputField;
