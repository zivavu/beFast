import { startTypeChecking } from './typingChecker.js';
const containerNode = document.getElementById('container');
const timeDisplay = document.createElement('span');

export let showWpmMeter,
	showWrongWordAnimation,
	wordsNumber = 60,
	timeLimit = Infinity,
	language;

function settingsConstructior() {
	let settingsSpan = document.createElement('span');
	settingsSpan.id = 'settings';

	let columnOne = document.createElement('column');
	columnOne.classList.add('column');
	let columnTwo = document.createElement('column');
	columnTwo.classList.add('column');
	let columnThree = document.createElement('column');
	columnThree.classList.add('column');

	columnOne.appendChild(createWordRangeDisplay());
	columnOne.appendChild(createWordsRange());

	columnTwo.id = 'time-counter-column';
	columnTwo.appendChild(createTimeDisplayElement());
	columnTwo.appendChild(createLanguageSelectElement());

	columnThree.appendChild(createTimeLimitDisplay());
	columnThree.appendChild(createTimeLimitRange());

	settingsSpan.appendChild(columnOne);
	settingsSpan.appendChild(columnTwo);
	settingsSpan.appendChild(columnThree);
	containerNode.appendChild(settingsSpan);
}
settingsConstructior();

function createWordsRange() {
	const wordsRange = document.createElement('input');
	wordsRange.type = 'range';
	wordsRange.id = 'word-range';
	wordsRange.min = 5;
	wordsRange.max = 300;
	wordsRange.step = 1;
	wordsRange.addEventListener('input', wordChange);
	wordsRange.addEventListener('change', uprateWordsCount);
	wordsRange.value = 60;
	return wordsRange;
}
function wordChange(e) {
	wordsNumber = e.target.value;
	wordLimitDisplayUpdate(wordsNumber);
}
function createWordRangeDisplay() {
	const wordRangeDisplay = document.createElement('span');
	wordRangeDisplay.innerText = 'Word Limit: 60';
	wordRangeDisplay.id = 'word-range-display';
	wordRangeDisplay.classList.add('display');
	return wordRangeDisplay;
}
function wordLimitDisplayUpdate(wordNumber) {
	const wordLimitDisplay = document.getElementById('word-range-display');
	wordLimitDisplay.innerHTML = `Word Limit: ${wordNumber}`;
}

function createTimeLimitRange() {
	const timeLimitRange = document.createElement('input');
	timeLimitRange.id = 'time-limit-range';
	timeLimitRange.type = 'range';
	timeLimitRange.min = 5;
	timeLimitRange.max = 200;
	timeLimitRange.value = timeLimitRange.max;
	timeLimitRange.addEventListener('input', timeChange);
	return timeLimitRange;
}

function createTimeLimitDisplay() {
	const timeLimitDisplay = document.createElement('span');
	timeLimitDisplay.innerText = 'No Time Limit';
	timeLimitDisplay.id = 'time-limit-display';
	timeLimitDisplay.classList.add('display');
	return timeLimitDisplay;
}
function timeChange(e) {
	timeLimit = e.target.value;
	if (e.target.value == e.target.max) timeLimit = Infinity;
	if (timeLimit != Infinity) createTimeDisplayElement();
	timeLimitDisplayUpdate(timeLimit);
}
function timeLimitDisplayUpdate(timeLimit) {
	const timeLimitDisplay = document.getElementById('time-limit-display');
	if (timeLimit == Infinity) {
		timeLimitDisplay.innerHTML = 'No Time Limit';
		timeDisplay.style.visibility = 'hidden';
	} else {
		timeLimitDisplay.innerText = `Time Limit: ${timeLimit}s`;
		timeDisplay.style.visibility = 'visible';
	}
}

function uprateWordsCount() {
	startTypeChecking();
}

//preventing full reload so everything seems smother and i dont have to deal with storeing values
window.onkeydown = (e) => {
	if (e.key === 'r' && e.ctrlKey) {
		e.preventDefault();
		startTypeChecking();
	}
};

function createTimeDisplayElement() {
	if (timeLimit == Infinity) timeDisplay.style.visibility = 'hidden';
	else timeDisplay.style.visibility = 'visible';
	timeDisplay.innerText = timeLimit;
	timeDisplay.id = 'time-display';
	timeDisplay.classList.add('display');
	return timeDisplay;
}

function createLanguageSelectElement() {
	const languageSelect = document.createElement('select');
	languageSelect.id = 'language-select';
	const english = document.createElement('option');
	english.innerText = 'English';
	const polish = document.createElement('option');
	polish.innerText = 'Polish';
	const german = document.createElement('option');
	german.innerText = 'German';
	const french = document.createElement('option');
	french.innerText = 'French';
	languageSelect.append(english, polish, german, french);
	return languageSelect;
}
