// auth.js

function logoutUser() {
    firebase.auth().signOut()
      .then(() => {
        window.location.href = "loginindex.html?logout=1";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const message = document.getElementById("message");
  
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
        await firebase.auth().signInWithEmailAndPassword(email, password);
        window.location.href = "index.html";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
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
  