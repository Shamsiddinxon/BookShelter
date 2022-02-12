"use strict";

const elSearchInput = document.querySelector(".header__input");
const ellist = document.querySelector(".product__list");

//////////////////////////////////////////////////////
/////////////LOGIN ///////////////////////////////////
///////////////////////////////////////////////////
const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("login.html");
}

logautBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
  console.log("53x");
});

/////////////////////////////////////////////////////

const renderFilms = function (bookArray, list) {
  bookArray.forEach((book) => {
    const htmlCard = `
<li class="product__item">
<div class="product__top">
    <img class="product__img" src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
</div>

<div class="product__item-descs">
    <h3 class="product__item-title">${book.volumeInfo.publisher}</h3>
    <p class="product__item-desc">${book.volumeInfo.authors}</p>
    <p class="product__item-year">${book.volumeInfo.publishedDate}</p>
</div>

<div class="product__item-bottom">
    <div>
        <button class="product__item-bookmark-btn id="${book.id}">Bookmark</button>
        <button class="product__item-more-btn id="${book.id}">More Info</button>
    </div>
    <button class="product__item-read-btn id="${book.id}">Read</button>
</div>
</li>
        `;

      list.insertAdjacentHTML("beforeend", htmlCard);
  });
};

let search = "alisher";
let page = 1;

const getmovies = async function () {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+${search}`
  );
  var data = await response.json();
  var films = data.items;

  renderFilms(films, ellist)
  try {
    console.log(data.items);
    result.textContent = data.totalItems;
  } catch (err) {
    console.error(err.message);
  }

  // if (data.Response === "True" && data.Search.length > 0) {
  //   ellist.innerHTML = null;
  //   renderFilms("")

  // }
};

getmovies();
