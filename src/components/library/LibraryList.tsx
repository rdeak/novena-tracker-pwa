import React from 'react';
import { PrayerLibraryItem, DataStructure } from '../../types/prayer';
import { useStore } from '../../store/useStore';

interface LibraryListProps {
  data: DataStructure;
  items: PrayerLibraryItem[];
  title: string;
  description: string;
}

const LibraryList: React.FC<LibraryListProps> = ({ data, items, title, description }) => {
  const { setCurrentLibraryItemId } = useStore();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-gray-900">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentLibraryItemId(item.id, data)}
            className="group flex flex-col text-left bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {item.type === 'weekly' ? 'Tjedna molitva' : 'Devetnica u 9 dana'}
            </p>
            <div className="mt-4 flex items-center text-indigo-600 font-bold text-sm">
              Započni molitvu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LibraryList;
