function calculate(sectionId, calculationType) {
  var sectionElement = document.querySelector(
    '[data-section="' + sectionId + '"]'
  );

  var lengthValue = 0;
  var breadthValue = 0;

  if (sectionId.includes("Rectangle")) {
    var lengthValue =
      parseFloat(
        sectionElement.querySelector(".input-field:nth-of-type(1)").value
      ) || 0;
    var breadthValue =
      parseFloat(
        sectionElement.querySelector(".input-field:nth-of-type(2)").value
      ) || 0;
  } else {
    var sideValue =
      parseFloat(sectionElement.querySelector(".input-field").value) || 0;
  }

  if (sectionId.includes("Rectangle")) {
    if (lengthValue <= 0 || breadthValue <= 0) {
      alert("Masukkan angka yang lebih besar dari nol.");
      return;
    }
  } else {
    if (sideValue <= 0) {
      alert("Masukkan angka yang lebih besar dari nol.");
      return;
    }
  }
  var result;

  // Melakukan kalkulasi berdasarkan jenis perhitungan
  if (calculationType === "areaRectangle") {
    result = lengthValue * breadthValue || 0;
  } else if (calculationType === "perimeterRectangle") {
    result = 2 * (lengthValue + breadthValue) || 0;
  } else if (calculationType === "areaSquare") {
    result = sideValue * sideValue || 0;
  } else if (calculationType === "perimeterSquare") {
    result = 4 * sideValue || 0;
  }

  // Menampilkan hasil perhitungan
  document.getElementById("result" + sectionId).innerText = "Hasil: " + result;
}

function toggleDropdown(element) {
  const parentLi = element;
  parentLi.classList.toggle("open");
  parentLi.classList.toggle("active-dropdown");
}

function showSection(sectionId) {
  var sections = document.querySelectorAll(".calculator");
  sections.forEach(function (section) {
    section.classList.remove("activeSec");
  });

  var selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add("activeSec");
}

// Mendapatkan elemen calculator
var calculatorSection = document.getElementById("SquareArea");

// Menambahkan atau menghapus kelas 'hidden' saat diperlukan
function toggleCalculator() {
  calculatorSection.classList.toggle("hidden");
}

// Mengatur properti display menggunakan JavaScript
function hideCalculator() {
  calculatorSection.style.display = "none";
}

function showCalculator() {
  calculatorSection.style.display = "flex";
}

const accessToken = "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";

// Fungsi untuk mendapatkan informasi pengguna dari GitHub API
async function fetchGitHubProfile() {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    displayProfile(userData);
  } catch (error) {
    console.error("Error fetching GitHub profile:", error.message);
  }
}

// Fungsi untuk menampilkan informasi pengguna di halaman HTML
function displayProfile(user) {
  const profileContainer = document.getElementById("profile-container");
  profileContainer.innerHTML = `<a href="${user.html_url}" target="_blank"></a>`;

  // Membuat elemen-elemen HTML untuk menampilkan informasi
  const username = document.createElement("h2");
  username.className = "username"; // Menambahkan kelas CSS
  username.textContent = `${user.login}`;
  username.addEventListener("click", () => openProfileLink(user.html_url)); // Menambahkan event listener

  const avatar = document.createElement("img");
  avatar.src = user.avatar_url;
  avatar.alt = "GitHub Avatar";
  avatar.addEventListener("click", () => openProfileLink(user.html_url)); // Menambahkan event listener

  const profileLink = document.createElement("a");
  profileLink.id = "profile-link"; // Menambahkan id untuk link profil
  profileLink.href = user.html_url;
  profileLink.target = "_blank";
  profileLink.textContent = user.html_url;

  // Menambahkan elemen-elemen ke dalam container
  profileContainer.appendChild(username);
  profileContainer.appendChild(avatar);
  profileContainer.appendChild(profileLink);
}

// Fungsi untuk membuka link profil
function openProfileLink(url) {
  window.open(url, "_blank");
}

// Memanggil fungsi fetchGitHubProfile saat halaman dimuat
window.onload = fetchGitHubProfile;
