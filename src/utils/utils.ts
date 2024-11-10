import { ITask } from '../interfaces/ITask';

export const getTaksFromLs = () => {
	// Получение данных из лс
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

export const saveTaskToLs = (tasks: ITask[]) => {
	// Сохранение данных в лс
	localStorage.setItem('tasks', JSON.stringify(tasks));
};
