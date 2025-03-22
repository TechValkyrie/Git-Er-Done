function calculateEmergencyFund() {
    let rent = parseFloat(document.getElementById("rent").value) || 0;
    let food = parseFloat(document.getElementById("food").value) || 0;
    let transport = parseFloat(document.getElementById("transport").value) || 0;
    let other = parseFloat(document.getElementById("other").value) || 0;
    let income = parseFloat(document.getElementById("income").value) || 0;
    let investment_time = parseInt(document.getElementById("investment_time").value) || 6;

    let jobStability = document.getElementById("job-stability").value;
    let dependents = document.getElementById("dependents").value;

    // Set duration based on job stability and dependents
    let duration = (jobStability === "weak" || dependents === "yes") ? 6 : 3;

    let totalMonthlyExpenses = rent + food + transport + other;
    let emergencyFundNeeded = totalMonthlyExpenses * duration;
    let monthlySavingsRequired = emergencyFundNeeded / investment_time;

    // Check if expenses exceed income
    let message = "";
    if (totalMonthlyExpenses > income) {
        message = `<p style="color: red; font-weight: bold;">⚠️ Your expenses exceed your income! You need to get a higher-paying job.</p>`;
    }

    document.getElementById("summary-text").innerHTML = `
        Your total monthly expenses are <b>$${totalMonthlyExpenses.toFixed(2)}</b>.<br>
        You should save at least <b>$${emergencyFundNeeded.toFixed(2)}</b> for emergencies over <b>${investment_time}</b> months.<br>
        To reach this goal, save <b>$${monthlySavingsRequired.toFixed(2)}</b> per month.<br>
        ${message}
    `;

    renderChart(rent, food, transport, other, income);
}