import React from 'react';
import "./inputField.css";

export default class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: (props.locked && props.active) || false,
            value: props.value || "",
            error: props.error || "",
            label: props.label || "Label",
            type: props.type || "text",
            maxLength: props.maxLength,
            showPassword: (props.type === "password") ? false : undefined
        };
    }

    changeValue(event) {
        const value = event.target.value;
        this.setState({ value, error: "" });
    }

    handleKeyPress(event) {
        if (event.which === 13) {
            this.setState({ value: this.props.predicted });
        }
    }

    render() {
        const { active, value, error, label, type, maxLength, showPassword } = this.state;
        const { predicted, locked } = this.props;
        const fieldClassName = `field ${(locked ? active : active || value) &&
            "active"} ${locked && !active && "locked"}`;

        return (
            <div className={fieldClassName}>
                <style>@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");</style>
                {active &&
                    value &&
                    predicted &&
                    predicted.includes(value) && <p className="predicted">{predicted}</p>}
                <div>
                    <div>
                        <input
                            type={(type === "password" && showPassword) ? "text" : type}
                            value={value}
                            placeholder={label}
                            autoComplete="off"
                            onChange={this.changeValue.bind(this)}
                            maxLength={maxLength}
                            onFocus={() => !locked && this.setState({ active: true })}
                            onBlur={() => !locked && this.setState({ active: false })}
                        />

                        <label htmlFor={1} className={error && "error"}>
                            {error || label}
                        </label>
                    </div>
                    <div style={{ display: (type === "password") ? "block" : "none" }}>
                        <i className={showPassword ? "bi-eye passwordIcon" : "bi bi-eye-slash passwordIcon"}
                            onClick={() => this.setState({ showPassword: !showPassword })}>
                        </i>
                    </div>
                </div>
            </div>
        );
    };
};