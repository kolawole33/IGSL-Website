
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("igsl-contact-form");

    if (!form) return;

    const feedback = document.getElementById("contact-form-feedback");

    const fields = [
        {
            id: "contact-name",
            errorId: "name-error",
            message: "Please enter your full name."
        },
        {
            id: "contact-email",
            errorId: "email-error",
            message: "Please enter a valid email address."
        },
        {
            id: "contact-enquiry",
            errorId: "enquiry-error",
            message: "Please select an enquiry type."
        },
        {
            id: "contact-message",
            errorId: "message-error",
            message: "Please enter your message."
        }
    ];

    function showError(field, message) {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        input.setAttribute("aria-invalid", "true");
        error.textContent = message;
    }

    function clearError(field) {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        input.removeAttribute("aria-invalid");
        error.textContent = "";
    }

    fields.forEach((field) => {
        const input = document.getElementById(field.id);

        input.addEventListener("input", () => {
            clearError(field);
            feedback.textContent = "";
            feedback.className = "contact-form-feedback";
        });

        input.addEventListener("change", () => {
            clearError(field);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        feedback.textContent = "";
        feedback.className = "contact-form-feedback";

        let isValid = true;
        let firstInvalidField = null;

        fields.forEach((field) => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();

            let errorMessage = "";

            if (!value) {
                errorMessage = field.message;
            } else if (
                field.id === "contact-email" &&
                !input.validity.valid
            ) {
                errorMessage = "Please enter a valid email address.";
            }

            if (errorMessage) {
                showError(field, errorMessage);
                isValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
            } else {
                clearError(field);
            }
        });

        if (!isValid) {
            feedback.textContent =
                "Please check the highlighted fields and try again.";
            feedback.classList.add("error");

            firstInvalidField.focus();
            return;
        }

        feedback.textContent =
            "Your form has been validated successfully in this browser. " +
            "No message has been sent or saved because this form is not connected to a submission service.";

        feedback.classList.add("success");

        form.reset();
        feedback.focus();
    });
});
