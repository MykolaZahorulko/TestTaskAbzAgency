// Function add and remove error class from span on email input for valid effect
export function checkingEmailValid(emailInput, emailSpan) {
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() === '') {
            emailSpan.classList.remove('error');
        } else {
            emailSpan.classList.add('error');
        }
    })
}