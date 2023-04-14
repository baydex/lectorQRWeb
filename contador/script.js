let cuentaRegresiva = document.getElementById("cuenta-regresiva");
let segundos = 30;
let actualizarCuentaRegresiva;

function iniciarCuentaRegresiva() {
  // Detenemos la cuenta regresiva si ya estaba corriendo
  clearInterval(actualizarCuentaRegresiva);

  // Creamos una nueva cuenta regresiva
  segundos = 30;
  actualizarCuentaRegresiva = setInterval(function() {
    if (segundos === 0) {
      clearInterval(actualizarCuentaRegresiva);
      cuentaRegresiva.textContent = "¡Tiempo terminado!";
    } else {
      cuentaRegresiva.textContent = segundos + " segundos";
      segundos--;
    }
  }, 1000);
}

// Llamamos a la función iniciarCuentaRegresiva() cuando la página se cargue
window.onload = iniciarCuentaRegresiva;

// Agregamos un botón en la página que reinicie la cuenta regresiva cuando se presione
let reiniciarBoton = document.getElementById("reiniciar-boton");
reiniciarBoton.addEventListener("click", function() {
  iniciarCuentaRegresiva();
});
