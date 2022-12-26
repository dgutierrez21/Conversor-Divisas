const selectListaDivisas = document.querySelectorAll(".lista-divisas select"),
  btnConvertir = document.querySelector("form button"),
  deMoneda = document.querySelector(".de select"),
  aMoneda = document.querySelector(".a select");

for (let i = 0; i < selectListaDivisas.length; i++) {
  for (const codigoDivisa in codigosPaises) {
    let selected;

    if (i === 1) {
      selected = codigoDivisa === "CRC" ? "selected" : "";
    }

    let option = `<option value="${codigoDivisa}" ${selected}>${codigoDivisa}</option>`;
    selectListaDivisas[i].insertAdjacentHTML("beforeend", option);
  }
}

btnConvertir.addEventListener("click", (e) => {
  e.preventDefault();

  obtenerTipoCambio();
});

function obtenerTipoCambio() {
  const cantidad = document.querySelector(".cantidad input");
  let valorCantidad = cantidad.value;

  if (valorCantidad === "" || valorCantidad === "0") {
    cantidad.value = "1";
    valorCantidad = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${deMoneda.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let tipocambio = result.conversion_rates[aMoneda.value];

      let tipocambioTotal = (valorCantidad * tipocambio).toFixed(2);

      console.log(result);
      console.log(tipocambio);
      console.log(tipocambioTotal);
    });
}
