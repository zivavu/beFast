import { newWordsGenerator } from './wordsToDom.js';
import { passCorectWords, startWpmTicking } from './wpmMeater.js';
const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');
const title = document.getElementById('title');

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
			if (
				outputArea.firstChild.style.color == 'green' &&
				textAreaNode.value.length == randomWords[0].length
			) {
				correctWords++;
			} else animateWrongWord();
			randomWords = randomWords.slice(1);
			textAreaNode.value = '';

			firstChildPop();
			passCorectWords(correctWords);
		}
	};
}

function firstChildPop() {
	outputArea.removeChild(outputArea.firstChild);
}

function animateWrongWord() {
	title.style.animation = 'titleFlash 0.5s linear';
	setTimeout(() => (title.style.animation = ''), 500);
}
