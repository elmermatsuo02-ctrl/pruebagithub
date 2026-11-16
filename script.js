// ============================================================
// NOVA - Inicio de sesión de demostración académica
// IMPORTANTE: las credenciales se comprueban en el navegador.
// Esta simulación es exclusivamente didáctica y NO constituye
// un mecanismo seguro de autenticación para una aplicación real.
// En producción, la autenticación debe realizarse en un servidor.
// ============================================================

// Credenciales ficticias solicitadas para la práctica.
const DEMO_EMAIL = "demo@ejemplo.com";
const DEMO_PASSWORD = "Demo1234!";

// Referencias a los elementos del documento.
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberEmail = document.getElementById("rememberEmail");
const togglePassword = document.getElementById("togglePassword");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formStatus = document.getElementById("formStatus");
const forgotLink = document.getElementById("forgotLink");

const SAVED_EMAIL_KEY = "nova_demo_email";

// Recupera únicamente el correo guardado. Nunca se guarda la contraseña.
const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY);
if (savedEmail) {
  emailInput.value = savedEmail;
  rememberEmail.checked = true;
}

// Expresión regular sencilla para comprobar el formato del correo.
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Muestra un error debajo del campo y marca el input como inválido.
function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

// Valida los campos y devuelve true solamente si ambos son correctos.
function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let isValid = true;

  if (!email) {
    showFieldError(emailInput, emailError, "Ingresa tu correo electrónico.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError(emailInput, emailError, "Escribe un correo con un formato válido.");
    isValid = false;
  } else {
    showFieldError(emailInput, emailError, "");
  }

  if (!password) {
    showFieldError(passwordInput, passwordError, "Ingresa tu contraseña.");
    isValid = false;
  } else if (password.length < 8) {
    showFieldError(passwordInput, passwordError, "La contraseña debe tener al menos 8 caracteres.");
    isValid = false;
  } else {
    showFieldError(passwordInput, passwordError, "");
  }

  return isValid;
}

// Al enviar, se evita la recarga y se ejecutan las validaciones.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!validateForm()) {
    formStatus.textContent = "Revisa los campos señalados antes de continuar.";
    formStatus.classList.add("error");
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // La casilla recuerda solo el correo electrónico.
  if (rememberEmail.checked) {
    localStorage.setItem(SAVED_EMAIL_KEY, email);
  } else {
    localStorage.removeItem(SAVED_EMAIL_KEY);
  }

  // Comprobación local simulada: no usar este método en producción.
  if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    formStatus.textContent = "¡Bienvenido! Has iniciado sesión correctamente.";
    formStatus.classList.add("success");
  } else {
    formStatus.textContent = "Credenciales incorrectas. Verifica tu correo y contraseña.";
    formStatus.classList.add("error");
  }
});

// Muestra u oculta la contraseña sin modificar su contenido.
togglePassword.addEventListener("click", () => {
  const willShow = passwordInput.type === "password";
  passwordInput.type = willShow ? "text" : "password";
  togglePassword.setAttribute("aria-label", willShow ? "Ocultar contraseña" : "Mostrar contraseña");
  togglePassword.setAttribute("aria-pressed", String(willShow));
});

// Limpia el mensaje de error de cada campo mientras el usuario corrige.
emailInput.addEventListener("input", () => {
  showFieldError(emailInput, emailError, "");
  formStatus.textContent = "";
  formStatus.className = "form-status";
});

passwordInput.addEventListener("input", () => {
  showFieldError(passwordInput, passwordError, "");
  formStatus.textContent = "";
  formStatus.className = "form-status";
});

// En esta práctica no existe un servicio real de recuperación de contraseña.
forgotLink.addEventListener("click", (event) => {
  event.preventDefault();
  formStatus.textContent = "La recuperación de contraseña no está habilitada en esta demostración.";
  formStatus.className = "form-status";
  emailInput.focus();
});

// Validacion revisada por Carla
