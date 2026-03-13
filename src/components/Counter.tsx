import { useState } from 'react';

/**
 * A simple React component to demonstrate Astro's "islands" architecture.
 * This will only hydrate on the client if you use the 'client:load' directive.
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-sm flex flex-col items-center gap-4 transition-all hover:shadow-md">
      <div className="text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">React Island</h3>
        <p className="text-4xl font-bold tabular-nums text-blue-600 mt-1">{count}</p>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => setCount(c => c - 1)}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors active:scale-95"
          aria-label="Decrement"
        >
          -1
        </button>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors active:scale-95 shadow-sm"
          aria-label="Increment"
        >
          +1
        </button>
      </div>
      
      <p className="text-xs text-slate-400 italic">This component is interactive because of React!</p>
    </div>
  );
}
