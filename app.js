// Variables
const calcButton = document.querySelector('#loan-form');
const loader = document.querySelector('#loading');
const results = document.querySelector('#results');

// Show loader 


// Listen on "Calculate" button
calcButton.addEventListener('submit', function(e) {
    results.style.display = "none";
    loader.style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults() { 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 12 / 100;
    const calculatedPayments = 12 * parseFloat(years.value);

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * calculatedInterest * x) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value =((monthly * calculatedPayments) - principal).toFixed(2);
        results.style.display = "block";
        loader.style.display = "none";
    } else {
        showError('Please check your numbers');
        loader.style.display = "none";
    }
}

function showError(error) {
    // Create div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    const errorDiv = document.querySelector('.alert-danger');
    errorDiv.remove();
}
