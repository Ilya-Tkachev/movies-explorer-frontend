class InputValidator {
    _inputInvalidClass = 'input-error';

    validate (input) {
        if (input.validity.valid) {
            this._hideError(input);
            return true;
        } else {
            this._showError(input);
            return false;
        }
    }
    
    _showError(input) {
        input.classList.add(this._inputInvalidClass);
        const error = document.getElementById(`${input.id}-error`);
        error.textContent = input.validationMessage;
    };
    
    _hideError(input) {
        input.classList.remove(this._inputInvalidClass);
        const error = document.getElementById(`${input.id}-error`);
        error.textContent = "";
    };
}

const inputValidator = new InputValidator();

export default inputValidator;