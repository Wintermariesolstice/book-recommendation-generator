function displayBook(response) {
  console.log("Full API Response:", response.data);

  let bookContent = response.data.answer;

  let bookElement = document.querySelector("#book");
  bookElement.innerHTML = "";

  bookContent = bookContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  bookContent = bookContent.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, altText, url) => {
      console.log("Image URL:", url);
      return `
      <img src="${url}" alt="${altText}" style="max-width: 105px;" onerror="this.style.display='none';"/>
      
    `;
    }
  );

  bookContent = bookContent.replace(/\n/g,'</br>');
  bookElement.innerHTML = bookContent;

}
  
  

function generateBook(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a0btf0ao0fa13fec249490d3e8c2c77";
  let context =
    "You are a librarian and loves to read higly recommended books by Goodreads.Your mission is to recommend 3 books. Each book must include a picture of the book cover.Make sure to only use valid url for the book cover image.Sign off with 'SheCodes AI.' in <strong></strong>.";
  let prompt = `User instructions: Generate 3 books recommendation about ${instructionsInput.value}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let bookElement = document.querySelector("#book");
  bookElement.classList.remove("hidden");
  bookElement.innerHTML = `<div class="generating">⏳ Generating Book recommendations about ${instructionsInput.value}</div>`;

 axios.get(apiUrl).then(displayBook).catch(error => {
    console.error("Error fetching book recommendations:", error);
    bookElement.innerHTML = "Failed to fetch book recommendations. Please try again.";
  });
}

  


let bookFormElement = document.querySelector("#book-generator-form");
bookFormElement.addEventListener("submit", generateBook);
