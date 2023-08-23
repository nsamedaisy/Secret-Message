const input = document.getElementById("input");
const encryptBtn = document.getElementById("encrypt-btn");
const rectangle = document.getElementById("rectangle");
const encoded = document.getElementById("encoded");
const decoded = document.getElementById("decoded");

//Function to normalize the input text
function normalizeText(text) {
  const normalized = text.toLowerCase().replace(/[^a-z]/g, "");
  // console.log(`normalizeText: ${text} -> ${normalized}`);
  return normalized;
}

//function to create the rectangle
function createRectangle(text) {
  // if (typeof text !== "string") {
  //   throw new Error(`createRectangle: expected string, got ${typeof text}`);
  // }

  const length = text.length;
  const rows = Math.floor(Math.sqrt(length));
  const columns = Math.ceil(Math.sqrt(length));

  let rectangleText = "";
  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (index < length) {
        rectangleText += text.charAt(index);
        index++;
      }
    }
    // if (r < rows - 1) {
    //   rectangleText += "\n";
    // }
  }
  // console.log(`createRectangle: ${text} -> ${rectangleText.trim()}`);
  return rectangleText.trim();
}

// function to decode the message
function decodeMsg(text) {
  const length = text.length;
  const rows = Math.floor(Math.sqrt(length));
  const columns = rows * rows >= length ? rows : rows + 1;

  let rectangleText = "";
  for (let i = 0; i < columns; i++) {
    for (let j = i; j < length; j += columns) {
      rectangleText += text.charAt(j);
    }

    if (i < rows - 1) {
      rectangleText += "\n";
    }
  }
  return rectangleText;
}

//function to encode the message
function encodeMsg(text) {
  const normalizedText = normalizeText(text);
  const rectangleText = createRectangle(normalizedText);

  let encodedText = "";
  for (let i = 0; i < rectangleText.length; i++) {
    if (rectangleText.charAt(i) !== " ") {
      encodedText += rectangleText.charAt(i);
    }
  }

  //spliting encoded msg into chunks
  const chunkSize = Math.ceil(
    encodedText.length / createRectangle(text).length
  );
  const chunks = [];
  for (let i = 0; i < encodedText.length; i += chunkSize) {
    chunks.push(encodedText.substr(i, chunkSize));
  }

  console.log(rectangleText);
  return {
    rectangle: rectangleText,
    encoded: chunks.join(""),
  };
}

// event listener on the encrypt button
encryptBtn.addEventListener("click", () => {
  const inputText = input.value.trim();
  if (inputText.length < 50) {
    alert("Please enter at least 50 characters.");
    return;
  }

  const { rectangle, encoded } = encodeMsg(inputText);
  const decodedText = decodeMsg(encoded);

  rectangle.innerHTML = rectangle;
  encoded.innerHTML = encoded;
  decoded.innerHTML = decodedText;
});
