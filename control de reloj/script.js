let countdown;
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');

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
  timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  timer((hours * 3600) + (minutes * 60));
});

pauseButton.addEventListener('click', () => {
  clearInterval(countdown);
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  displayTimeLeft(0);
  hoursInput.value = 0;
  minutesInput.value = 0;
});
