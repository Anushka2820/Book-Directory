import React from 'react';
import "./inputField.css";

export default class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: (props.locked && props.active) || false,
            value: props.value || "",
            label: props.label || "Label",
            type: props.type || "text",
            maxLength: props.maxLength,
            showPassword: (props.type === "password") ? false : undefined
        };
    }

    changeValue(event) {
        const value = event.target.value;
        this.setState({ value });
    }

    render() {
        const { active, value, label, type, maxLength, showPassword } = this.state;
        const { locked } = this.props;
        let fieldClassName = "field nonActive";

        if (locked ? active : active || value) {
            fieldClassName = "field active";
        }

        if (locked && !active) {
            fieldClassName += " locked";
        }

        return (
            <div >
                <style>@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");</style>
                <div>
                    <div className={fieldClassName}>
                        <input
                            type={(type === "password" && showPassword) ? "text" : type}
                            value={value}
                            placeholder={label}
                            autoComplete="off"
                            onChange={this.changeValue.bind(this)}
                            maxLength={maxLength}
                            onFocus={() => !locked && this.setState({ active: true })}
                            onBlur={() => {
                                !locked && this.setState({ active: false });
                            }}
                        />

                        <label htmlFor={1} className="title" style={{ display: (active || value) ? "block" : "none" }}>
                            {label}
                        </label>
                        <div>
                            <i className={showPassword ? "bi-eye passwordIcon" : "bi bi-eye-slash passwordIcon"}
                                onClick={() => this.setState({ showPassword: !showPassword })}
                                style={{ display: (type === "password") ? "block" : "none" }}>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};