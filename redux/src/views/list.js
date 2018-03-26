import { removeTask } from '../actions/task';

export default class List {
	constructor (store) {
		this.store = store;
		this.init();
		this.store.subscribe(this.updateList.bind(this));
	};

	init () {
		this.listElement = document.createElement('ul');
		document.body.appendChild(this.listElement);
	};

	onDelClick (evt) {
		const id = evt.target.getAttribute('data-id');
		this.store.dispatch(removeTask(id));
	}

	updateList () {
		const { tasks } = this.store.getState().tasks;

		this.listElement.innerHTML = '';

		tasks.forEach((task, i) => {
			const taskItem = document.createElement('li');
			taskItem.innerText = task;
			const removeBtn = document.createElement('button');
			removeBtn.innerText = 'Del';
			removeBtn.setAttribute('data-id', i);
			removeBtn.addEventListener('click', this.onDelClick.bind(this));
			taskItem.appendChild(removeBtn);
			this.listElement.appendChild(taskItem);
		});
	};
};