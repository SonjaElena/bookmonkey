const htmlList = document.querySelector("#books-list");
const books = []; //alternative let books, dann kann man books = jsonBooks machen
const urlBooks = "http://localhost:4730/books/";
let favList = [];

loadBooks();

async function loadBooks() {
  try {
    const fetchBooks = await fetch(urlBooks);
    const jsonBooks = await fetchBooks.json();
    books.push(...jsonBooks);
    displayBooks();
  } catch (error) {
    console.error("Problem loading books", error);
  }
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
    favBtn.addEventListener("click", addfav);
    favBtn.innerHTML = "Add to Favorites";
    favBtn.setAttribute("fav", "false");
    favBtn.setAttribute("id", iSBN.textContent);

    //Add together
    header.append(bTitle, bAuthor);
    bookCard.append(header, linkInfo, iSBN, favBtn);
    htmlList.appendChild(bookCard);
  });
}

function addfav(event) {
  const favBtn = event.target;
  const isFav = favBtn.getAttribute("fav") === "true";
  const isbn = favBtn.getAttribute("id");
  console.log(isbn);

  // change button text
  // change favorite status
  if (isFav) {
    favBtn.innerHTML = "Add to Favorites";
    favBtn.setAttribute("fav", "false");
    favList.push(isbn);
    favList.push(isbn);
  } else {
    favBtn.innerHTML = "Remove from Favorites";
    favBtn.setAttribute("fav", "true");
    favList = favList.filter((item) => item !== isbn);
  }
  console.log(favList);
  saveData();
}

function saveData() {
  localStorage.setItem("bookfavorites", favList);
}
