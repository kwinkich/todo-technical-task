import { useCallback, useState } from 'react';
import { Button } from './components/button/button.component';
import { Counter } from './components/counter/counter.component';
import { Input } from './components/input/input.component';
import { Task } from './components/task/task.component';
import { useTaskAdd } from './hooks/useAddTask';
import { useDeleteTask } from './hooks/useDeleteTask';
import { useTasks } from './hooks/useTasks';
import { useUpdateTask } from './hooks/useUpdateTask';
import { ITask } from './interfaces/ITask';

function App() {
	const [taskName, setTaskName] = useState<string>(''); // Состояние для название задачи
	const [taskDescription, setTaskDescription] = useState<string>(''); // Состояние для описания задачи

	const { data, isEmpty, complete } = useTasks(); // хук для получения всех задач
	const { mutateTask } = useTaskAdd(); // хук на добавление задачи
	const { updatedTask } = useUpdateTask(); // хук на обновление состояния задачи
	const { deleteTask } = useDeleteTask(); // хук на удаление

	// Обработчик создания задачи
	const handleAddTask = useCallback(() => {
		if (taskName && taskDescription) {
			const newTask: ITask = {
				id: Math.floor(Math.random() * 1000000),
				name: taskName,
				description: taskDescription,
				isComplete: false,
			};
			mutateTask(newTask);
			setTaskName(''); // Очищаем поле после добавления
			setTaskDescription(''); // Очищаем поле после добавления
		}
	}, [taskName, taskDescription, mutateTask]);

	return (
		<>
			<header className='header w-full h-[200px] bg-gray-700 flex justify-center items-center'>
				<div className='logo flex items-center gap-x-3'>
					<img src='/assets/rocket-icon.svg' alt='Logo' />
					<p className='text-4xl font-black'>
						<span className='text-blue'>to</span>
						<span className='text-purple-dark'>do</span>
					</p>
				</div>
			</header>
			<main className='main w-full flex justify-center mt-[-30px]'>
				<div className='container sm:w-[750px] w-[90%] flex flex-col items-center'>
					<div className='sm:flex sm:flex-row sm:gap-x-2 flex flex-col w-full items-center gap-y-2 mb-16'>
						<Input
							onChange={(e) => setTaskName(e.target.value)}
							placeholderText='Название задачи'
						/>
						<Input
							onChange={(e) => setTaskDescription(e.target.value)}
							placeholderText='Описание'
						/>

						<Button
							text='Create'
							iconLink='/assets/plus.svg'
							isDisabled={!taskName || !taskDescription}
							onClick={handleAddTask}
						/>
					</div>

					<div className='w-full flex justify-between items-center mb-6'>
						<div className='flex items-center gap-2'>
							<p className='font-bold text-sm text-blue'>Created tasks</p>
							<Counter count={data?.length} />
						</div>
						<div className='flex items-center gap-2'>
							<p className='font-bold text-sm text-purple'>Completed</p>
							<Counter count={complete} />
						</div>
					</div>

					{isEmpty ? (
						<div className='empty flex flex-col gap-y-4 items-center p-16'>
							<img src='/assets/empty.png' alt='Empty Image' />
							<div className='flex flex-col items-center'>
								<p className='text-base font-bold text-gray-300'>
									You don't have any tasks registered yet
								</p>
								<p className='text-base text-gray-300'>
									Create tasks and organize your to-do items
								</p>
							</div>
						</div>
					) : (
						<div className='tasks w-full flex flex-col gap-3'>
							{data?.map((task: ITask) => (
								<Task
									key={task.id}
									taskData={task}
									onClick={() => updatedTask(task.id)}
									onDelete={() => deleteTask(task.id)}
								/>
							))}
						</div>
					)}
				</div>
			</main>
		</>
	);
}

export default App;
