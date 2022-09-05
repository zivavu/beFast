import { wordsNumber } from './settingsInput.js';
import { newWordsGenerator } from './wordsToDom.js';
import { passCorectWords, wpmTicking } from './wpmMeater.js';
const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');
const title = document.getElementById('title');
const wpmDisplayNode = document.getElementById('wpm-display');

export let randomWords;

let correctWords = 0,
	wrongWords = 0,
	correctKeystrokes = 0,
	wrongKeystrokes = 0,
	isWordRight = false,
	wordCount = 1,
	currentKeyStroke = 0,
	currentWordNode,
	wordsInRow;

//setting up input event listeners and preparing variables
export function startTypeChecking() {
	textAreaNode.disabled = false;
	textAreaNode.removeEventListener('input', getUserInput);

	randomWords = newWordsGenerator(wordsNumber);

	resetStyling();
	resetEndScreenWpmDisplay();
	wpmTicking(false);

	correctWords = 0;
	wrongWords = 0;
	correctKeystrokes = 0;
	wrongKeystrokes = 0;
	isWordRight = false;
	wordCount = 1;
	currentKeyStroke = 0;
	wordsInRow = getLastWordInLine();

	currentWordNode = document.querySelector(
		`#output-area :nth-child(${wordCount})`
	);

	textAreaNode.addEventListener('input', wpmTicking, { once: true });

	// user letters input handling
	textAreaNode.addEventListener('input', getUserInput);
}
startTypeChecking();

//handles user input and styling of output // used in event listener
function getUserInput(e) {
	//preventing empty and after ending screen input
	if (!randomWords[0] || e.data == ' ') {
		textAreaNode.value = '';
		return;
	}
	currentKeyStroke = e.target.value.length - 1;
	e.target.value = e.target.value.toLowerCase();
	let currentWord = randomWords[0];

	if (
		currentWord.slice(0, currentKeyStroke + 1) == e.target.value &&
		e.target.value.slice(currentKeyStroke) === currentWord[currentKeyStroke]
	) {
		e.target.style.color = 'black';
		isWordRight = true;
		currentWordNode.style.color = 'green';
		correctKeystrokes++;
	} else {
		e.target.style.color = 'red';
		isWordRight = false;
		currentWordNode.style.color = 'darkred';
		wrongKeystrokes++;
	}
}

// word submiting and style handling
document.body.onkeydown = (e) => {
	//preventing empty input submitting
	if (e.target.id != 'user-input' || e.target.value == '') return;
	if (e.code != 'Space' && e.code != 'Enter') return;
	e.preventDefault();

	let previousWordNode = currentWordNode;
	//reseting previousWord styling
	previousWordNode.style.textDecoration = 'none';
	previousWordNode.style.textShadow = 'none';

	nextWordStyling(wordCount);

	//changing currentWordNode to next one
	wordCount++;
	currentWordNode = document.querySelector(
		`#output-area :nth-child(${wordCount})`
	);

	if (isWordRight && textAreaNode.value == randomWords[0]) {
		correctWords++;
	} else {
		wrongWords++;
		animateTitleWhenWordWrong();
		previousWordNode.style.color = 'darkred';
		wrongKeystrokes = wrongKeystrokesCount(randomWords[0], wrongKeystrokes);
	}

	// handling jump to new line
	if (wordsInRow.length == wordCount - 1 && randomWords.length > 5) {
		wordsInRow.forEach((word) => word.remove());
		wordsInRow = getLastWordInLine();
		wordCount = 1;
	}

	currentKeyStroke = 0;
	textAreaNode.value = '';
	randomWords = randomWords.slice(1);

	if (!randomWords[0]) {
		endScreen();
	}

	passCorectWords(correctWords);
};

//gets the last word from current words placement on that particular vievport and returns node with that word
function getLastWordInLine() {
	let n = 1;
	let wordNodesArr = document.querySelector('#output-area').childNodes;
	let wordsInRow = [];
	let currentWord = wordNodesArr[n],
		previousWord = wordNodesArr[n - 1];
	let previousRect = previousWord.getBoundingClientRect(),
		currentRect = currentWord.getBoundingClientRect();

	while (wordNodesArr[n] && currentRect.right > previousRect.right) {
		currentWord = wordNodesArr[n];
		previousWord = wordNodesArr[n - 1];
		previousRect = previousWord.getBoundingClientRect();
		currentRect = currentWord.getBoundingClientRect();
		wordsInRow.push(previousWord);
		n++;
	}
	return wordsInRow;
}

