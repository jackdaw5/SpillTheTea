document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("user-dropdown");

  if (!dropdown) return;

  const toggleButton = document.getElementById("dropdown-toggle");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const avatar = document.getElementById("user-avatar");
  const logoutButton = document.getElementById("logout-button");

  // example user object.
  // later we can change this with our data pulled from JSON / fetch.
  const currentUser = {
    name: "Spill T. Tea",
    email: "spillthetea@example.com",
    photo: "images/profile.jpg"
  };

  // fill dropdown with user data
  if (userName) {
    userName.textContent = currentUser.name;
  }

  if (userEmail) {
    userEmail.textContent = currentUser.email;
  }

  if (avatar && currentUser.photo) {
    avatar.src = currentUser.photo;
    avatar.alt = `${currentUser.name}'s profile photo`;
  }

  function openDropdown() {
    dropdown.classList.add("open");
    toggleButton.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    dropdown.classList.remove("open");
    toggleButton.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (dropdown.classList.contains("open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // open/close when clicking the photo
  toggleButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    toggleDropdown();
  });

  // close when clicking anywhere outside the dropdown
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  // Close when pressing Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });

  // Logout button action
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
    //we redirect back to login page :D
    window.location.href = "login.html";
    });
  }
});