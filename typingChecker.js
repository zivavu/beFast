import { newWordsGenerator } from './wordsToDom.js';
import { passCorectWords, startWpmTicking } from './wpmMeater.js';
const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');

export let randomWords = newWordsGenerator();

startTypeChecking();
function startTypeChecking() {
	let correctWords = 0,
		wrongWords = 0;

	textAreaNode.addEventListener('input', startWpmTicking, { once: true });

	textAreaNode.addEventListener('input', (e) => {
		let currentWord = randomWords[0];
		if (
			currentWord.match(e.target.value) &&
			e.target.value[0] == currentWord[0]
		) {
			e.target.style.color = 'black';
			outputArea.firstChild.style.color = 'green';
		} else {
			e.target.style.color = 'red';
			outputArea.firstChild.style.color = 'red';
		}
	});
	document.body.onkeydown = function (e) {
		if (e.code == 'Space' || e.code == 'Enter') {
			e.preventDefault();
			randomWords = randomWords.slice(1);
			textAreaNode.value = '';
			if (outputArea.firstChild.style.color == 'green') correctWords++;
			firstChildPop();
			passCorectWords(correctWords);
		}
	};
}
function firstChildPop() {
	outputArea.removeChild(outputArea.firstChild);
}
