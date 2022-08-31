import { newWordsGenerator } from './wordsToDom.js';
import { passCorectWords, wpmTicking } from './wpmMeater.js';
const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');
const title = document.getElementById('title');

export let randomWords = newWordsGenerator();

function startTypeChecking() {
	let correctWords = 0,
		wrongWords = 0,
		wordCount = 1,
		isWordRight = false,
		currentWordNode;
	textAreaNode.addEventListener('input', wpmTicking, { once: true });

	textAreaNode.addEventListener('input', (e) => {
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
		} else {
			e.target.style.color = 'red';
			isWordRight = false;
			currentWordNode.style.color = 'red';
		}
	});
	document.body.onkeydown = function (e) {
		if (e.code == 'Space' || e.code == 'Enter') {
			e.preventDefault();
			if (isWordRight && textAreaNode.value.length == randomWords[0].length) {
				correctWords++;
			} else {
				animateWrongWord();
				currentWordNode.style.color = 'red';
			}

			wordCount++;
			randomWords = randomWords.slice(1);
			textAreaNode.value = '';

			if (!randomWords[0]) wpmTicking(false);
			passCorectWords(correctWords);
		}
	};
}
startTypeChecking();

function animateWrongWord() {
	title.style.animation = 'titleFlash 0.5s linear';
	setTimeout(() => (title.style.animation = ''), 500);
}
