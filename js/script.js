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
