// === Firebase Auth Helper (auth.js) ===
// Make sure Firebase v8 SDK is loaded in your HTML files before this runs

function logoutUser() {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html?logout=1";
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  }
  
  // Run after DOM loads
  document.addEventListener("DOMContentLoaded", () => {
    // Only run auth check on protected pages
    const protectedPages = ["index.html", "question.html", "about.html"];
    const currentPath = window.location.pathname;
  
    const needsAuth = protectedPages.some((page) => currentPath.endsWith(page));
  
    if (needsAuth) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          window.location.href = "login.html";
        } else {
          const welcome = document.getElementById("welcomeUser");
          if (welcome) {
            welcome.textContent = `Welcome, ${user.email}`;
          }
          localStorage.setItem("currentUser", user.email); // optional
        }
      });
    }
  });
  