//handles situations where word input is shorter then target word
function wrongKeystrokesCount(word, wrongKeystrokes) {
	wrongKeystrokes += word.length - textAreaNode.value.length;
	return wrongKeystrokes;
}

//adds styling to the word that user is/will be writing
function nextWordStyling(wordCount) {
	if (!randomWords[1]) return;
	let nextWord = document.querySelector(
		`#output-area :nth-child(${wordCount + 1})`
	);
	nextWord.style.textDecoration = 'underline';
	nextWord.style.textShadow = '0 0 0.5vmin grey';
}

export function endScreen() {
	animateEndScreenWpmDisplay();
	outputArea.innerHTML = '';

	//disabling and clearing input text area, also some spaghetti to prevent full page reloading with ctrl + r
	document.getElementById('word-range').focus();
	textAreaNode.style.fontWeight = '600';
	textAreaNode.style.fontSize = '3.5vh';
	textAreaNode.disabled = true;
	textAreaNode.style.textAlign = 'center';
	textAreaNode.value = 'Press Ctrl + R to restart';
	textAreaNode.style.color = 'black';
	document.getElementById('language-select').style.visibility = 'visible';

	//stoping the wpm timer
	wpmTicking(false);

	//setting up the end screen elements
	let frag = document.createDocumentFragment();
	let corWordsNode = document.createElement('span');
	corWordsNode.innerText =
		'Correct Words: ' + correctWords + '/' + (correctWords + wrongWords);

	if (wrongWords == 0) corWordsNode.style.color = 'green';
	else corWordsNode.style.color = 'black';

	frag.appendChild(corWordsNode);
	let accuracyNode = document.createElement('span');
	accuracyNode.innerText =
		'Correct Keystrokes: ' +
		correctKeystrokes +
		'/' +
		(correctKeystrokes + wrongKeystrokes) +
		'	Accuracy: ' +
		Math.round(
			(correctKeystrokes / (correctKeystrokes + wrongKeystrokes)) * 100
		) +
		'%';
	frag.appendChild(accuracyNode);
	outputArea.style.flexDirection = 'column';
	outputArea.style.flexWrap = 'nowrap';
	outputArea.appendChild(frag);
}

function animateEndScreenWpmDisplay() {
	wpmDisplayNode.style.top = '-3vmin';
	wpmDisplayNode.style.width = '15vmin';
	wpmDisplayNode.style.height = '10vmin';
	wpmDisplayNode.style.fontSize = '4vmin';
	wpmDisplayNode.innerText += '\nWPM';
	wpmDisplayNode.style.boxShadow = '0 0 0.5vmin 0.5vmin darkred';
}

function resetEndScreenWpmDisplay() {
	wpmDisplayNode.style.top = '110%';
	wpmDisplayNode.style.width = '6vmin';
	wpmDisplayNode.style.height = '4vmin';
	wpmDisplayNode.style.fontSize = '3vmin';
	wpmDisplayNode.style.boxShadow = '0 0 1vmin 0.5vmin rgb(0, 0, 0)';
	wpmDisplayNode.innerText = wpmDisplayNode.innerText.slice(0, 3);
}

function animateTitleWhenWordWrong() {
	title.style.animation = 'titleFlash 0.5s linear';
	setTimeout(() => (title.style.animation = ''), 500);
}

function resetStyling() {
	textAreaNode.focus();
	textAreaNode.style.fontWeight = '';
	textAreaNode.style.fontSize = '8vh';
	textAreaNode.style.color = 'black';
	textAreaNode.style.textAlign = 'left';
	outputArea.style.color = 'black';
	outputArea.style.flexDirection = 'row';
	outputArea.style.flexWrap = 'wrap';
	outputArea.firstChild.style.textDecoration = 'underline';
	outputArea.firstChild.style.textShadow = '0 0 0.5vmin grey';
}
