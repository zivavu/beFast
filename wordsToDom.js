import { english, french, german, polish } from './languages.js';
import { startTypeChecking } from './typingChecker.js';
const outputArea = document.getElementById('output-area');
const textAreaNode = document.getElementById('user-input');
const languageSelectElement = document.getElementById('language-select');
let words = english.split(' ');

export function newWordsGenerator(wordsToGenerate) {
	resetPreviousWords();
	let wordsFragment = document.createDocumentFragment();
	let randomWords = [];
	for (let i = 0; i < wordsToGenerate; i++) {
		let newWordSpan = document.createElement('span');
		let newWordContent = words[Math.ceil(Math.random() * (words.length - 1))];
		randomWords.push(newWordContent);
		newWordSpan.innerText = newWordContent;
		newWordSpan.classList.add('output-word');
		wordsFragment.appendChild(newWordSpan);
	}
	outputArea.appendChild(wordsFragment);
	return randomWords;
}
function resetPreviousWords() {
	outputArea.innerHTML = '';
	textAreaNode.value = '';
}

languageSelectElement.addEventListener('change', changeLanguage);

function changeLanguage() {
	switch (languageSelectElement.value) {
		case 'English':
			words = english.split(' ');
			break;
		case 'Polish':
			words = polish.split(' ');
			break;
		case 'German':
			words = german.split(' ');
			break;
		case 'French':
			words = french.split(' ');
			break;
	}
	startTypeChecking();
}
