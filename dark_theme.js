"use strict";
//tryb ciemny
let tryb = document.getElementById("tryb");
let slider = document.getElementById("slider");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let main = document.getElementById("main");

function zmien_tryb() {
  if (slider.classList.contains("slider2")) {
    tryb.classList.remove("ciemny");
    slider.classList.remove("slider2");
    header.classList.remove("header_dark");
    footer.classList.remove("footer_dark");
    main.classList.remove("main_dark");
    localStorage.setItem("tryb", "jasny");
  } else {
    tryb.classList.add("ciemny");
    slider.classList.add("slider2");
    header.classList.add("header_dark");
    footer.classList.add("footer_dark");
    main.classList.add("main_dark");
    localStorage.setItem("tryb", "ciemny");
  }
}

function ustaw_tryb() {
  if (localStorage.getItem("tryb") == "ciemny") {
    tryb.classList.add("ciemny");
    slider.classList.add("slider2");
    header.classList.add("header_dark");
    footer.classList.add("footer_dark");
    main.classList.add("main_dark");
  }
}

window.addEventListener("load", ustaw_tryb);
slider.addEventListener("click", zmien_tryb);
