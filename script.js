const htmlList = document.querySelector("#books-list");
const books = [];
const urlBooks = "http://localhost:4730/books/";
let favList = [];
let buttonStates = {};

loadBooks();

async function loadBooks() {
  try {
    const fetchBooks = await fetch(urlBooks);
    const jsonBooks = await fetchBooks.json();
    books.push(...jsonBooks);
    displayBooks();
    loadState();
  } catch (error) {
    console.error("Problem loading books", error);
  }
}

async function loadState() {
  const favListString = localStorage.getItem("bookfavorites");
  favList = JSON.parse(favListString) || [];
  console.log("Favorite books loaded:", favList);
}

function displayBooks() {
  htmlList.innerHTML = "";
  books.forEach((book) => {
    const bookCard = document.createElement("li");
    const header = document.createElement("header");

    //Title
    const bTitle = document.createElement("h3");
    bTitle.textContent = book.title;

    // Link zu Book page
    const linkInfo = document.createElement("a");
    linkInfo.innerHTML = "Read more...";
    linkInfo.href =
      "http://127.0.0.1:5500/bookmonkey/books.html?isbn=" + book.isbn;

    //Author
    const bAuthor = document.createElement("p");
    bAuthor.textContent = book.author;

    //ISBN
    const iSBN = document.createElement("p");
    iSBN.textContent = book.isbn;

    //Button
    const favBtn = document.createElement("button");
    favBtn.textContent = "Remove from favorite";
    favBtn.addEventListener("click", addfav);
    favBtn.setAttribute("id", book.id);
    favBtn.setAttribute("fav", "false");

    // Überprüfe, ob der Button bereits als Favorit markiert ist
    if (favList.includes(book.id)) {
      favBtn.innerHTML = "Remove from Favorites";
      favBtn.setAttribute("fav", "true");
    } else {
      favBtn.innerHTML = "Add to Favorites";
      favBtn.setAttribute("fav", "false");
    }

    //Add zusammen
    header.append(bTitle, bAuthor);
    bookCard.append(header, linkInfo, iSBN, favBtn);
    htmlList.appendChild(bookCard);
  });
}

function addfav(event) {
  const favBtn = event.target;
  const favState = favBtn.getAttribute("fav") === "false";
  const isbn = favBtn.getAttribute("id");

  if (favState) {
    favBtn.innerHTML = "Remove from Favorites";
    favBtn.setAttribute("fav", "true");
    favList.push(isbn);
  } else {
    favBtn.innerHTML = "Add to Favorites";
    favBtn.setAttribute("fav", "false");
    favList = favList.filter((item) => item !== isbn);
  }

  saveData();
}

function saveData() {
  const favListString = JSON.stringify(favList);
  localStorage.setItem("bookfavorites", favListString);
}
