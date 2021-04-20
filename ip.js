"use strict";
document.getElementById("oblicz").addEventListener("click", przelicz);

function przelicz() {
  let ip = [];
  let maska = [];
  let z = 0;
  let brak = 0;

  for (let i = 1; i <= 4; i++) {
    if (document.getElementById("ok" + i.toString()).value.length < 1) {
      alert("Puste pole w adresie");
      return 0;
    }

    if (document.getElementById("mok" + i.toString()).value.length < 1) {
      alert("Puste pole w masce");
      return 0;
    }

    ip.push(parseInt(document.getElementById("ok" + i.toString()).value));
    maska.push(parseInt(document.getElementById("mok" + i.toString()).value));
  }

  if (maska[3] === 255) brak = 1;
  else if (maska[3] === 254) brak = 2;

  for (let i = 0; i < 4; i++) {
    if (ip[i] > 255 || ip[i] < 0) {
      alert("Błędny adres");
      return 0;
    }

    if (maska[i] > 255 || maska[i] < 0) {
      alert("Błędna maska");
      return 0;
    }

    ip[i] = ip[i].toString(2);
    maska[i] = maska[i].toString(2);

    if (maska[i] === "0") {
      maska[i] = "00000000";
    }

    let x = maska[i];
    maska[i] = "";

    for (let j = x.length; j < 8; j++) {
      maska[i] += "0";
    }

    maska[i] += x;

    for (let j = 0; j < 8; j++) {
      if (z === 1 && maska[i][j] === "1") {
        alert("Błędna maska");
        return 0;
      }
      if (maska[i][j] === "0") z = 1;
    }

    x = ip[i];
    ip[i] = "";

    for (let j = x.length; j < 8; j++) ip[i] += "0";
    ip[i] += x;
  }

  let as = [];
  let ar = [];
  let x = "0";
  let y = "0";
  z = 0;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 8; i++) {
      if (ip[j][i] === "1" && maska[j][i] === "1") {
        x += "1";
      } else x += "0";

      if (maska[j][i] === "0") {
        y += "1";
        z++;
      }
    }

    as.push(parseInt(x, 2));
    ar.push(parseInt(y, 2));
    ar[j] += as[j];
    x = "0";
    y = "0";
  }

  let wynik = document.getElementById("wynik");

  if (brak === 1) {
    wynik.innerHTML = "Pojedyńczy host: ";

    for (let i = 0; i < 4; i++) {
      if (i < 3) wynik.innerHTML += parseInt(ip[i], 2) + ":";
      else wynik.innerHTML += parseInt(ip[i], 2);
    }
    return 0;
  }

  wynik.innerHTML = "Adres sieci: ";

  for (let i = 0; i < 4; i++) {
    if (i < 3) wynik.innerHTML += as[i] + ":";
    else wynik.innerHTML += as[i];
  }

  wynik.innerHTML += "<br />Adres rozgłoszeniowy: ";

  for (let i = 0; i < 4; i++) {
    if (i < 3) wynik.innerHTML += ar[i] + ":";
    else wynik.innerHTML += ar[i];
  }

  if (brak === 2) {
    wynik.innerHTML += "<br />Ilość hostów: punkt-punkt";
    return 0;
  }

  let hosty = Math.pow(2, z) - 2;
  wynik.innerHTML += "<br />Ilość hostów: " + hosty.toString();
  wynik.innerHTML += "<br />Host min: ";

  for (let i = 0; i < 4; i++) {
    if (i === 3) as[i] += 1;
    if (i < 3) wynik.innerHTML += as[i] + ":";
    else wynik.innerHTML += as[i];
  }

  wynik.innerHTML += "<br />Host max: ";

  for (let i = 0; i < 4; i++) {
    if (i === 3) ar[i] -= 1;
    if (i < 3) wynik.innerHTML += ar[i] + ":";
    else wynik.innerHTML += ar[i];
  }
}
