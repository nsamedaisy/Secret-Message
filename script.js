// const input = document.getElementById("input");
// const encryptBtn = document.getElementById("encrypt-btn");
// const rectangle = document.getElementById("rectangle");
// const encoded = document.getElementById("encoded");
// const decoded = document.getElementById("decoded");

// //Function to normalize the input text
// function normalizeText(text) {
//   const normalized = text.toLowerCase().replace(/[^a-z]/g, "");
//   console.log(`normalizeText: ${text} -> ${normalized}`);
//   return normalized;
// }

// //function to create the rectangle
// function createRectangle(text) {
//   if (typeof text !== "string") {
//     throw new Error(`createRectangle: expected string, got ${typeof text}`);
//   }
//   let length = text.length;
//   const rows = Math.floor(Math.sqrt(length));
//   const columns = rows * rows >= length ? rows : rows + 1;

//   let rectangleText = "";
//   for (let i = 0; i < columns; i++) {
//     for (let j = i; j < length; j += columns) {
//       rectangleText += text.charAt(j);
//     }
//     rectangleText += "";
//   }
//   console.log(`createRectangle: ${text} -> ${rectangleText.trim()}`);
//   return rectangleText.trim();
// }

// //function to encode the message
// function encodeMsg(text) {
//   const normalizedText = normalizeText(text);
//   const rectangleText = createRectangle(normalizedText);

//   let encodedText = "";
//   for (let i = 0; i < rectangleText.length; i++) {
//     if (rectangleText.charAt(i) !== " ") {
//       encodedText += rectangleText.charAt(i);
//     }
//   }

//   const chunkSize = Math.ceil(
//     encodedText.length / createRectangle(text).length
//   );
//   const chunks = [];
//   for (let i = 0; i < encodedText.length; i += chunkSize) {
//     chunks.push(encodedText.substr(i, chunkSize));
//   }

//   const lastChunkLength = chunks[chunks.length - 1].length;
//   if (lastChunkLength < chunkSize) {
//     chunks[chunks.length - 1] += "".repeat(chunkSize - lastChunkLength);
//   }

//   return {
//     rectangle: rectangleText,
//     encoded: chunks.join(""),
//   };
// }

// // function to decode the message
// function decodeMsg(text) {
//   const length = text.length;
//   const rows = Math.floor(Math.sqrt(length));
//   const columns = rows * rows >= length ? rows : rows + 1;

//   let rectangleText = "";
//   for (let i = 0; i < columns; i++) {
//     for (let j = i; j < length; j+=columns) {
//       rectangleText += text.charAt(j);
//     }
//   }
//   return rectangleText;
// }

// // Event listener on the encrypt button
// encryptBtn.addEventListener("click", () => {
//   const inputText = input.value.trim();
//   if (inputText.length < 50) {
//     alert("Please enter at least 50 characters.");
//     return;
//   }
//   const { rectangle: rectangleText, encoded: encodedText } =
//     encodeMsg(inputText);
//   const decodedText = decodeMsg(encodedText);

//   rectangle.textContent = rectangleText;
//   encoded.textContent = encodedText;
//   decoded.textContent = decodedText;
// });

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
  // document.getElementById("rectangle2").textContent = normalized;
}
