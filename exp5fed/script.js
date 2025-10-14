const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent reload
  validateForm();
});

function validateForm() {
  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Full name is required");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  // Password validation
  if (passwordInput.value.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phoneInput.value.trim())) {
    showError(phoneInput, "Enter a valid 10-digit phone number");
    isValid = false;
  } else {
    showSuccess(phoneInput);
  }

  // Final output
  if (isValid) {
    successMessage.textContent = "✅ Registration Successful!";
    form.reset();
    clearBorders();
  } else {
    successMessage.textContent = "";
  }
}

// Utility functions
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorText = formGroup.querySelector(".error");
  errorText.textContent = message;
  input.style.borderColor = "red";
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorText = formGroup.querySelector(".error");
  errorText.textContent = "";
  input.style.borderColor = "green";
}

function clearBorders() {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => (input.style.borderColor = "#ccc"));
}
