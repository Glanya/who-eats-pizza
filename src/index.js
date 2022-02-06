import "./styles.scss";

let btnLoad = document.getElementById("load-btn"),
  app = document.getElementById("app"),
  pizza = document.createElement("div"),
  allVisitors = document.createElement("h2");

btnLoad.addEventListener("click", () => {
  app.innerHTML = "waiting...";
  btnLoad.classList.add("loading");
  pizza.innerHTML = "";

  fetch("https://gp-js-test.herokuapp.com/pizza")
    .then((response) => {
      app.innerHTML = "";
      btnLoad.classList.remove("loading");
      return response.json();
    })
    .then((data) => whoEatsPizza(data));
});

function whoEatsPizza(data) {
  pizza.classList.add("pizza");
  document.body.appendChild(pizza);
  document.body.appendChild(allVisitors);

  let participants = data.party,
    eaters = data.party.filter((obj) => obj.eatsPizza);

  function pizzaSlicer() {
    let slice = 360 / eaters.length;

    eaters.forEach((eater, i) => {
      let cutLine = document.createElement("div");
      cutLine.classList.add("cut-line");
      cutLine.style.transform = `rotate(${slice * i}deg)`;
      pizza.appendChild(cutLine);
    });
  }
  pizzaSlicer();

  function getAllVisitors() {
    allVisitors.innerHTML = `
    ${participants.length} participants will be at the party &#127881<br>
    ${eaters.length} of them will eat pizza &#127829
    `;
  }
  getAllVisitors();
}
