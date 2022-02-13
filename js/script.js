"use strict";

const elSearchInput = document.querySelector(".header__input");
const ellist = document.querySelector(".product__list");
const elbookmarkList = document.querySelector(".bookmark__list");
const elMore = document.querySelector(".more");
const elHeader = document.querySelector(".header");
const elHero = document.querySelector(".hero");
const elMain = document.querySelector(".main");
const elHover = document.querySelector(".overlays");
const elNewBtn = document.querySelector(".hero__new-btn")
const elRelevBtn = document.querySelector(".hero__relev-btn")


let localBoocmark = JSON.parse(window.localStorage.getItem("localBoocmark"));
let books = [];
let bookmark = [];
let search = "java script";
let news = "relevance"
elRelevBtn.classList.add("none");





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

//////////////////////////////////////////////////////
///////////////RENDER books///////////////////////////
//////////////////////////////////////////////////////

const renderFilms = function (bookArray, list) {
  bookArray.forEach((book) => {
    // newBtnId.dataset.bookId = book.id;
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
        <button class="product__item-bookmark-btn btn" id="${book.id}">Bookmark</button>
        <button class="product__item-more-btn btn" id="${book.id}">More Info</button>
    </div>
    <a class="product__item-read-btn btn" href="${book.volumeInfo.previewLink}" target="blank">Read</a>
</div>
</li>
        `;

    list.insertAdjacentHTML("beforeend", htmlCard);
  });
};

/////////////////// render bookmarc/////////////////////////////

const renderbookmark = function (bookArray, list) {
  bookArray.forEach((book) => {
    const htmlCard = `
<li class="bookmark__item">
                    <div>
                        <h3 class="bookmark__item-title">${book.volumeInfo.publisher}</h3>
                        <p class="bookmark__item-desc">${book.volumeInfo.authors}</p>
                    </div>
                    <div>
                        <a class="bookmark__bookmarkbtn read" href="${book.volumeInfo.previewLink}" target="_blanK">
                            <img class="read btn" src="./images/book.svg" id="${book.id}" alt="" weight="24" height="24" target="_blanK">
                        </a>
                        <button class="bookmark__delebtn delete" id="${book.id}" target="_blanK">
                            <img class="delete btn" src="./images/delete.svg" id="${book.id}" alt="" weight="24" height="24" target="_blanK">
                        </button>
                    </div>
                </li>`;

    list.insertAdjacentHTML("beforeend", htmlCard);
  });
};

// renderbookmark[]

////////////render more book /////////////////////////////

const renderMoreBook = function (bookArray, list) {
  const htmlCard = `
        <div class="more__header">
            <h3 class="more__title">${bookArray.volumeInfo.publisher}</h3>
            <img class="more__dell" src="./images/Vector.svg" alt="">
        </div>
        <img class="more__img btn" src="${bookArray.volumeInfo.imageLinks.thumbnail}" alt="">
        <p class="more__desc">${bookArray.volumeInfo.description}</p>


        <div class="more__more">
            <div class="more__autors">
                <p class="more__autor autor">Autor:</p>
                <p class="more__autor-desc desc">${bookArray.volumeInfo.authors}</p>
            </div>

            <div class="more__autors">
                <p class="more__year autor">Published : </p>
                <p class="more__year-desc desc">${bookArray.volumeInfo.publishedDate}</p>
            </div>

            <div class="more__autors">
                <p class="more__nashr autor">Publishers:</p>
                <p class="more__nashr desc">Hollman</p>
            </div>

            <div class="more__autors">
                <p class="more__catigoria autor">Categories:</p>
                <p class="more__catigoria-desc desc">${bookArray.volumeInfo.categories[0]}</p>
            </div>

            <div class="more__autors">
                <p class="more__pages autor">Pages Count:</p>
                <p class="more__pages-desc desc">${bookArray.volumeInfo.pageCount}</p>
            </div>
        </div>

        <div class="more__bottom">
            <a href="${bookArray.volumeInfo.previewLink}" class="more__readbtn btn" target="blank">Read</a>
        </div>


    `;
  list.insertAdjacentHTML("beforeend", htmlCard);
};



if (bookmark.length == 0 && localBoocmark?.length > 0) {
  bookmark = localBoocmark;
  renderbookmark(bookmark, elbookmarkList);

} else {
  console.log("localBoocmark bo'sh");
}


////////////ADD BOOK API///////////////////////////////////
const getmovies = async function () {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=search+${search}&orderBy=${news}`
    );
    var data = await response.json();
    var films = data.items;
    books.push(...films);
    result.textContent = data.totalItems;
  } catch (err) {
    // console.log("Qayerdadur Xatobor");
    console.log(err.message);
    alert("Kechirasiz bukino mavjudemas")
  }
  ellist.innerHTML = null;
  renderFilms(films, ellist);
};

getmovies();

////////////// input chanche ////////////////////////////
elSearchInput.addEventListener("change", () => {
  let elValue = elSearchInput.value;
  search = elValue;
  ellist.innerHTML = null;
  getmovies();
});

/////////////// CARD BTN CLICK ///////////////////////////

ellist.addEventListener("click", function (evt) {
  let btnBookmarkId = evt.target.id;
  if (evt.target.matches(".product__item-bookmark-btn")) { /////////////////bookmark btn
    let foundIndex = books.find((book) => book.id === btnBookmarkId);
    if (!bookmark.includes(foundIndex)) {
      bookmark.push(foundIndex);
    }
    window.localStorage.setItem("localBoocmark", JSON.stringify(bookmark));
    elbookmarkList.innerHTML = null;
    renderbookmark(bookmark, elbookmarkList);
  } else if (evt.target.matches(".product__item-more-btn")) { ///////////////more btn
    let moreBook = books.find((book) => book.id === btnBookmarkId);
    elMore.innerHTML = null;
    renderMoreBook(moreBook, elMore);

    elHeader.classList.add("header__stcy");
    elHero.classList.add("hero__stcy");
    elMain.classList.add("main__stcy");
    elHover.classList.add("overlay");
  }
});

/////////////more remove //////////////////////////////////
elMore.addEventListener("click", (evt) => {
  if (evt.target.matches(".more__dell")) {
    elMore.innerHTML = null;
    elHeader.classList.remove("header__stcy");
    elHero.classList.remove("hero__stcy");
    elMain.classList.remove("main__stcy");
    elHover.classList.remove("overlay");
  }
});

elHover.addEventListener("click", () => {
  elMore.innerHTML = null;
  elHeader.classList.remove("header__stcy");
  elHero.classList.remove("hero__stcy");
  elMain.classList.remove("main__stcy");
  elHover.classList.remove("overlay");
});

////////////// delete btn///////////////////////////////////

elbookmarkList.addEventListener("click", (evt) => {
  let btnDelete = evt.target.id;
  if (evt.target.matches(".delete")) {
    let deleteBook = bookmark.findIndex((book) => book.id === btnDelete);
    bookmark.splice(deleteBook, deleteBook + 1);
    elbookmarkList.innerHTML = null;
    renderbookmark(bookmark, elbookmarkList);
    window.localStorage.setItem("localBoocmark", JSON.stringify(bookmark));
  }
});


////////////////////////////////////////////////////////

elNewBtn.addEventListener("click", () => {
  news = "newest"
  getmovies();
  elRelevBtn.classList.remove("none");
  elNewBtn.classList.add("none");
})

elRelevBtn.addEventListener("click", () => {
  news = "relevance"
  getmovies();
  elRelevBtn.classList.add("none");
  elNewBtn.classList.remove("none");
})