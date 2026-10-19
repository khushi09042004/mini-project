
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!registerForm.reportValidity()) return;

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const message = document.getElementById("registerMessage");

      try {
        localStorage.setItem("shopProfile", JSON.stringify({ name, email }));

        message.className = "alert alert-success mt-3";
        message.textContent =
          "Registration successful! You can now try the login page.";

        registerForm.reset();
      } catch {
        message.className = "alert alert-danger mt-3";
        message.textContent = "Unable to save the  profile.";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;

      const email = document.getElementById("loginEmail").value.trim();
      const message = document.getElementById("loginMessage");

      try {
        const profile = JSON.parse(
          localStorage.getItem("shopProfile") || "null"
        );

        if (profile && profile.email.toLowerCase() === email.toLowerCase()) {
          message.className = "alert alert-success mt-3";
          message.textContent =
            `Welcome, ${profile.name}!  login successful.`;
        } else {
          message.className = "alert alert-warning mt-3";
          message.textContent =
            " Profile not found. Please register first.";
        }
      } catch {
        message.className = "alert alert-danger mt-3";
        message.textContent = "Unable to read the profile.";
      }

      loginForm.reset();
    });
  }
});
