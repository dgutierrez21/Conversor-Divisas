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

  selectListaDivisas[i].addEventListener("change", (e) => {
    cargarBandera(e.target);

    console.log(e.target.value);
  });
}

function cargarBandera(e) {
  for (const codigoDivisa in codigosPaises) {
    if (codigoDivisa === e.value) {
      let img = e.parentElement.querySelector("img");
      img.src = `https://www.countryflagicons.com/FLAT/64/${codigosPaises[codigoDivisa]}.png`;
    }
  }
}

window.onload = () => {
  obtenerTipoCambio();
};

btnConvertir.addEventListener("click", (e) => {
  e.preventDefault();

  obtenerTipoCambio();
});

const iconoItercambiarTipoCambio = document.querySelector(".icono");
iconoItercambiarTipoCambio.addEventListener("click", () => {
  let codigoTemporal = deMoneda.value;

  deMoneda.value = aMoneda.value;
  aMoneda.value = codigoTemporal;

  cargarBandera(deMoneda);
  cargarBandera(aMoneda);

  obtenerTipoCambio();
});
function obtenerTipoCambio() {
  const textoTipoCambioTotal = document.querySelector(".tipo-de-cambio");
  const cantidad = document.querySelector(".cantidad input");
  let valorCantidad = cantidad.value;

  if (valorCantidad === "" || valorCantidad === "0") {
    cantidad.value = "1";
    valorCantidad = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${deMoneda.value}`;

  btnConvertir.style.opacity = 0.5;
  btnConvertir.style.cursor = "not-allowed";
  btnConvertir.textContent = "CONVIRTIENDO...";
  btnConvertir.disabled = true;

  iconoItercambiarTipoCambio.style.opacity = 0.5;
  iconoItercambiarTipoCambio.style.cursor = "not-allowed";
  iconoItercambiarTipoCambio.style.pointerEvents = "none";

  setTimeout(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        let tipocambio = result.conversion_rates[aMoneda.value];
        let tipocambioTotal = (valorCantidad * tipocambio).toFixed(2);

        textoTipoCambioTotal.style.color = "#000";
        textoTipoCambioTotal.textContent = `${valorCantidad} ${deMoneda.value} = ${tipocambioTotal} ${aMoneda.value}`;

        console.log(result);
        console.log(tipocambio);
        console.log(tipocambioTotal);

        btnConvertir.style.opacity = 1;
        btnConvertir.style.cursor = "pointer";
        btnConvertir.textContent = "CONVERTIR";
        btnConvertir.disabled = false;

        iconoItercambiarTipoCambio.style.opacity = 1;
        iconoItercambiarTipoCambio.style.cursor = "pointer";
        iconoItercambiarTipoCambio.style.pointerEvents = "all";
      })
      .catch(() => {
        textoTipoCambioTotal.style.color = "red";
        textoTipoCambioTotal.textContent =
          "Algo salió mal, verifique su conexión a internet o vuelva a intentar más tarde.";

        btnConvertir.style.opacity = 1;
        btnConvertir.style.cursor = "pointer";
        btnConvertir.textContent = "CONVERTIR";
        btnConvertir.disabled = false;

        iconoItercambiarTipoCambio.style.opacity = 1;
        iconoItercambiarTipoCambio.style.cursor = "pointer";
        iconoItercambiarTipoCambio.style.pointerEvents = "all";
      });
  }, 500);
}
