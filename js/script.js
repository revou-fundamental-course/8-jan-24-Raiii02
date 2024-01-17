function calculate() {
  // mengambil nilai sisi dari input
  var side = parseFloat(document.getElementById("side").value);

  //Validasi nilai sisi adalah angka positif
  if (isNaN(side) || side <= 0) {
    alert("Masukan nilai sisi yang valid");
    return;
  }

  // Menghitung rumus persegi
  var squareArea = side * side;

  // Menampilkan rumus luas persegi, nilai sisi dan hasilnya
  var result = document.getElementById("result");
  result.innerHTML = `
        <p>L = S x S</p>
        <p>L = ${side} x ${side}</p>
        <p>L = ${squareArea}</p>
    `;
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

function toggleDropdown(element) {
  const parentLi = element;
  parentLi.classList.toggle("open");
  parentLi.classList.toggle("active-dropdown");
}

function toggleMenu(event, element) {
  const allMenuLinks = document.querySelectorAll(".dropdown-menu a");
  allMenuLinks.forEach((link) => link.classList.remove("active-menu"));

  element.classList.add("active-menu");

  // Menampilkan tampilan saat menu dropdown diklik
  const contentView = document.getElementById("content-view");
  contentView.classList.toggle("visible");

  // Menghentikan propogasi event klik agar dropdown tidak tertutup
  event.stopPropagation();
}
