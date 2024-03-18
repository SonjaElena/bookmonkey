function showTask() {
  favList.innerHTML = localStorage.getItem("bookfavorites");
}

showTask();

const favlist = document.querySelector("#books-list");

function addfavBook() {
  favlist.innerHTML = "";
  books.forEach((book) => {
    const liEl = document.createElement("li");
    const head = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const isbn = document.createElement("p");
    isbn.textContent = book.isbn;

    const favBtn = document.createElement("button");
    favBtn.addEventListener("click", addfav);
    favBtn.innerHTML = "Add to Favorites";
    favBtn.setAttribute("fav", "false");
    favBtn.setAttribute("id", book.isbn);

    head.append(title, author);
    liEl.append(head, isbn, favBtn);
  });
}
