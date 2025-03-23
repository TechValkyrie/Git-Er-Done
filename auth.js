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
  window.location.href = "login.html";
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}

// Handle login/signup
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return; // Only run this script on login.html

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

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
