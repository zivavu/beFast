import { timeLimit } from './settingsInput.js';
import { endScreen } from './typingChecker.js';
const wpmPointer = document.getElementById('wpm-pointer');
const wpmDisplay = document.getElementById('wpm-display');
const timeDisplay = document.getElementById('time-display');
let correctWords = 0;
let seconds = 0;
let wpmIntervalId;
let wpmUpdateMs = 125;

export function wpmTicking(run) {
	if (run == false) {
		timeDisplay.innerText = timeLimit;
		seconds = 0;
		clearInterval(wpmIntervalId);
	} else {
		wpmIntervalId = setInterval(meterUpdate, wpmUpdateMs);
		setTimeout(() => (wpmPointer.style.visibility = 'visible'), wpmUpdateMs);
	}
}
export function passCorectWords(counter) {
	correctWords = counter;
}
export function meterUpdate() {
	if (seconds >= timeLimit) {
		endScreen();
		return;
	}
	seconds += wpmUpdateMs / 1000;
	if (seconds % 1 == 0) timeDisplayUpdate();
	let wpm = Math.round((correctWords / seconds) * 60);

	//preventing element overflow
	if (wpm / 2 > 90) wpmPointer.style.left = '90%';
	else wpmPointer.style.left = `${wpm / 2}%`;
	wpmDisplay.innerText = wpm;
}

function timeDisplayUpdate() {
	timeDisplay.innerText = timeLimit - seconds;
}
