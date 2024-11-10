import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ITask } from '../interfaces/ITask';
import { getTaksFromLs } from '../utils/utils';

export function useTasks() {
	const [isEmpty, setIsEmpty] = useState(true);
	const [complete, setComplete] = useState<number>(0);

	const { data, error, isSuccess } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTaksFromLs,
	});

	useEffect(() => {
		if (isSuccess && data && data.length > 0) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}

		if (data) {
			const completedCount = data.filter(
				(task: ITask) => task.isComplete
			).length;
			setComplete(completedCount);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (error) {
			setIsEmpty(true);
		}
	}, [error]);

	return { data, isEmpty, error, isSuccess, complete };
}
