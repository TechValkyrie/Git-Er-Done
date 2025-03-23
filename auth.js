// auth.js

function logoutUser() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("currentUser");
      window.location.href = "loginindex.html?logout=1";
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const message = document.getElementById("message");
  
    // Show logout success message
    if (window.location.search.includes("logout=1") && message) {
      message.textContent = "✅ You have been successfully logged out.";
      message.className = "success-message";
    }
  
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
  
      try {
        // Try to log in
        await firebase.auth().signInWithEmailAndPassword(email, password);
        localStorage.setItem("currentUser", email);
        window.location.href = "index.html";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          // Try to sign up
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            localStorage.setItem("currentUser", email);
            message.textContent = "✅ Account created. Redirecting...";
            message.className = "success-message";
            setTimeout(() => {
              window.location.href = "index.html";
            }, 1000);
          } catch (signupError) {
            message.textContent = "❌ " + signupError.message;
            message.className = "error-message";
          }
        } else {
          message.textContent = "❌ " + error.message;
          message.className = "error-message";
        }
      }
    });
  });
  