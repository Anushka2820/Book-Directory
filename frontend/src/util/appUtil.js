module.exports = {
    showInputFieldError: (fieldName, errorMessage) => {
        document.getElementById(`${fieldName}Error`).style.display = "flex";
        document.getElementById(`${fieldName}ErrorMsg`).innerHTML = errorMessage;
        document.getElementById(`${fieldName}Component`).style.marginBottom = "1vh";
    },
    hideInputFieldError: (fieldName) => {
        document.getElementById(`${fieldName}Error`).style.display = "none";
        document.getElementById(`${fieldName}Component`).style.marginBottom = "2vh";
    },
    validateEmail: function (fieldValue, fieldName, submitAction) {
        let validField = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue);
        if (!validField && (fieldValue || submitAction)) {
            module.exports.showInputFieldError(fieldName, `Invalid ${fieldName}`);
        } else {
            module.exports.hideInputFieldError(fieldName);
        }
        return validField;
    },
    validatePassword: function (fieldValue, fieldName, submitAction) {
        let validField = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(fieldValue);
        if (!validField && (fieldValue || submitAction)) {
            module.exports.showInputFieldError(fieldName, `Invalid ${fieldName}`);
        } else {
            module.exports.hideInputFieldError(fieldName);
        }
        return validField;
    }
}