let containerNode = document.getElementById('container');

function settingsConstructior() {
	let settingsSpan = document.createElement('span');
	settingsSpan.classList.add('settings');
	settingsSpan.innerText = 'Settings';
	containerNode.appendChild(settingsSpan);
}
settingsConstructior();
