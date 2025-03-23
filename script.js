document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".form-step");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const progress = document.getElementById("progress");

    function updateForm() {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
        prevBtn.style.display = currentStep > 0 ? "inline-block" : "none";
        nextBtn.innerText = currentStep === steps.length - 1 ? "Finish" : "Next";
        progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                calculateEmergencyFund();
            }
            currentStep++;
            updateForm();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateForm();
        }
    });

    updateForm(); 
});