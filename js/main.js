console.log("connected");

const mobileMenuButton = document.getElementById("mobile-menu-button");

const mobileMenu = document.getElementById("mobile-menu");

const mainMenu = document.getElementById("mainMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mainMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function toggleFAQ(id) {
  const answer = document.getElementById(`answer-${id}`);
  const icon = document.getElementById(`icon-${id}`);

  answer.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

document.getElementById("body").addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when user scrolls down 300px
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll to Top when button is clicked
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function toggleDropdown() {
  document.getElementById("language-dropdown").classList.toggle("hidden");
}

function selectLanguage(flagUrl) {
  document.getElementById("selected-flag").src = flagUrl;
  document.getElementById("language-dropdown").classList.add("hidden");
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const container = document.querySelector(".relative");
  if (!container.contains(event.target)) {
    document.getElementById("language-dropdown").classList.add("hidden");
  }
});

// ===============

let hasScrolled = false; // Track if navbar has already hidden once
const navbar = document.getElementById("navbar");

navbar.style.transition = "top 0.5s ease-in-out";

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > 0 && !hasScrolled) {
    // Hide navbar once when scrolling starts
    navbar.style.top = "-80px";

    setTimeout(() => {
      navbar.style.top = "0"; // Show navbar again
    }, 1000);

    hasScrolled = true; // Mark that the navbar has hidden once
  }
});


