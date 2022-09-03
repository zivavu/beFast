const wpmPointer = document.getElementById('wpm-pointer');
const wpmDisplay = document.getElementById('wpm-display');

let correctWords = 0;
let seconds = 0;
let wpmIntervalId;
export function wpmTicking(run) {
	if (run == false) {
		seconds = 0;
		clearInterval(wpmIntervalId);
		return;
	}
	wpmIntervalId = setInterval(meterUpdate, 250);
	setTimeout(() => (wpmPointer.style.visibility = 'visible'), 250);
}
export function passCorectWords(counter) {
	correctWords = counter;
}
export function meterUpdate() {
	seconds += 0.25;
	let wpm = Math.round((correctWords / seconds) * 60);
	if (wpm / 2 > 90) wpmPointer.style.left = '90%';
	else wpmPointer.style.left = `${wpm / 2}%`;
	wpmDisplay.innerText = wpm;
}
