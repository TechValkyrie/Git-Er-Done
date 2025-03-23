// auth.js
const usersKey = "registeredUsers";
const currentUserKey = "currentUser";

// Simulate a simple user database using localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey)) || {};
}

function saveUser(username, password) {
  const users = getUsers();
  users[username] = password;
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function loginUser(username) {
  localStorage.setItem(currentUserKey, username);
}

function logoutUser() {
  localStorage.removeItem(currentUserKey);
  window.location.href = "loginindex.html?logout=1"; // add flag for message
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}

// Handle login/signup
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("message");

  // Display logout success message if redirected
  if (window.location.search.includes("logout=1") && message) {
    message.textContent = "✅ You have been successfully logged out.";
    message.className = "success-message";
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = getUsers();

    if (users[username]) {
      if (users[username] === password) {
        loginUser(username);
        window.location.href = "index.html";
      } else {
        message.textContent = "❌ Incorrect password.";
        message.className = "error-message";
      }
    } else {
      // Sign up new user
      saveUser(username, password);
      loginUser(username);
      message.textContent = "✅ Account created. Redirecting...";
      message.className = "success-message";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  });
});