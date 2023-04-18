let countdown;

const horasSpan = elemento("hora");
const minutosSpan = elemento("minuto");
const segundosSpan = elemento("segundo");

var statusBoton = true;
const urlParams = new URLSearchParams(window.location.search);
var horas;
var minutos;
var segundos;
inicializarReloj();


function inicializarReloj() {
  horas = toInt(getParam('horas'));
  minutos = toInt(getParam('minutos'));
  segundos = 0;
  reiniciarContador();
}

function getParam(id) {
  return urlParams.get(id);
}

function toInt(data) {
  try {
    return parseInt(data);
  } catch (error) {
    return 0;
  }
}

function elemento(id) {
  return document.getElementById(id);
}


function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainderSeconds = seconds % 60;
  const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  horas = hours;
  minutos = minutes;
  segundos = remainderSeconds;

  actualizarSpans();
}

function actualizarSpans() {
  insertarValorSpan(horasSpan, horas);
  insertarValorSpan(minutosSpan, minutos);
  insertarValorSpan(segundosSpan, segundos);
}

function insertarValorSpan(elemento, valor) {
  elemento.textContent = formatearSpan(valor);
}

function formatearSpan(valor) {
  var numeroConFormato;
  if (valor < 10) {
    numeroConFormato = `0${valor}`;
  }
  else {
    numeroConFormato = valor;
  }
  return numeroConFormato;
}

window.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    controladorReloj();
  }
});

window.addEventListener("click", function (event) {
  controladorReloj();
});


elemento("boton-reiniciar").addEventListener("click", function (event) {
  reiniciarContador();
});

function controladorReloj() {
  if (statusBoton == true) {
    timer((horas * 3600) + (minutos * 60) + segundos);
  }
  else {
    clearInterval(countdown);
  }
  statusBoton = !statusBoton;
}

function reiniciarContador() {
  clearInterval(countdown);
  horas = toInt(getParam('horas'));
  minutos = toInt(getParam('minutos'));
  segundos = 0;
  actualizarSpans();
}