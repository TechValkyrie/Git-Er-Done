function logoutUser() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html?logout=1";
    }).catch((err) => {
      alert("Logout failed: " + err.message);
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
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
  
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        localStorage.setItem("currentUser", userCredential.user.displayName || userCredential.user.email);
        window.location.href = "index.html";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          // New user? Sign them up
          try {
            const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await newUser.user.updateProfile({
              displayName: name || email.split("@")[0]
            });
            localStorage.setItem("currentUser", newUser.user.displayName);
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
  