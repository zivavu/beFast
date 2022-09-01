import { newWordsGenerator } from './wordsToDom.js';
import { passCorectWords, wpmTicking } from './wpmMeater.js';
const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');
const title = document.getElementById('title');
const wpmDisplayNode = document.getElementById('wpm-display');

export let randomWords = newWordsGenerator();

function startTypeChecking() {
	textAreaNode.focus();
	outputArea.style.flexDirection = 'row';
	outputArea.style.flexWrap = 'wrap';
	outputArea.firstChild.style.textDecoration = 'underline';
	outputArea.firstChild.style.textShadow = '0 0 0.5vmin grey';

	let correctWords = 0,
		wrongWords = 0,
		wordCount = 1,
		correctKeystrokes = 0,
		wrongKeystrokes = 0,
		isWordRight = false,
		currentWordNode;
	let wordsInRow = getLastWordInLine();

	textAreaNode.addEventListener('input', wpmTicking, { once: true });

	textAreaNode.addEventListener('input', (e) => {
		if (e.data == null) return;
		e.target.value = e.target.value.toLowerCase();
		let currentWord = randomWords[0];
		currentWordNode = document.querySelector(
			`#output-area :nth-child(${wordCount})`
		);
		if (
			currentWord.match(e.target.value) &&
			e.target.value[0] == currentWord[0]
		) {
			e.target.style.color = 'black';
			isWordRight = true;
			currentWordNode.style.color = 'green';
			correctKeystrokes++;
		} else {
			e.target.style.color = 'red';
			isWordRight = false;
			currentWordNode.style.color = 'red';
			wrongKeystrokes++;
		}
	});
	document.body.onkeydown = function (e) {
		if (e.code == 'Space' || e.code == 'Enter') {
			e.preventDefault();
			currentWordNode.style.textDecoration = 'none';
			currentWordNode.style.textShadow = '0 0 0.5vmin grey';

			nextWordStyling(wordCount);
			if (isWordRight && textAreaNode.value.length == randomWords[0].length) {
				correctWords++;
			} else {
				wrongWords++;
				animateWrongWord();
				currentWordNode.style.color = 'red';
				wrongKeystrokes = wrongKeystrokesCount(randomWords[0], wrongKeystrokes);
			}

			if (
				wordsInRow[wordsInRow.length - 1] == currentWordNode &&
				randomWords.length > 5
			) {
				wordsInRow.forEach((word) => word.remove());
				wordsInRow = getLastWordInLine();
				wordCount = 0;
			}
			wordCount++;
			randomWords = randomWords.slice(1);
			textAreaNode.value = '';

			if (!randomWords[0])
				endScreen(correctWords, wrongWords, correctKeystrokes, wrongKeystrokes);

			passCorectWords(correctWords);
		}
	};
}
startTypeChecking();

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

function wrongKeystrokesCount(word, wrongKeystrokes) {
	wrongKeystrokes += word.length - textAreaNode.value.length;
	return wrongKeystrokes;
}
function nextWordStyling(wordCount) {
	if (!randomWords[1]) return;
	let nextWord = document.querySelector(
		`#output-area :nth-child(${wordCount + 1})`
	);
	nextWord.style.textDecoration = 'underline';
	nextWord.style.textShadow = '0 0 0.5vmin grey';
}

function endScreen(corWords, wrongWords, corKeys, wrongKeys) {
	animateEndScreenWpmDisplay();

	wpmTicking(false);
	outputArea.innerHTML = '';
	let frag = document.createDocumentFragment();
	let corWordsNode = document.createElement('span');
	corWordsNode.innerText =
		'Correct Words: ' + corWords + '/' + (corWords + wrongWords);

	if (wrongWords == 0) corWordsNode.style.color = 'green';
	else corWordsNode.style.color = 'black';

	frag.appendChild(corWordsNode);
	let accuracyNode = document.createElement('span');
	accuracyNode.innerText =
		'Correct Keystrokes: ' +
		corKeys +
		'/' +
		(corKeys + wrongKeys) +
		'	Accuracy: ' +
		Math.round((corKeys / (corKeys + wrongKeys)) * 100) +
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
	wpmDisplayNode.style.boxShadow = '0 0 2vmin 1vmin red';
}

function animateWrongWord() {
	title.style.animation = 'titleFlash 0.5s linear';
	setTimeout(() => (title.style.animation = ''), 500);
}
