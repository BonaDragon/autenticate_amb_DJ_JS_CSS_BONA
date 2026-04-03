document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    const fields = [
        { id: "id_email", message: "El email es obligatorio" },
        { id: "id_password", message: "La contraseña es obligatoria" },
    ];

    // Crear un span de error por campo
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;

        const wrapper = input.closest("p");


        // Crear span vacío
        const errorEl = document.createElement("span");
        errorEl.classList.add("error");
        wrapper.appendChild(errorEl);

        // Validación al salir del input
        input.addEventListener("blur", () => {
            validateNotEmpty(input, errorEl, field.message);
        });
    });

    // Validación al enviar
    form.addEventListener("submit", (e) => {
        let valid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const wrapper = input.closest("p");
            const errorEl = wrapper.querySelector(".error");

            if (!validateNotEmpty(input, errorEl, field.message)) {
                valid = false;
            }
        });

        if (!valid) e.preventDefault();
    });

    function validateNotEmpty(input, errorEl, message) {
        if (!input.value.trim()) {
            errorEl.textContent = message;
            return false;
        }
        errorEl.textContent = "";
        return true;
    }
});
