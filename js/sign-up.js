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
