import React, { useState } from 'react';
import type { Stanza } from '../schemas/data';

interface Props {
  title: string;
  stanzas: Stanza[];
}

export const LitanyCarousel: React.FC<Props> = ({ title, stanzas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group stanzas into pairs (P and S)
  const pairs: Stanza[][] = [];
  for (let i = 0; i < stanzas.length; i += 2) {
    const pair = [stanzas[i]];
    if (i + 1 < stanzas.length) {
      pair.push(stanzas[i + 1]);
    }
    pairs.push(pair);
  }

  const handleNext = () => {
    if (currentIndex < pairs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / pairs.length) * 100;

  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[300px]">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-sm font-medium text-gray-500">
          {currentIndex + 1} / {pairs.length}
        </span>
      </div>

      <div key={currentIndex} className="flex-1 flex flex-col justify-center space-y-4 py-8 transition-opacity duration-300">
        {pairs[currentIndex].map((stanza, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="font-bold text-blue-600 min-w-[1.5rem]">{stanza.role}:</span>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {stanza.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
              currentIndex === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 active:bg-gray-200'
            }`}
          >
            Nazad
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === pairs.length - 1}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
              currentIndex === pairs.length - 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white active:bg-blue-700'
            }`}
          >
            {currentIndex === pairs.length - 1 ? 'Kraj' : 'Dalje'}
          </button>
        </div>
      </div>
    </div>
  );
};
