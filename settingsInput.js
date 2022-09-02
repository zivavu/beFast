const containerNode = document.getElementById('container');

export let showWpmMeter, showWrongWordAnimation, timeLimit, wordsNumber;

function settingsConstructior() {
	let settingsSpan = document.createElement('span');
	settingsSpan.id = 'settings';

	let columnOne = document.createElement('column');
	columnOne.classList.add('column');
	let columnTwo = document.createElement('column');
	columnTwo.classList.add('column');

	columnOne.appendChild(createWordsRange());
	columnOne.appendChild(createShowMeterCheckbox());
	columnTwo.appendChild(createTimeLimitRange());
	columnTwo.appendChild(createWrongWordAnimationCheckbox());

	settingsSpan.appendChild(columnOne);
	settingsSpan.appendChild(columnTwo);
	containerNode.appendChild(settingsSpan);
}
settingsConstructior();
function createWordsRange() {
	const wordsRange = document.createElement('input');
	wordsRange.type = 'range';
	wordsRange.id = 'word-range';
	wordsRange.min = 0;
	wordsRange.max = 150;
	wordsRange.step = 1;
	return wordsRange;
}

function createTimeLimitRange() {
	const timeLimitRange = document.createElement('input');
	timeLimitRange.id = 'time-limit-range';
	timeLimitRange.type = 'range';
	timeLimitRange.min = 0;
	timeLimitRange.max = 200;
	return timeLimitRange;
}
function createShowMeterCheckbox() {
	const showMeterCheckbox = document.createElement('input');
	showMeterCheckbox.type = 'checkbox';
	showMeterCheckbox.checked = true;
	return showMeterCheckbox;
}

function createWrongWordAnimationCheckbox() {
	const wrongWordAnimationCheckbox = document.createElement('input');
	wrongWordAnimationCheckbox.type = 'checkbox';
	wrongWordAnimationCheckbox.checked = true;
	return wrongWordAnimationCheckbox;
}
