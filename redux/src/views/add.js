import { addTask } from '../actions/task';

export default class Add {
	constructor (store) {
		this.store = store;
		this.draw();
	};

	onBtnClick () {
		this.store.dispatch(addTask(this.input.value));
		this.input.value = '';
	}

	draw () {
		this.input = document.createElement('input');
		document.body.appendChild(this.input);

		this.btn = document.createElement('button');
		this.btn.innerText = 'Add';
		this.btn.addEventListener('click', this.onBtnClick.bind(this));
		document.body.appendChild(this.btn);
	}
};