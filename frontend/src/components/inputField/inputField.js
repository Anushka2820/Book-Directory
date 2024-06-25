import "./inputField.css";
import React, { useState, useRef } from "react";

const InputField = ({
    label,
    className,
    placeholder,
    fieldType,
    maxLength,
    locked,
    width,
    spellCheck,
    showCancel,
    predictedValues,
    value,
    errorMessage,
    stateParamDetails,
    onBlurFunction,
    onChangeFunction,
    onSearchFunction
}) => {

    predictedValues = Array.isArray(predictedValues) ? [...new Set(predictedValues.filter(eachRes => eachRes))] : [];

    let [stateParams, updateState] = useState({
        active: locked || false,
        showPassword: (fieldType === "password") ? false : undefined,
        predictedValues
    });

    width = width || 20;
    label = label || "Label";
    className = className || label;
    spellCheck = spellCheck || false;
    placeholder = placeholder || label;

    let type = ["password"].includes(fieldType) ? fieldType : "text";

    function changeValue(event, className) {
        let fieldValue = event.target.value;
        let updatedPredictedValues = predictedValues.filter(eachPredictedValues => eachPredictedValues.toLowerCase().startsWith(fieldValue.toLowerCase()));
        updateState({ ...stateParams, predictedValues: updatedPredictedValues });

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

    let fieldClassName = "inputField nonActive";

    if (locked ? stateParams.active : stateParams.active || value) {
        fieldClassName = "inputField active";
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
                <div id={className + "Component"} className={fieldClassName} style={{ marginBottom: errorMessage ? "1vh" : "2vh", width: width + "vw" }}>
                    <input
                        type={(type === "password" && stateParams.showPassword) ? "text" : type}
                        value={value}
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

                    <label htmlFor={1} className="title" style={{ display: (stateParams.active || value) ? "block" : "none" }}>
                        {label}
                    </label>
                    <div>
                        <i className={stateParams.showPassword ? "bi-eye passwordIcon" : "bi bi-eye-slash inputFieldPasswordIcon"}
                            onClick={() => updateState({ ...stateParams, showPassword: !stateParams.showPassword })}
                            style={{ display: (fieldType === "password") ? "block" : "none" }}>
                        </i>
                        <i className="bi bi-search inputFieldSearchIcon"
                            onClick={searchIconClick}
                            style={{ display: (fieldType === "search") ? "block" : "none" }}>
                        </i>
                        <i className="bi bi-x-lg inputFieldCancelIcon"
                            onClick={(event) => {
                                event.target.value = "";
                                stateParams.active = true;
                                setInputFocus(event);
                                changeValue(event, className);
                            }}
                            style={{ display: (showCancel && value) ? "block" : "none", right: (fieldType === "search") || (fieldType === "password") ? "3vw" : "1vw" }}>
                        </i>
                    </div>
                    <div className="inputFieldPredictedValues" style={{ display: stateParams.predictedValues.length > 0 && value ? "flex" : "none", flexDirection: "column", width: width - 3 + "vw" }}>
                        {stateParams.predictedValues.map(eachPredictedValues => {
                            return (
                                <div key={eachPredictedValues} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} onClick={(event => {
                                    setInputFocus(event);
                                    event.target.value = eachPredictedValues;
                                    value = eachPredictedValues;
                                    changeValue(event, className);
                                    updateState({ ...stateParams, active: true, predictedValues: [] });
                                })} className="inputFieldPredictedDropDown">{eachPredictedValues}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="inputFieldError"
                    style={{ display: errorMessage ? "flex" : "none", marginBottom: "2vh" }}>
                    <i className="material-icons" style={{ fontSize: "1.8vh", marginRight: "0.5vw" }}>&#xe001;</i>{errorMessage}
                </div>
            </div>
        </div>
    );
};

export default InputField;
