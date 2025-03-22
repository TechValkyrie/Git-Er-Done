document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".form-step");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const progress = document.getElementById("progress");

    steps.forEach(step => {
        step.style.position = "absolute";
        step.style.width = "100%";
        step.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
    });

    function updateForm() {
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.style.transform = "translateX(0)";
                step.style.opacity = "1";
            } else {
                step.style.transform = `translateX(${index < currentStep ? "-100%" : "100%"})`;
                step.style.opacity = "0";
            }
        });
        prevBtn.style.display = currentStep > 0 ? "inline-block" : "none";
        nextBtn.innerText = currentStep === steps.length - 1 ? "Finish" : "Next";
        progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
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
