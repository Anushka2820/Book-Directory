const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-`.~+!@#$%^&*)(_={}[\]|\\:";'<>,/?])(?=.*\d)[A-Za-z\d\-`.~+!@#$%^&*)(_={}[\]|\\:";'<>,/?]{8,}$/;

module.exports = {
    validateEmail: function (fieldValue, fieldName, submitAction) {
        let isValidField = emailRegex.test(fieldValue);
        if (!isValidField && (fieldValue || submitAction)) {
            return `Invalid ${fieldName}`;
        } else {
            return;
        }
    },
    validatePassword: function (fieldValue, fieldName, submitAction) {
        let isValidField = passwordRegex.test(fieldValue);
        if (!isValidField && (fieldValue || submitAction)) {
            return `Invalid ${fieldName}`;
        } else {
            return;
        }
    }
}
