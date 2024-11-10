import React from 'react';

interface ButtonProps {
	text: string;
	iconLink?: string;
	isDisabled?: boolean;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	iconLink,
	isDisabled,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className='
				flex
				items-center
				justify-center
				min-w-max
				p-4
				h-full
				w-max
				text-sm
				font-bold
				text-gray-100
				bg-blue-dark
				rounded-lg
				gap-x-2
				ease-in-out
				duration-500
				hover:bg-blue
				disabled:bg-gray-400
				disabled:cursor-not-allowed
			'
			disabled={isDisabled}
		>
			{text}
			{iconLink ? <img className='w-4 h-4' src={iconLink} /> : null}
		</button>
	);
};
