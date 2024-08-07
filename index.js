const submitButton = document.getElementById("submit");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const eyePassword = document.getElementById("password-eye");
const confirmPasswordEye = document.getElementById("confirm-password-eye");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const agreeError = document.getElementById("agree-error");

const errorStyle = "red";
nameError.style.color = errorStyle;
emailError.style.color = errorStyle;
passwordError.style.color = errorStyle;
confirmPasswordError.style.color = errorStyle;
agreeError.style.color = errorStyle;

eyePassword.addEventListener("click", () =>
  togglePasswordVisibility(passwordField, eyePassword)
);
confirmPasswordEye.addEventListener("click", () =>
  togglePasswordVisibility(confirmPasswordField, confirmPasswordEye)
);

emailField.addEventListener("input", () => validateEmail(emailField.value));
passwordField.addEventListener("input", () =>
  validatePassword(passwordField.value)
);
confirmPasswordField.addEventListener("input", () =>
  validateConfirmPassword(passwordField.value, confirmPasswordField.value)
);
submitButton.addEventListener("click", validateForm);

function togglePasswordVisibility(input, icon) {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  icon.className = isPassword ? "uil uil-eye-slash icon" : "uil uil-eye icon";
}

function validatePassword(password) {
  const validations = [
    {
      test: password.length >= 8,
      message: "* password must be at least 8 characters",
    },
    {
      test: password.length <= 16,
      message: "* password must not exceed 16 characters",
    },
    {
      test: /\d/.test(password),
      message: "* password must contain at least one digit",
    },
    {
      test: /[A-Z]/.test(password),
      message: "* password must contain at least one uppercase letter",
    },
    {
      test: /[a-z]/.test(password),
      message: "* password must contain at least one lowercase letter",
    },
    {
      test: /[!@#$%^&*]/.test(password),
      message: "* password must contain at least one special character",
    },
  ];

  passwordError.textContent = validations.find((v) => !v.test)?.message || "";
}

function validateConfirmPassword(password, confirmPassword) {
  confirmPasswordError.textContent =
    password === confirmPassword ? "" : "* password does not match";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.textContent = emailRegex.test(email) ? "" : "* please enter a valid email address"
}

function validateForm(event) {
  const name = document.getElementById("name").value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const confirmPassword = confirmPasswordField.value.trim();
  const agreeCheckBox = document.getElementById("agree").checked;
  console.log(agreeCheckBox);

  nameError.textContent = name === "" ? "* please enter a valid name" : "";
  emailError.textContent = email === "" ? "* please enter a valid email" : "";
  passwordError.textContent =
    password === "" ? "* please enter password" : passwordError.textContent;

  agreeError.textContent =
    agreeCheckBox === false
      ? "* you must agree to all terms and conditions"
      : "";

  validateConfirmPassword(password, confirmPassword);

  if (
    name &&
    email &&
    password &&
    confirmPassword === password &&
    agreeCheckBox
  ) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }
}
