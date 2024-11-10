import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../interfaces/ITask';
import { getTaksFromLs, saveTaskToLs } from '../utils/utils';

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['deleteTask'],
		mutationFn: async (id: number) => {
			const tasks: ITask[] = getTaksFromLs();
			const findedTask = tasks.find((task) => task.id === id);
			if (findedTask) {
				tasks.splice(tasks.indexOf(findedTask), 1);
				saveTaskToLs(tasks);
				return tasks; // Возвращаем обновленный список задач
			}
			return tasks;
		},
		onSuccess: (updatedTasks) => {
			// Обновляем кеш с новыми данными
			queryClient.setQueryData(['tasks'], updatedTasks);
		},
	});

	return {
		deleteTask: mutation.mutate,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
	};
}
