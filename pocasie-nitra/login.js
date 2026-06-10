function login() {

  const username =
    document.getElementById(
      "username"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  if (
    username === "sks" &&
    password === "kolbe"
  ) {

    localStorage.setItem(
      "auth",
      "true"
    );

    window.location.href =
      "weather.html";

  } else {

    document.getElementById(
      "error"
    ).innerText =
      "Nesprávne meno alebo heslo";
  }
}
