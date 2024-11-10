import React, { useEffect, useState } from 'react';
import { ITask } from '../../interfaces/ITask';

interface TaskProps {
	taskData: ITask;
	onClick: (id: number) => void;
	onDelete: (id: number) => void;
}

export const Task: React.FC<TaskProps> = ({ taskData, onClick, onDelete }) => {
	const [isChecked, setIsChecked] = useState(taskData.isComplete);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		onClick(taskData.id);
	};

	const handleDelete = () => {
		onDelete(taskData.id);
	};

	useEffect(() => {
		setIsChecked(taskData.isComplete);
	}, [taskData]);

	return (
		<div className='bg-gray-500 p-4 rounded-lg flex items-start gap-3'>
			<div className='check-box pt-[3px]'>
				<input
					className='custom-checkbox'
					type='checkbox'
					id={taskData.id.toString()}
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<label htmlFor={taskData.id.toString()}></label>
			</div>
			<div
				onClick={handleCheckboxChange}
				className='flex flex-col items-start gap-1 flex-1'
			>
				<p
					className={`text-base font-bold ${
						isChecked ? 'line-through text-gray-300' : 'text-white'
					}`}
				>
					{taskData?.name}
				</p>
				<p
					className={`text-sm text-gray-300 ${isChecked ? 'line-through' : ''}`}
				>
					{taskData?.description}
				</p>
			</div>
			<button
				onClick={handleDelete}
				className='px-[6px] py-[5px] rounded-md hover:cursor-pointer hover:bg-gray-400'
			>
				<img
					className='w-[17px] h-[18px]'
					src='src/assets/trash.svg'
					alt='Bin'
				/>
			</button>
		</div>
	);
};
