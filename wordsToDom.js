const outputArea = document.getElementById('output-area');
const textAreaNode = document.getElementById('user-input');
let words =
	'się i w nie na z do to że a o jak ale po co tak za od go już jego jej czy przez tylko tego sobie jeszcze może ze kiedy pan ich dla by gdy teraz ja ten który nawet bardzo przed tu jednak pod coś tam wszystko przy więc nic bo nim żeby miał on być potem też jeśli bez nad gdzie lecz siebie nigdy ani właśnie sam u dobrze niż jakby aby ty oczy zawsze raz były no albo gdyby aż wtedy przecież ona drzwi jako chyba nagle wszyscy jeden czym kto sposób czas kilka dlaczego razem jutro';
words = words.split(' ');

export function newWordsGenerator() {
	resetPreviousWords();
	let wordsFragment = document.createDocumentFragment();
	let randomWords = [];
	for (let i = 0; i < 15; i++) {
		let newWordSpan = document.createElement('span');
		let newWordContent = words[Math.round(Math.random() * 15)];
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
