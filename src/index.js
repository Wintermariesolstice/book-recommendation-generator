function displayBook(response) {
  console.log("book generated");
  new Typewriter("#book", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateBook(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a0btf0ao0fa13fec249490d3e8c2c77";
  let context =
    "You are a librarian and loves to read higly recommended books by Goodreads.Your mission is to recommend 3 books. Each book must include a picture of the book cover and seperated by a <br/>.Make sure to follow the user instructions.Sign off with 'SheCodes AI.' in <strong></strong>.";
  let prompt = `User instructions: Generate 3 books recommendation about ${instructionsInput.value}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#book");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generating Book recommendations about ${instructionsInput.value}</div>`;

 

  axios.get(apiUrl).then(displayBook);
}

let bookFormElement = document.querySelector("#book-generator-form");
bookFormElement.addEventListener("submit", generateBook);
