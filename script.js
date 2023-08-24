function normalize(text) {
  return text.replace(/[^\w]/g, "").toLowerCase();
}

function createRectangle(text, rows, cols) {
  let rectangle = "";
  let index = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (index >= text.length) {
        rectangle += " ";
      } else {
        rectangle += text.charAt(index);
      }
      index++;
    }
    if (i < rows - 1) {
      rectangle += "\n";
    }
  }

  return rectangle;
}

function encode() {
  let input = document.getElementById("input").value;

  if (input.trim().length < 50) {
    alert("Please enter at least 50 characters.");
    return;
  }

  let normalized = normalize(input);
  let length = normalized.length;
  let rows = Math.floor(Math.sqrt(length));
  let cols = Math.ceil(length / rows);

  if (rows * cols < length) {
    rows++;
  }

  let rectangle1 = createRectangle(normalized, rows, cols);
  document.getElementById("rectangle1").textContent = rectangle1;

  let encoded = "";
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = j * cols + i;
      if (index < length) {
        encoded += normalized.charAt(index);
      }
    }
    // if (i < cols - 1) {
    //   encoded += " ";
    // }
  }

  let padding = rows * cols - length;
  for (let i = 0; i < padding; i++) {
    encoded += " ";
  }

  let encodedChunks = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index = i * cols + j;
      if (index < length) {
        encodedChunks += encoded.charAt(index);
      }
    }
    // if (i < rows - 1) {
    //   encodedChunks += " ";
    // }
  }

  document.getElementById("encoded").textContent = encodedChunks;

  let rectangle2 = createRectangle(encoded, cols, rows);
  document.getElementById("rectangle2").textContent = rectangle2;
}
