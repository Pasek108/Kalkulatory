"use strict";

const postac = document.getElementById("postac");
const wzor = document.getElementsByClassName("wzor");

postac.addEventListener("change", () => {
  switch (postac.value) {
    case "Ogólna":
      {
        for (let i = 0; i < 3; i++) wzor[i].style.display = "none";
        document.getElementById("ogolna").style.display = "block";
      }
      break;

    case "Iloczynowa":
      {
        for (let i = 0; i < 3; i++) wzor[i].style.display = "none";
        document.getElementById("iloczynowa").style.display = "block";
      }
      break;

    case "Kanoniczna":
      {
        for (let i = 0; i < 3; i++) wzor[i].style.display = "none";
        document.getElementById("kanoniczna").style.display = "block";
      }
      break;
  }
});

function zaokragl(x) {
  return Math.round(x * 1000) / 1000;
}

const ogolna = document.getElementById("obliczo"),
  iloczynowa = document.getElementById("obliczi"),
  kanoniczna = document.getElementById("obliczk");

ogolna.addEventListener("click", (e) => {
  e.preventDefault();
  ogolna.classList.remove("button");
  iloczynowa.classList.remove("button");
  kanoniczna.classList.remove("button");
  ogolna.classList.add("button");
  const a = parseFloat(document.getElementsByClassName("a")[0].value),
    b = parseFloat(document.getElementById("b").value),
    c = parseFloat(document.getElementById("c").value),
    delta = b * b - 4 * a * c,
    p = -b / (2 * a),
    q = -delta / (4 * a),
    x1 = (-b - Math.sqrt(delta)) / (2 * a),
    x2 = (-b + Math.sqrt(delta)) / (2 * a),
    wynik = document.getElementById("wynik");

  let x = "";

  if (a !== 0) {
    delta < 0 ? (x = "−" + -delta) : (x = delta);
    wynik.innerHTML = "Delta wynosi: &Delta; = " + x + "<br><br>";

    wynik.innerHTML += "Rozwiązania:<br>";
    if (delta > 0) {
      x1 < 0 ? (x = "−" + -x1) : (x = x1);
      wynik.innerHTML += "x<sub>1</sub> = " + x + "<br>";

      x2 < 0 ? (x = "−" + -x2) : (x = x2);
      wynik.innerHTML += "x<sub>2</sub> = " + x + "<br><br>";
    } else if (delta === 0) {
      p < 0 ? (x = "−" + -p) : (x = p);
      wynik.innerHTML += "x<sub>0</sub> = " + x + "<br><br>";
    } else wynik.innerHTML += "Brak rozwiązań<br><br>";

    wynik.innerHTML += "Współrzędne wierzchołka:<br>";

    p < 0 ? (x = "−" + -p) : (x = p);
    wynik.innerHTML += "p = " + x + "<br>";

    q < 0 ? (x = "−" + -q) : (x = q);
    wynik.innerHTML += "q = " + x + "<br><br>";
  } else {
    wynik.innerHTML = "Funkcja liniowa<br>";
    c / b < 0 ? (x = "−" + -(c / b)) : (x = c / b);
    if (b !== 0) wynik.innerHTML += "x<sub>0</sub> = " + x + "<br>";
    else {
      if (c !== 0) wynik.innerHTML += "Brak rozwiązań<br>";
      else wynik.innerHTML += "Nieskończenie wiele rozwiązań<br>";
    }
  }

  p < 0 ? (x = "−" + -p) : (x = p);
  if (a > 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; " + x + " ⟩<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ⟨ " + x + " ; +∞ )<br><br>";
  } else if (a < 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ⟨ " + x + " ; +∞ )<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; " + x + " ⟩<br><br>";
  } else if (a === 0) {
    if (b > 0) wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b < 0) wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b === 0) wynik.innerHTML += "Funkcja jest stała dla x ∈ ( −∞ ; +∞ )<br><br>";
  }

  if (a !== 0) {
    if (delta > 0) {
      a < 0 ? (x = "−" + -a) : (x = a);
      wynik.innerHTML += "Postać iloczynowa: " + x;
      x1 < 0 ? (x = " − " + -zaokragl(x1)) : (x = " + " + zaokragl(x1));
      wynik.innerHTML += " ( x " + x + " ) ";
      x2 < 0 ? (x = " − " + -zaokragl(x2)) : (x = " + " + zaokragl(x2));
      wynik.innerHTML += " ( x " + x + " )<br>";
    }
    if (delta === 0) {
      a < 0 ? (x = "−" + -a) : (x = a);
      wynik.innerHTML += "Postać iloczynowa: " + x;
      p < 0 ? (x = " − " + -zaokragl(p)) : (x = " + " + zaokragl(p));
      wynik.innerHTML += " ( x " + x + " )<sup>2</sup><br>";
    } else if (delta < 0) {
      wynik.innerHTML += "Postać iloczynowa: Brak<br>";
    }

    a < 0 ? (x = "−" + -a) : (x = a);
    wynik.innerHTML += "Postać kanoniczna: " + x;
    p < 0 ? (x = " − " + -zaokragl(p)) : (x = " + " + zaokragl(p));
    wynik.innerHTML += " ( x" + x + " )<sup>2</sup> ";
    q < 0 ? (x = " − " + -zaokragl(q)) : (x = " + " + zaokragl(q));
    wynik.innerHTML += x;
  }

  let f = (x) => {
    return a * Math.pow(x, 2) + b * x + c;
  };

  let brd;
  JXG.Options.text.useMathJax = true;
  brd = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-20, 20, 20, -20],
    axis: {
      strokeColor: "#000",
      highlightStrokeColor: "#000",
      ticks: {
        strokeColor: "#000",
        highlightStrokeColor: "#000",
      },
    },
    showNavigation: false,
    zoom: {
      enabled: true,
      wheel: true,
      needShift: false,
    },
    showCopyright: false,
    pan: {
      needShift: false,
      needTwoFingers: false,
      enabled: true,
    },
  });

  let funkcja = brd.create("functiongraph", [f], { strokeColor: "#ff0000" });
  brd.create("point", [p, q], {
    name: "W",
    attractors: [funkcja],
    attractorDistance: 0.2,
    snatchDistance: 10,
    size: 1,
    highlightStrokeColor: "#000",
    highlightFillColor: "#000",
  });
});

