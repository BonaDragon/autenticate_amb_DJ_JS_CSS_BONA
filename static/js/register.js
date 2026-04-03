document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Mapeo de inputs y validaciones
    const fields = [
        { id: "id_name", validate: validateNotEmptyName },
        { id: "id_email", validate: validateEmail },
        { id: "id_phone", validate: validateTelefon },
        { id: "id_postal_code", validate: validateCodiPostal },
        { id: "id_dni", validate: validateDNI },
        { id: "id_birth_date", validate: validateDataNaixement },
        { id: "id_password", validate: validatePassword },
    ];

    // Crear spans de error y activar blur
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;

        const wrapper = input.closest("p");

        // Si ya existía un span, lo borramos
        wrapper.querySelectorAll(".error").forEach(e => e.remove());

        // Crear span vacío
        const errorEl = document.createElement("span");
        errorEl.classList.add("error");
        wrapper.appendChild(errorEl);

        // Validación al salir del input
        input.addEventListener("blur", () => {
            field.validate(input, errorEl);
        });
    });

    // Validación al enviar
    form.addEventListener("submit", (e) => {
        let valid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const wrapper = input.closest("p");
            const errorEl = wrapper.querySelector(".error");

            if (!field.validate(input, errorEl)) {
                valid = false;
            }
        });

        if (!valid) e.preventDefault();
    });

    // VALIDACIONES
    function validateEmail(input, errorEl) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim()) {
            errorEl.textContent = "El email es obligatorio";
            return false;
        } else if (!regex.test(input.value)) {
            errorEl.textContent = "Formato incorrecto (usuario@dominio.cat)";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateTelefon(input, errorEl) {
        const regex = /^[6-9]\d{8}$/;
        if (!input.value.trim()) {
            errorEl.textContent = "El teléfono es obligatorio";
            return false;
        } else if (!regex.test(input.value)) {
            errorEl.textContent = "Formato incorrecto (9 dígitos, empieza 6-9)";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateCodiPostal(input, errorEl) {
        const regex = /^\d{5}$/;
        if (!input.value.trim()) {
            errorEl.textContent = "El código postal es obligatorio";
            return false;
        } else if (!regex.test(input.value)) {
            errorEl.textContent = "Formato incorrecto (5 dígitos)";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateDNI(input, errorEl) {
        const value = input.value.trim();
        const regexDNI = /^\d{8}[A-Z]$/;
        const regexNIE = /^[XZ]\d{7}[A-Z]$/;
        const regexPassaport = /^[A-Z]{3}\d{6}$/;

        if (!value) {
            errorEl.textContent = "Este campo es obligatorio";
            return false;
        } else if (!(regexDNI.test(value) || regexNIE.test(value) || regexPassaport.test(value))) {
            errorEl.textContent = "Formato incorrecto (DNI, NIE o Passaport en mayúsculas)";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateDataNaixement(input, errorEl) {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!input.value.trim()) {
            errorEl.textContent = "La fecha de nacimiento es obligatoria";
            return false;
        } else if (!regex.test(input.value)) {
            errorEl.textContent = "Formato incorrecto (yyyy-mm-dd)";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validatePassword(input, errorEl) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!input.value.trim()) {
            errorEl.textContent = "La contraseña es obligatoria";
            return false;
        } else if (!regex.test(input.value)) {
            errorEl.textContent = "Debe tener 8-20 caracteres, 1 mayúscula, 1 número y 1 especial";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateNotEmptyName(input, errorEl) {
    if (!input.value.trim()) {
        errorEl.textContent = "El nombre es obligatorio";
        return false;
    }
    errorEl.textContent = "";
    return true;
}

});

