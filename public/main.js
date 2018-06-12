/* global document, fetch, FormData */
/* eslint no-console:0 */

document.documentElement.classList.remove('core');
document.documentElement.classList.add('enhanced');

const flags = Array.from(document.querySelectorAll('[data-flag]'));
const togglers = Array.from(document.querySelectorAll('[data-flag] input[type="radio"]'));
const toggleFlagUi = (form, newState) => {
	const toggleState = (form, model) => {
		form.classList.toggle('flag--on', model.state === 'on');
		form.classList.toggle('flag--off', model.state === 'off');
	};

	fetch(form.action, {
		credentials: 'same-origin',
		method: 'POST',
		body: JSON.stringify({
			state: newState
		}),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	.then(res => res.json())
	.then(model => toggleState(form, model))
	.catch(console.error);
};
const onSubmit = ev => {
	ev.preventDefault();
	const newState = new FormData(ev.target).get('state');
	toggleFlagUi(ev.target, newState);
};
const onToggle = ev => {
	const newState = ev.target.value;
	toggleFlagUi(ev.target.form, newState);
};
const setUpFlags = flag => flag.addEventListener('submit', onSubmit);
const setUpTogglers = toggler => toggler.addEventListener('change', onToggle);

flags.forEach(setUpFlags);
togglers.forEach(setUpTogglers);
