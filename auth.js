// auth.js

function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html?logout=1";
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const message = document.getElementById("message");
  
    // Show logout success
    if (window.location.search.includes("logout=1") && message) {
      message.textContent = "✅ You have been successfully logged out.";
      message.className = "success-message";
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
  
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          window.location.href = "index.html";
        } catch (error) {
          message.textContent = "❌ " + error.message;
          message.className = "error-message";
        }
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const displayName = document.getElementById("signup-name").value.trim();
  
        try {
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
          await userCredential.user.updateProfile({ displayName });
          window.location.href = "index.html";
        } catch (error) {
          message.textContent = "❌ " + error.message;
          message.className = "error-message";
        }
      });
    }
  });
  