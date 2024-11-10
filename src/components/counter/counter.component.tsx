import React from 'react';

interface CounterProps {
	count?: number;
}

export const Counter: React.FC<CounterProps> = ({ count = 0 }) => {
	return (
		<span className='font-bold text-white text-xs px-2 py-[2px] bg-gray-400 rounded-full'>
			{count}
		</span>
	);
};
