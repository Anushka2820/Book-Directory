import React, { useState, useRef } from "react";
import "./inputField.css";

const InputField = ({ label, fieldType, maxLength, locked, value, errorMessage, stateParamDetails, className, width, placeholder, predictedValues, spellCheck, showCancel, onBlurFunction, onChangeFunction, onSearchFunction }) => {

    predictedValues = Array.isArray(predictedValues) ? [...new Set(predictedValues.filter(eachRes => eachRes))] : [];

    let [stateParams, updateState] = useState({
        active: locked || false,
        showPassword: (fieldType === "password") ? false : undefined,
        value: value || "",
        predictedValues
    });

    width = width || "20vw";
    label = label || "Label";
    className = className || label;
    spellCheck = spellCheck || false;
    placeholder = placeholder || label;

    let type = ["password"].includes(fieldType) ? fieldType : "text";

    function changeValue(event, className) {
        let fieldValue = event.target.value;
        let updatedPredictedValues = predictedValues.filter(eachPredictedValues => eachPredictedValues.toLowerCase().startsWith(fieldValue.toLowerCase()));
        updateState({ ...stateParams, value: fieldValue, predictedValues: updatedPredictedValues });
        if (stateParamDetails?.stateFunction)
            if (stateParamDetails.keyName) {
                stateParamDetails.stateFunction({ ...stateParamDetails.stateValues, [label]: fieldValue });
            } else {
                stateParamDetails.stateFunction(fieldValue);
            }
        if (onChangeFunction)
            onChangeFunction(event, className);
    }

    function blurInput(event) {
        if (!locked) {
            updateState({ ...stateParams, active: false });
            if (onBlurFunction)
                onBlurFunction(event);
        }
    }

    function searchIconClick(event) {
        updateState({ ...stateParams, active: false });
        onSearchFunction(event)
    }

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
        return [htmlElRef, setFocus]
    }

    const [inputRef, setInputFocus] = useFocus();

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
                @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
                @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
            </style>
            <div>
                <div id={className + "Component"} className={fieldClassName} style={{ marginBottom: errorMessage ? "1vh" : "2vh", width: width }}>
                    <input
                        type={(type === "password" && stateParams.showPassword) ? "text" : type}
                        value={stateParams.value}
                        placeholder={placeholder}
                        autoComplete="off"
                        onChange={changeValue}
                        maxLength={maxLength}
                        onFocus={() => !locked && updateState({ ...stateParams, active: true })}
                        onBlur={blurInput}
                        size={maxLength}
                        className={className}
                        ref={inputRef}
                        spellCheck={spellCheck}
                    />

                    <label htmlFor={1} className="title" style={{ display: (stateParams.active || stateParams.value) ? "block" : "none", transition: "5s" }}>
                        {label}
                    </label>
                    <div>
                        <i className={stateParams.showPassword ? "bi-eye passwordIcon" : "bi bi-eye-slash passwordIcon"}
                            onClick={() => updateState({ ...stateParams, showPassword: !stateParams.showPassword })}
                            style={{ display: (fieldType === "password") ? "block" : "none" }}>
                        </i>
                        <i className="bi bi-search searchIcon"
                            onClick={searchIconClick}
                            style={{ display: (fieldType === "search") ? "block" : "none" }}>
                        </i>
                        <i className="bi bi-x-lg cancelIcon"
                            onClick={(event) => {
                                event.target.value = "";
                                stateParams.active = true;
                                setInputFocus(event);
                                changeValue(event, className);
                            }}
                            style={{ display: (showCancel && stateParams.value) ? "block" : "none", right: (fieldType === "search") || (fieldType === "password") ? "3vw" : "1vw" }}>
                        </i>
                    </div>
                    <div className="predictedValues" style={{ display: stateParams.predictedValues.length > 0 && stateParams.value ? "flex" : "none", flexDirection: "column" }}>
                        {stateParams.predictedValues.map(eachPredictedValues => {
                            return (
                                <div key={eachPredictedValues} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={(event => {
                                    setInputFocus(event);
                                    event.target.value = eachPredictedValues;
                                    changeValue(event, className);
                                    updateState({ ...stateParams, active: true, value: eachPredictedValues, predictedValues: [] });
                                })} className="predictedDropDown">{eachPredictedValues}</div>
                            )
                        })}
                    </div>
                </div>
                <div id={className + "Error"} className="error"
                    style={{ display: errorMessage ? "flex" : "none", marginBottom: "2vh" }}>
                    <div><i className="material-icons" style={{ fontSize: "1.8vh", marginRight: "0.5vw" }}>&#xe001;</i></div>
                    <div id={className + "ErrorMsg"}>{errorMessage}</div>
                </div>
            </div>
        </div>
    );
};

export default InputField;
