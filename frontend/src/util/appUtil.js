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
        let isValidField = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue);
        if (!isValidField && (fieldValue || submitAction)) {
            module.exports.showInputFieldError(fieldName, `Invalid ${fieldName}`);
        } else {
            module.exports.hideInputFieldError(fieldName);
        }
        return isValidField;
    },
    validatePassword: function (fieldValue, fieldName, submitAction) {
        let isValidField = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`.~+!@#$%^&*)(_={}[\]|\\:";'<>,/-?])[A-Za-z\d`.~+!@#$%^&*)(_={}[\]|\\:";'<>,/-?]{8,}$/.test(fieldValue);
        if (!isValidField && (fieldValue || submitAction)) {
            module.exports.showInputFieldError(fieldName, `Invalid ${fieldName}`);
        } else {
            module.exports.hideInputFieldError(fieldName);
        }
        return isValidField;
    }
}
