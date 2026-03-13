import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
			<p className="text-lg font-medium">React Island: Interactive Counter</p>
			<div className="flex items-center gap-6">
				<button 
					onClick={() => setCount((c) => c - 1)}
					className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
					aria-label="Decrement"
				>
					-
				</button>
				<span className="text-2xl font-mono tabular-nums min-w-[3ch] text-center">
					{count}
				</span>
				<button 
					onClick={() => setCount((c) => c + 1)}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
					aria-label="Increment"
				>
					+
				</button>
			</div>
			<p className="text-xs text-gray-400 italic">This component is hydrated on the client.</p>
		</div>
	);
}
