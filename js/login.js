const elForm = document.querySelector(".form");
const elUserName = document.querySelector(".login__username");
const elPassword = document.querySelector(".login__password");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  elUserNameValue = elUserName.value;
  elPasswordValue = elPassword.value;

  console.log(elUserNameValue, elPasswordValue);

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: elUserNameValue,
      password: elPasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
        if (data.token) {
            window.localStorage.setItem("token", data.token);

            window.location.replace("index.html");
        } else {
          alert("bolmadi")
        }
    })
});
