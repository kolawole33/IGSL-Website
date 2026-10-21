
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("igsl-careers-form");

    if (!form) return;

    const cvInput = document.getElementById("igsl-applicant-cv");
    const cvFilename = document.getElementById("igsl-cv-filename");
    const status = document.getElementById("igsl-form-status");
    const submitButton = document.getElementById("igsl-form-submit");

    const maxFileSize = 5 * 1024 * 1024;
    const allowedExtensions = ["pdf", "doc", "docx"];

    function showStatus(message, type) {
        status.textContent = message;
        status.className = "igsl-form-status " + type;
    }

    function validateCV(file) {
        const extension = file.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            return "Please upload your CV as a PDF, DOC or DOCX file.";
        }

        if (file.size > maxFileSize) {
            return "Your CV is larger than 5 MB. Please choose a smaller file.";
        }

        return "";
    }

    cvInput.addEventListener("change", () => {
        status.textContent = "";
        status.className = "igsl-form-status";

        const file = cvInput.files[0];

        if (!file) {
            cvFilename.textContent = "No file selected.";
            return;
        }

        const error = validateCV(file);

        if (error) {
            cvInput.value = "";
            cvFilename.textContent = "No file selected.";
            showStatus(error, "error");
            return;
        }

        cvFilename.textContent = "Selected file: " + file.name;
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "";
        status.className = "igsl-form-status";

        if (!form.reportValidity()) return;

        const file = cvInput.files[0];

        if (!file) {
            showStatus("Please upload your CV before submitting.", "error");
            return;
        }

        const fileError = validateCV(file);

        if (fileError) {
            showStatus(fileError, "error");
            return;
        }

        const endpoint = form.getAttribute("action");

        if (
            !endpoint ||
            endpoint.includes("YOUR_FORMSPREE_FORM_ID")
        ) {
            showStatus(
                "The application form has not been connected yet. Please configure the form submission service.",
                "error"
            );
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                let message =
                    "Your application could not be submitted. Please try again.";

                try {
                    const result = await response.json();

                    if (result.errors && result.errors.length > 0) {
                        message = result.errors
                            .map(error => error.message)
                            .join(" ");
                    }
                } catch (_) {
                    // Use the default error message.
                }

                showStatus(message, "error");
                return;
            }

            form.reset();
            cvFilename.textContent = "No file selected.";

            showStatus(
                "Thank you. Your application has been submitted successfully.",
                "success"
            );
        } catch (error) {
            showStatus(
                "A connection error occurred. Please check your internet connection and try again.",
                "error"
            );
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML =
                'Submit Application <span aria-hidden="true">→</span>';
        }
    });
});
