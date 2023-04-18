let limiteInvertirColores = 1;

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
sumaInicial = sumarSegundos();

colores = {
  "10": ["#00FF00", "#FFFFFF"],
  "9": ["#32CD32", "#FFFFFF"],
  "8": ["#7CFC00", "#FFFFFF"],
  "7": ["#9ACD32", "#FFFFFF"],
  "6": ["#ADFF2F", "#000000"],
  "5": ["#FFFF00", "#000000"],
  "4": ["#FFA500", "#FFFFFF"],
  "3": ["#FF4500", "#FFFFFF"],
  "2": ["#FF0000", "#FFFFFF"],
  "1": ["#8B0000", "#FFFFFF"]
}

function sumarSegundos(){
  return (horas*60*60) + (minutos*60) + segundos;
}

function inicializarReloj() {
  horas = toInt(getParam('horas'));
  minutos = toInt(getParam('minutos'));
  segundos = toInt(getParam('segundos'));
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
  calcularColores();
  actualizarSpans();
}
inversorColores= false;
function calcularColores(){
  try {
    sumaActual = sumarSegundos();
    valor = Math.round(sumaActual*10/sumaInicial);
    valor = valor.toString();
    if(sumaActual < limiteInvertirColores*60){
      if(inversorColores){
        colorFondo = colores[valor][0];
        colorTexto = colores[valor][1];
      }
      else{
        colorFondo = colores[valor][1];
        colorTexto = colores[valor][0];
      }
      inversorColores = !inversorColores;
    }
    else{
      colorFondo = colores[valor][0];
      colorTexto = colores[valor][1];
    }
    document.querySelector("body").style.backgroundColor =  colorFondo;
    document.querySelector(".contador").style.color =  colorTexto;
  } catch (error) {
    
  }
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
  segundos = toInt(getParam('segundos'));
  actualizarSpans();
}