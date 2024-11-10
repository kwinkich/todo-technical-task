import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../interfaces/ITask';
import { getTaksFromLs, saveTaskToLs } from '../utils/utils';

export function useTaskAdd() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['addNewTask'],
		mutationFn: async (task: ITask) => {
			const tasks = getTaksFromLs();
			tasks.push(task);
			saveTaskToLs(tasks);
			return task;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
		onError: (error) => {
			console.error('Error adding task:', error);
		},
	});

	return {
		mutateTask: mutation.mutate,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
	};
}
