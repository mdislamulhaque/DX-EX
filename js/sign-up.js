const selectedCountry = document.getElementById("selected-country");
const dropdownList = document.getElementById("dropdown-list");
const countryOptions = document.getElementById("country-options");
const searchBox = document.getElementById("search-box");
const phoneCodeInput = document.getElementById("phoneCode");
const phoneFlag = document.getElementById("phone-flag");

let countryData = []; // Store all country data globally

// Fetch country data
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    countryData = data; // Store all country data
    populateDropdown(countryData);
  })
  .catch((error) => console.error("Error fetching country data:", error));

// Populate dropdown
function populateDropdown(data) {
  countryOptions.innerHTML = ""; // Clear previous options
  data.forEach((country) => {
    const div = document.createElement("div");
    div.classList.add("dropdown-item");
    div.innerHTML = `
                    <img src="${country.flags.svg}" alt="flag"> ${country.name.common}
                `;
    div.dataset.code = country.cca2; // Country Code
    div.dataset.phone =
      country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""); // Phone Code
    div.dataset.flag = country.flags.svg; // Flag URL
    div.dataset.name = country.name.common; // Country Name

    countryOptions.appendChild(div);

    // Click event for selecting a country
    div.addEventListener("click", function () {
      selectedCountry.innerHTML = `<img src="${this.dataset.flag}" alt="flag"> ${this.dataset.name}`;
      phoneCodeInput.value = this.dataset.phone;
      phoneFlag.src = this.dataset.flag;
      phoneFlag.style.display = "inline";
      dropdownList.style.display = "none"; // Hide dropdown after selection
    });
  });
}

// Search functionality
searchBox.addEventListener("input", function () {
  const searchTerm = searchBox.value.toLowerCase();
  const filteredData = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  populateDropdown(filteredData);
});

// Toggle dropdown
selectedCountry.addEventListener("click", function () {
  dropdownList.style.display =
    dropdownList.style.display === "block" ? "none" : "block";
});

// Hide dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (
    !selectedCountry.contains(event.target) &&
    !dropdownList.contains(event.target)
  ) {
    dropdownList.style.display = "none";
  }
});

// ============================

document.getElementById("signUpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const country = document.getElementById("selected-country").innerText.trim();
  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneCode = document.getElementById("phoneCode").value.trim();
  const dob = document.getElementById("date").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const termsChecked = document.getElementById("terms").checked;
  const countryError = document.getElementById("country-error");
  countryError.innerText = "";
  const fullNameError = document.getElementById("full-name-error");
  fullNameError.innerText = "";
  const emailError = document.getElementById("email-error");
  emailError.innerText = "";
  const phoneNumberError = document.getElementById("phone-number-error");
  phoneNumberError.innerText = "";
  const dobError = document.getElementById("dob-error");
  dobError.innerText = "";
  const passwordError = document.getElementById("password-error");
  passwordError.innerText = "";
  const passwordMatchError = document.getElementById("password-match-error");
  passwordMatchError.innerText = "";
  const conditionError = document.getElementById("condition-error");
  conditionError.innerText = "";

  // Country validation
  if (country === "Select a country") {
    countryError.innerText = "Please select a country.";
    return;
  }

  // Full name
  if (fullName === "") {
    fullNameError.innerText = "Please enter your full name.";
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.innerText = "Please enter a valid email address.";
    return;
  }

  // Phone number validation
  if (phoneCode === "") {
    phoneNumberError.innerText = "Please enter your phone code.";
    return;
  }

  // DOB check
  if (!dob) {
    dobError.innerText = "Please select your date of birth.";
    return;
  }

  // Password checks
  if (password.length < 6) {
    passwordError.innerText = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    passwordMatchError.innerText = "Passwords do not match.";
    return;
  }

  // Terms & Conditions check
  if (!termsChecked) {
    conditionError.innerText = "You must agree to the Terms & Conditions.";
    return;
  }

  // After all validations pass
  Swal.fire({
    title: "Success!",
    text: "Sign up successful!",
    icon: "success",
    confirmButtonText: "Continue to Login",
  }).then(() => {
    window.location.href = "./login.html";
  });
});
