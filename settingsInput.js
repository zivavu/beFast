const containerNode = document.getElementById('container');

export let showWpmMeter, showWrongWordAnimation, timeLimit, wordsNumber;

function settingsConstructior() {
	let settingsSpan = document.createElement('span');
	settingsSpan.id = 'settings';
	settingsSpan.appendChild(createWordsRange());
	settingsSpan.appendChild(createTimeLimitRange());
	settingsSpan.appendChild(createShowMeterCheckbox());
	settingsSpan.appendChild(createWrongWordAnimationCheckbox());

	containerNode.appendChild(settingsSpan);
}
settingsConstructior();

function createWordsRange() {
	const wordsRange = document.createElement('input');
	wordsRange.type = 'range';
	wordsRange.classList.add('range');
	wordsRange.min = 0;
	wordsRange.max = 150;
	wordsRange.step = 1;
	return wordsRange;
}

function createTimeLimitRange() {
	const timeLimitRange = document.createElement('input');
	timeLimitRange.classList.add('range');
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
