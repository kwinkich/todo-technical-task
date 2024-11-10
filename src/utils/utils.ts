import { ITask } from '../interfaces/ITask';

export const getTaksFromLs = () => {
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

export const saveTaskToLs = (tasks: ITask[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};
