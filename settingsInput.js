const containerNode = document.getElementById('container');

export let showWpmMeter, showWrongWordAnimation, timeLimit, wordsNumber;

function settingsConstructior() {
	let settingsSpan = document.createElement('span');
	settingsSpan.id = 'settings';

	let columnOne = document.createElement('column');
	columnOne.classList.add('column');
	let columnTwo = document.createElement('column');
	columnTwo.classList.add('column');

	columnOne.appendChild(createWordRangeDisplay());
	columnOne.appendChild(createWordsRange());
	columnOne.appendChild(createShowMeterCheckbox());

	columnTwo.appendChild(createTimeLimitDisplay());
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
	wordsRange.min = 5;
	wordsRange.max = 150;
	wordsRange.step = 1;
	wordsRange.addEventListener('input', wordChange);
	wordsRange.value = 60;
	return wordsRange;
}

function wordChange(e) {
	wordsNumber = e.target.value;
	if (wordsNumber == e.target.max) wordsNumber = Infinity;
	wordLimitDisplayUpdate(wordsNumber);
}
function wordLimitDisplayUpdate(wordNumber) {
	const wordLimitDisplay = document.getElementById('word-range-display');
	if (wordNumber == Infinity) wordLimitDisplay.innerHTML = 'No Limit';
	else wordLimitDisplay.innerHTML = `Word Limit : ${wordNumber}`;
}
function createWordRangeDisplay() {
	const wordRangeDisplay = document.createElement('span');
	wordRangeDisplay.id = 'word-range-display';
	wordRangeDisplay.classList.add('display');
	return wordRangeDisplay;
}

function createTimeLimitRange() {
	const timeLimitRange = document.createElement('input');
	timeLimitRange.id = 'time-limit-range';
	timeLimitRange.type = 'range';
	timeLimitRange.min = 5;
	timeLimitRange.max = 200;
	timeLimitRange.addEventListener('input', timeChange);
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

function createTimeLimitDisplay() {
	const timeLimitDisplay = document.createElement('span');
	timeLimitDisplay.id = 'time-limit-display';
	timeLimitDisplay.classList.add('display');
	return timeLimitDisplay;
}
function timeChange(e) {
	timeLimit = e.target.value;
	if (e.target.value == 200) timeLimit = Infinity;
	timeLimitDisplayUpdate(timeLimit);
}
function timeLimitDisplayUpdate(timeLimit) {
	const timeLimitDisplay = document.getElementById('time-limit-display');
	if (timeLimit == Infinity) timeLimitDisplay.innerHTML = 'No Limit';
	else timeLimitDisplay.innerText = `Time Limit : ${timeLimit}s`;
}
