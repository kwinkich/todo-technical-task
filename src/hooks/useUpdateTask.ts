import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../interfaces/ITask';
import { getTaksFromLs, saveTaskToLs } from '../utils/utils';

export function useUpdateTask() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['updateTask'],
		mutationFn: async (id: number) => {
			const tasks: ITask[] = getTaksFromLs();
			const findedTask = tasks.find((task) => task.id === id);
			if (findedTask) {
				findedTask.isComplete = !findedTask.isComplete;
				saveTaskToLs(tasks);
				return tasks; // Возвращаем обновленный список задач
			}
			return tasks; // Возвращаем актуальный список задач в случае ошибки
		},
		onSuccess: (updatedTasks) => {
			// Обновляем кеш с новыми данными
			queryClient.setQueryData(['tasks'], updatedTasks);
			// После обновления задач можно сразу пересчитать количество выполненных
			const completedCount = updatedTasks.filter(
				(task: ITask) => task.isComplete
			).length;
			// Обновление счетчика выполненных задач
			queryClient.setQueryData(['completedCount'], completedCount);
		},
	});

	return {
		updatedTask: mutation.mutate,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
	};
}
