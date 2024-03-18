const urlBooks = "http://localhost:4730/books/";
const url = new URL(window.location.href);
const isbn = url.searchParams.get("isbn");
let book = [];

console.log(isbn);

loadBook();

async function loadBook() {
  const fetchedBook = await fetch(urlBooks + isbn);
  const response = await fetchedBook.json();
  book = response;
  console.log(book);
  displayBook();
}

function displayBook() {
  const bookCard = document.createElement("article");
  bookCard.classList.add("book-information");

  const title = document.createElement("h2");
  title.textContent = book.title;
  title.id = "book-title";

  const author = document.createElement("p");
  author.textContent = book.author;
  author.id = "book-author";
  const lineBreak = document.createElement("br");

  const isbnBook = document.createElement("p");
  isbnBook.textContent = "ISBN: " + book.isbn;
  isbnBook.id = "book-isbn";

  const subtitle = document.createElement("h3");
  subtitle.textContent = "Ausschnitt: ";

  const abstract = document.createElement("p");
  abstract.textContent = book.abstract;
  abstract.classList.add("book-description");

  bookCard.append(title, author, lineBreak, isbnBook, subtitle, abstract);
  document.querySelector("main").appendChild(bookCard);
}
