const selectListaDivisas = document.querySelectorAll(".lista-divisas select");

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
