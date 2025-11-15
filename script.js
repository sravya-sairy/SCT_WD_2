let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let laps = JSON.parse(localStorage.getItem("laps")) || [];

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Display saved laps
laps.forEach((lap, index) => {
  const li = document.createElement("li");
  li.textContent = `Lap ${index + 1}: ${lap}`;
  lapsContainer.appendChild(li);
});

// Button listeners
document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", recordLap);
themeToggle.addEventListener("click", toggleTheme);

function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00.00";
  laps = [];
  lapsContainer.innerHTML = "";
  localStorage.removeItem("laps");
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;
    laps.push(lapTime);
    localStorage.setItem("laps", JSON.stringify(laps));
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsContainer.appendChild(li);
  }
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;

  let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let milliseconds = Math.floor((updatedTime % 1000) / 10);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
}