iloczynowa.addEventListener("click", (e) => {
  e.preventDefault();
  ogolna.classList.remove("button");
  kanoniczna.classList.remove("button");
  iloczynowa.classList.add("button");
  let x1 = parseFloat(document.getElementById("x1").value),
    x2 = parseFloat(document.getElementById("x2").value);

  const a = parseFloat(document.getElementsByClassName("a")[1].value),
    b = (-x2 + -x1) * a,
    c = x1 * x2 * a,
    delta = b * b - 4 * a * c,
    p = -b / (2 * a),
    q = -delta / (4 * a),
    wynik = document.getElementById("wynik");

  let x = "";

  if (a !== 0) {
    delta < 0 ? (x = "−" + -delta) : (x = delta);
    wynik.innerHTML = "Delta wynosi: " + x + "<br><br>";

    wynik.innerHTML += "Rozwiązania:<br>";
    if (delta > 0) {
      x1 < 0 ? (x = "−" + -x1) : (x = x1);
      wynik.innerHTML += "x<sub>1</sub> = " + x + "<br>";

      x2 < 0 ? (x = "−" + -x2) : (x = x2);
      wynik.innerHTML += "x<sub>2</sub> = " + x + "<br><br>";
    } else {
      p < 0 ? (x = "−" + -p) : (x = p);
      wynik.innerHTML += "x<sub>0</sub>: " + x + "<br><br>";
      x1 = p;
      x2 = p;
    }

    wynik.innerHTML += "Współrzędne wierzchołka:<br>";

    p < 0 ? (x = "−" + -p) : (x = p);
    wynik.innerHTML += "p = " + x + "<br>";

    q < 0 ? (x = "−" + -q) : (x = q);
    wynik.innerHTML += "q = " + x + "<br><br>";
  } else wynik.innerHTML = "Funkcja liniowa<br>Nieskończenie wiele rozwiązań<br>";

  p < 0 ? (x = "−" + -p) : (x = p);
  if (a > 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; " + x + " ⟩<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ⟨ " + x + " ; +∞ )<br><br>";
  } else if (a < 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ⟨ " + x + " ; +∞ )<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; " + x + " ⟩<br><br>";
  } else if (a === 0) {
    if (b > 0) wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b < 0) wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b === 0) wynik.innerHTML += "Funkcja jest stała dla x ∈ ( −∞ ; +∞ )<br><br>";
  }

  if (a !== 0) {
    a < 0 ? (x = "−" + -a) : (x = a);
    wynik.innerHTML += "Postać ogólna: " + x;
    b < 0 ? (x = " − " + -zaokragl(b)) : (x = " + " + zaokragl(b));
    wynik.innerHTML += "x<sup>2</sup> " + x;
    c < 0 ? (x = " − " + -zaokragl(c)) : (x = " + " + zaokragl(c));
    wynik.innerHTML += "x " + x + "<br>";

    a < 0 ? (x = "−" + -a) : (x = a);
    wynik.innerHTML += "Postać kanoniczna: " + x;
    p < 0 ? (x = " − " + -zaokragl(p)) : (x = " + " + zaokragl(p));
    wynik.innerHTML += " ( x" + x + " )<sup>2</sup> ";
    q < 0 ? (x = " − " + -zaokragl(q)) : (x = " + " + zaokragl(q));
    wynik.innerHTML += x;
  }

  let brd;
  JXG.Options.text.useMathJax = true;
  brd = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-20, 20, 20, -20],
    axis: {
      strokeColor: "#000",
      highlightStrokeColor: "#000",
      ticks: {
        strokeColor: "#000",
        highlightStrokeColor: "#000",
      },
    },
    showNavigation: false,
    zoom: {
      enabled: true,
      wheel: true,
      needShift: false,
    },
    showCopyright: false,
    pan: {
      needShift: false,
      needTwoFingers: false,
      enabled: true,
    },
  });

  let funkcja = brd.create(
    "functiongraph",
    [
      function (x) {
        return a * (x - x1) * (x - x2);
      },
    ],
    { strokeColor: "#ff0000" }
  );
  brd.create("point", [p, q], {
    name: "W",
    attractors: [funkcja],
    attractorDistance: 0.2,
    snatchDistance: 10,
    size: 1,
    highlightStrokeColor: "#000",
    highlightFillColor: "#000",
  });
});

