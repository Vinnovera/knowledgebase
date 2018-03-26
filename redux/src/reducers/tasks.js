import { ADD_TASK, REMOVE_TASK } from '../actions/task';

const initialState = {
	tasks: []
};

export default function Tasks (state = initialState, action) {
	const tasks = [...state.tasks];
	switch (action.type) {
		case ADD_TASK:
			tasks.push(action.task);
			return {
				...state,
				tasks
			};
		case REMOVE_TASK:
			tasks.splice(action.task, 1);
			return {
				...state,
				tasks
			};
		default:
			return state
	}
}