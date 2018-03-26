export const ADD_TASK = 'ADD_TASK';
export const addTask = (task) => ({ type: ADD_TASK, task });

export const REMOVE_TASK = 'REMOVE_TASK';
export const removeTask = (task) => ({ type: REMOVE_TASK, task });