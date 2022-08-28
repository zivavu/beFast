import { newWordsGenerator } from './wordsToDom.js';

const textAreaNode = document.getElementById('user-input');
const outputArea = document.getElementById('output-area');

let randomWords = newWordsGenerator();
let wordCounter = 0;

startTypeChecking();
function startTypeChecking() {
	textAreaNode.addEventListener('input', (e) => {
		let currentWord = randomWords[wordCounter];

		if (
			currentWord.match(e.target.value) &&
			e.target.value[0] == currentWord[wordCounter]
		) {
			e.target.style.color = 'black';
			console.log('yup');
		} else {
			e.target.style.color = 'red';
			console.log('nope');
		}
	});
	document.body.onkeydown = function (e) {
		if (e.code == 'Space' || e.code == 'Enter') {
			e.preventDefault();
			randomWords = randomWords.slice(1);
			textAreaNode.value = '';
			firstChildPop();
		}
	};
}
function firstChildPop() {
	outputArea.removeChild(outputArea.firstChild);
}
