const input = document.getElementById("input");
const encryptBtn = document.getElementById("encrypt-btn");
const rectangle = document.getElementById("rectangle");
const encoded = document.getElementById("encoded");
const decoded = document.getElementById("decoded");

//Function to normalize the input text
function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z]/g, "");
}
