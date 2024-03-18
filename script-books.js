const urlBooks = "http://localhost:4730/books/";
const url = new URL(window.location.href);
const isbn = url.searchParams.get("isbn");
let book = [];

console.log(isbn);

loadBook();

async function loadBook() {
  try {
    const fetchedBook = await fetch(urlBooks + isbn);
    book = await fetchedBook.json();
    displayBook();
  } catch (error) {
    console.error("Problem loading book", error);
  }
}

function thatBook() {
  const bookCard = document.createElement("article");
  bookCard.classList.add("book-information");

  const title = document.createElement("h2");
  title.textContent = book.title;
  title.id = "book-title";

  const author = document.createElement("p");
  author.textContent = book.author;
  author.id = "book-author";

  const isbnBook = document.createElement("p");
  isbnBook.textContent = book.isbn;
  isbnBook.id = "book-isbn";

  const abstract = document.createElement("p");
  abstract.textContent = book.abstract;
  abstract.classList.add("book-description");

  bookCard.append(title, author, isbnBook, abstract);
  document.main.appendChild(bookCard);
  // document.querySelector("main").appendChild(bookCard);
}
