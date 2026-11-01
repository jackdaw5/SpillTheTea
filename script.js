document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     task 7: dropdown menu logic n stuff
     ========================================= */
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) {
    const toggleButton = document.getElementById("dropdown-toggle");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const avatar = document.getElementById("user-avatar");
    const logoutButton = document.getElementById("logout-button");

    const currentUser = {
      name: "Spill T. Tea",
      email: "spillthetea@example.com",
      photo: "images/profile.jpg"
    };

    if (userName) userName.textContent = currentUser.name;
    if (userEmail) userEmail.textContent = currentUser.email;
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
      if (dropdown.classList.contains("open")) closeDropdown();
      else openDropdown();
    }

    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) closeDropdown();
    });

    document.addEventListener("keydown", function (event) {
      //undo the dropdown if escape is pressed
      if (event.key === "Escape") closeDropdown();
    });

    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        //we leave and go back to the login page :D
        window.location.href = "login.html";
      });
    }
  }

  /* =========================================
     tasks 4, 5 & 6: fetch json and render the posts
     ========================================= */
  async function loadPosts() {
    try {

      // task 4: fetch from online endpoint
      // const response = await fetch("https://api.npoint.io/5ef0416ab21afa3d4fae");

      
      // task 5: fetch from local json file
      const response = await fetch("posts.json");
      
      if (!response.ok) throw new Error("Failed to fetch posts");
      
      const posts = await response.json();
      const mainElement = document.querySelector("main");
      
      // clear any existing content
      mainElement.innerHTML = ""; 
      
      // loop through JSON and create HTML elements
      posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";
        
        // task 6: handle photos (only add img tag if imageUrl exists)
        const imageHtml = post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}">` : '';
        
        article.innerHTML = `
          <h3>${post.title}</h3>
          <b>${post.author} - ${post.date}</b>
          ${imageHtml}
          <p>${post.content}</p>
        `;
        
        mainElement.appendChild(article);
      });
      
    } catch (error) {
      console.error("Error loading posts:", error);
      document.querySelector("main").innerHTML = "<p style='color:white;'>Error loading posts.</p>";
    }
  }

  // run the function when page loads
  loadPosts();
});