document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let income = parseFloat(document.getElementById('income').value);
    let expenses = parseFloat(document.getElementById('expenses').value);
    
    if (income > 0 && expenses > 0) {
        let emergencyFund = expenses * 3; // 3 months of expenses
        document.getElementById('result').innerHTML = 
            `<h3>You should aim for at least $${emergencyFund} in savings.</h3>`;
    } else {
        document.getElementById('result').innerHTML = `<h3>Please enter valid numbers.</h3>`;
    }
});
