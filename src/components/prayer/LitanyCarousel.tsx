import React, { useState } from 'react';
import { Verse } from '../../types/prayer';

interface LitanyCarouselProps {
  verses: Verse[];
  title: string;
}

const LitanyCarousel: React.FC<LitanyCarouselProps> = ({ verses, title }) => {
  const pairs: Verse[][] = [];
  for (let i = 0; i < verses.length; i++) {
    const current = verses[i];
    const next = verses[i + 1];

    if (current.role === 'P' && next && next.role === 'S') {
      pairs.push([current, next]);
      i++; // Skip the next one as it's already paired
    } else {
      pairs.push([current]);
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVerse = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pairs.length);
  };

  const prevVerse = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pairs.length) % pairs.length);
  };

  const currentPair = pairs[currentIndex];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-bold text-indigo-400/80 text-sm tracking-wide uppercase">{title}</h5>
        <span className="text-xs font-medium text-indigo-300/70 bg-indigo-50/50 px-2.5 py-1 rounded-full border border-indigo-100/50 shadow-sm tabular-nums">
          {currentIndex + 1} / {pairs.length}
        </span>
      </div>

      <div className="relative overflow-hidden min-h-[160px] flex items-center justify-center py-4">
        <div key={currentIndex} className="w-full animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-col gap-8">
            {currentPair.map((verse, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex gap-4 items-start">
                  <span className={`font-black text-lg min-w-[1.5rem] mt-0.5 ${verse.role === 'P' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                    {verse.role}:
                  </span>
                  <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed italic italic-style-custom">
                    {verse.text}
                  </p>
                </div>
                {verse.repeat && verse.repeat > 1 && (
                  <span className="ml-10 text-sm font-medium text-indigo-400 italic">
                    Ponavlja se {verse.repeat}x
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 gap-4">
        <button
          onClick={prevVerse}
          className="flex-1 py-3 px-4 bg-white border border-indigo-100 text-indigo-600 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all hover:bg-indigo-50 hover:border-indigo-200"
        >
          Prethodno
        </button>
        <button
          onClick={nextVerse}
          className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all hover:bg-indigo-700 hover:shadow-indigo-200"
        >
          Sljedeće
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-1.5 overflow-x-auto py-2 px-4 no-scrollbar">
        {pairs.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full shrink-0 ${
              i === currentIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-indigo-200 hover:bg-indigo-300'
            }`}
            aria-label={`Go to verse ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LitanyCarousel;
