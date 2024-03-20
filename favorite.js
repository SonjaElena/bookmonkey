const urlBooks = "http://localhost:4730/books/";
let books = [];
const htmlList = document.querySelector("#books-list");
let favList = [];

loadState();

async function loadState() {
  const favListString = localStorage.getItem("bookfavorites");
  favList = JSON.parse(favListString) || [];
  console.log("Favorite books loaded:", favList);

  await loadBooks(); // Warte, bis die Bücher geladen sind, bevor die Anzeige aktualisiert wird
}

async function loadBooks() {
  try {
    const fetchBooks = await fetch(urlBooks);
    const jsonBooks = await fetchBooks.json();
    books = jsonBooks;
    console.log("load all books", books);
    displayfavBooks();
  } catch (error) {
    console.error("Problem loading books", error);
  }
}

// Display books
function displayfavBooks() {
  const selectedBooks = books.filter((book) => favList.includes(book.id));
  console.log("load selected books", selectedBooks);
  htmlList.innerHTML = "";
  selectedBooks.forEach((book) => {
    const liEl = document.createElement("li");
    const head = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const isbn = document.createElement("p");
    isbn.textContent = book.isbn;

    const favBtn = document.createElement("button");
    favBtn.textContent = "Remove from Favorites";
    favBtn.addEventListener("click", addfav);
    favBtn.setAttribute("id", book.id);
    favBtn.setAttribute("fav", "true");

    head.append(title, author);
    liEl.append(head, isbn, favBtn);

    htmlList.appendChild(liEl);
  });
}

function addfav(event) {
  const isbn = event.target.id;
  const index = favList.indexOf(isbn);
  if (index !== -1) {
    favList.splice(index, 1);
    saveData();
    displayfavBooks(); // Aktualisiere die Anzeige nach dem Entfernen des Buches
  }
}

function saveData() {
  localStorage.setItem("bookfavorites", JSON.stringify(favList));
}
