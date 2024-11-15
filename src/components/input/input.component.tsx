import React, { ChangeEvent } from 'react';

interface InputProps {
	value: string;
	inputType?: string;
	placeholderText?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
	value,
	inputType = 'text',
	placeholderText = 'World',
	onChange,
}) => {
	return (
		<input
			className='w-full p-4 bg-gray-500 rounded-lg outline-none border-2 border-gray-500 text-base text-white  placeholder:text-gray-300 focus:border-purple-dark'
			value={value}
			type={inputType}
			placeholder={placeholderText}
			onChange={onChange}
		/>
	);
};
