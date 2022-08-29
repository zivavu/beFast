const wpmPointer = document.getElementById('wpm-pointer');
const wpmDisplay = document.getElementById('wpm-display');

let correctWords = 0;
let seconds = 0;
let wpmIntervalId;
export function wpmTicking(run) {
	if (run == false) {
		clearInterval(wpmIntervalId);
		return;
	}
	wpmIntervalId = setInterval(meterUpdate, 500);
	setTimeout(() => (wpmPointer.style.visibility = 'visible'), 500);
}
export function passCorectWords(counter) {
	correctWords = counter;
}
export function meterUpdate() {
	seconds += 0.5;
	let wpm = Math.round((correctWords / seconds) * 60);
	wpmPointer.style.left = `${wpm / 2}%`;
	wpmDisplay.innerText = wpm;
}