kanoniczna.addEventListener("click", (e) => {
  e.preventDefault();
  iloczynowa.classList.remove("button");
  ogolna.classList.remove("button");
  kanoniczna.classList.add("button");
  const a = parseFloat(document.getElementsByClassName("a")[2].value),
    p = parseFloat(document.getElementById("p").value),
    q = parseFloat(document.getElementById("q").value),
    b = -(p * (2 * a)),
    c = p * p * a + q,
    delta = b * b - 4 * a * c,
    x1 = (-b - Math.sqrt(delta)) / (2 * a),
    x2 = (-b + Math.sqrt(delta)) / (2 * a),
    wynik = document.getElementById("wynik");

  let x = "";

  if (a !== 0) {
    delta < 0 ? (x = "−" + -delta) : (x = delta);
    wynik.innerHTML = "Delta wynosi: " + x + "<br><br>";

    wynik.innerHTML += "Rozwiązania:<br>";
    if (delta > 0) {
      x1 < 0 ? (x = "−" + -x1) : (x = x1);
      wynik.innerHTML += "x<sub>1</sub> = " + x + "<br>";

      x2 < 0 ? (x = "−" + -x2) : (x = x2);
      wynik.innerHTML += "x<sub>2</sub> = " + x + "<br><br>";
    } else if (delta === 0) {
      p < 0 ? (x = "−" + -p) : (x = p);
      wynik.innerHTML += "x0: " + x + "<br><br>";
    } else wynik.innerHTML += "Brak rozwiązań<br><br>";

    wynik.innerHTML += "Współrzędne wierzchołka:<br>";

    p < 0 ? (x = "−" + -p) : (x = p);
    wynik.innerHTML += "p = " + x + "<br>";

    q < 0 ? (x = "−" + -q) : (x = q);
    wynik.innerHTML += "q = " + x + "<br><br>";
  } else {
    wynik.innerHTML = "Funkcja liniowa<br>";
    if (b !== 0) wynik.innerHTML += "x<sub>0</sub>: " + c / b + "<br>";
    else {
      if (c !== 0) wynik.innerHTML += "Brak rozwiązań<br>";
      else wynik.innerHTML += "Nieskończenie wiele rozwiązań<br>";
    }
  }

  p < 0 ? (x = "−" + -p) : (x = p);
  if (a > 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; " + x + " ⟩<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ⟨ " + x + " ; +∞ )<br><br>";
  } else if (a < 0) {
    wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ⟨ " + x + " ; +∞ )<br>";
    wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; " + x + " ⟩<br><br>";
  } else if (a === 0) {
    if (b > 0) wynik.innerHTML += "Funkcja jest rosnąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b < 0) wynik.innerHTML += "Funkcja jest malejąca dla x ∈ ( −∞ ; +∞ )<br><br>";
    else if (b === 0) wynik.innerHTML += "Funkcja jest stała dla x ∈ ( −∞ ; +∞ )<br><br>";
  }

  if (a !== 0) {
    a < 0 ? (x = "−" + -a) : (x = a);
    wynik.innerHTML += "Postać ogólna: " + x;
    b < 0 ? (x = " − " + -zaokragl(b)) : (x = " + " + zaokragl(b));
    wynik.innerHTML += "x<sup>2</sup> " + x;
    c < 0 ? (x = " − " + -zaokragl(c)) : (x = " + " + zaokragl(c));
    wynik.innerHTML += "x " + x + "<br>";

    if (delta > 0) {
      a < 0 ? (x = "−" + -a) : (x = a);
      wynik.innerHTML += "Postać iloczynowa: " + x;
      x1 < 0 ? (x = " − " + -zaokragl(x1)) : (x = " + " + zaokragl(x1));
      wynik.innerHTML += " ( x " + x + " ) ";
      x2 < 0 ? (x = " − " + -zaokragl(x2)) : (x = " + " + zaokragl(x2));
      wynik.innerHTML += " ( x " + x + " )<br>";
    }
    if (delta === 0) {
      a < 0 ? (x = "−" + -a) : (x = a);
      wynik.innerHTML += "Postać iloczynowa: " + x;
      p < 0 ? (x = " − " + -zaokragl(p)) : (x = " + " + zaokragl(p));
      wynik.innerHTML += " ( x " + x + " )<sup>2</sup><br>";
    } else if (delta < 0) {
      wynik.innerHTML += "Postać iloczynowa: Brak<br>";
    }
  }

  let brd;
  JXG.Options.text.useMathJax = true;
  brd = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [-20, 20, 20, -20],
    axis: {
      strokeColor: "#000",
      highlightStrokeColor: "#000",
      ticks: {
        strokeColor: "#000",
        highlightStrokeColor: "#000",
      },
    },
    showNavigation: false,
    zoom: {
      enabled: true,
      wheel: true,
      needShift: false,
    },
    showCopyright: false,
    pan: {
      needShift: false,
      needTwoFingers: false,
      enabled: true,
    },
  });

  let funkcja = brd.create(
    "functiongraph",
    [
      function (x) {
        return a * Math.pow(x - p, 2) + q;
      },
    ],
    { strokeColor: "#ff0000" }
  );
  brd.create("point", [p, q], {
    name: "W",
    attractors: [funkcja],
    attractorDistance: 0.2,
    snatchDistance: 10,
    size: 1,
    highlightStrokeColor: "#000",
    highlightFillColor: "#000",
  });
});

let wys = window.innerHeight;

setInterval(() => {
  if (window.innerHeight !== wys) {
    document.getElementsByClassName("button")[0].click();
    wys = window.innerHeight;
  }
}, 100);
