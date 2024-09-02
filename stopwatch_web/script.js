const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const milisecondsElement = document.querySelector('.miliseconds');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const lapsButton = document.querySelector('.laps');
const clearAllButton = document.querySelector('.clear-all');
const lapsContainer = document.querySelector('.laps-container');

let isRunning = false; 
let startTime; 
let lapNumber = 1; 
let pausedTime = 0; 

// Event listeners for buttons
startButton.addEventListener('click', toggleStart);
resetButton.addEventListener('click', resetStopwatch);
lapsButton.addEventListener('click', recordLap);
clearAllButton.addEventListener('click', clearAllLaps);

function toggleStart() {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
}

function startStopwatch() {
    isRunning = true;
    if (pausedTime === 0) {
        startTime = Date.now();
    } else {
        startTime = Date.now() - pausedTime;
        pausedTime = 0; 
    }
    startButton.textContent = 'Pause';
    updateStopwatch();
}
function pauseStopwatch() {
    isRunning = false;
    pausedTime += Date.now() - startTime;
    startButton.textContent = 'Resume';
}
function resumeStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (pausedTime || 0); 
        pausedTime = 0; 
        startButton.textContent = 'Pause';
        updateStopwatch();
    }
}
function updateStopwatch() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const formattedTime = formatTime(currentTime);
        displayTime(formattedTime);
        requestAnimationFrame(updateStopwatch);
    }
}
function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const miliseconds = Math.floor((time % 1000) / 10);

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        miliseconds: String(miliseconds).padStart(2, '0'),
    };
}

function displayTime({ minutes, seconds, miliseconds }) {
    minutesElement.textContent = `${minutes}:`;
    secondsElement.textContent = `${seconds}:`;
    milisecondsElement.textContent = miliseconds;
}
function resetStopwatch() {
    isRunning = false;
    pausedTime = 0; 
    startButton.textContent = 'Start';
    displayTime({ minutes: '00', seconds: '00', miliseconds: '00' });
    lapNumber = 1;
    clearAllLaps();
}
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-stops', 'block');
        lapItem.innerHTML = `<span class="rank">${lapNumber++}) </span>
                             <span class="value">${lapTime.minutes}:${lapTime.seconds}:${lapTime.miliseconds}</span>`;
        lapsContainer.appendChild(lapItem);
    }
}
function clearAllLaps() {
    lapsContainer.innerHTML = '';
    lapNumber = 1;
}

