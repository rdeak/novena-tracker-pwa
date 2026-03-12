import React, { useState, useEffect } from 'react';
import { DataStructure, PrayerLibraryItem } from './types/prayer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrayerCard from './components/prayer/PrayerCard';

function App() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'weekly' | 'novena'>('weekly');
  const [currentLibraryItemId, setCurrentLibraryItemId] = useState<string>('');
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data.json');
        let jsonData: DataStructure;
        if (!response.ok) {
          const altResponse = await fetch('./data.json');
          if (!altResponse.ok) throw new Error('Failed to fetch data');
          jsonData = await altResponse.json();
        } else {
          jsonData = await response.json();
        }
        setData(jsonData);
        
        // Default to first item based on initial page
        const initialItems = jsonData.library.filter(item => item.type === 'weekly');
        if (initialItems.length > 0) {
          setCurrentLibraryItemId(initialItems[0].id);
        }
      } catch (error) {
        console.error('Error loading prayers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    function setAppHeight() {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    }
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const currentLibraryItem = data?.library.find(c => c.id === currentLibraryItemId);
  
  const handlePageChange = (page: 'weekly' | 'novena') => {
    setCurrentPage(page);
    if (page === 'weekly') {
      const initialItems = data?.library.filter(item => item.type === 'weekly') || [];
      if (initialItems.length > 0) {
        setCurrentLibraryItemId(initialItems[0].id);
        setCurrentDayIndex(new Date().getDay());
      } else {
        setCurrentLibraryItemId('');
      }
    } else {
      setCurrentLibraryItemId('');
    }
  };

  const handleLibraryItemChange = (cycleId: string) => {
    if (!cycleId) return;
    setCurrentLibraryItemId(cycleId);
    const cycle = data?.library.find(c => c.id === cycleId);
    if (cycle?.type === 'novena') {
      setCurrentDayIndex(1);
    } else {
      // For weekly prayers, automatically select current day of week
      setCurrentDayIndex(new Date().getDay());
    }
  };

  const handleHomeClick = () => {
    setCurrentLibraryItemId('');
  };

  // Adjusted logic for Sunday (0) in weekly library
  const currentPrayer = currentLibraryItem?.prayers.find(p => p.dayIndex === currentDayIndex);

  const filteredLibrary = data?.library.filter(item => item.type === currentPage) || [];

  const getPageTitle = () => {
    if (currentPage === 'weekly') return 'Tjedne molitve';
    return 'Devetnice';
  };

  const getPageDescription = () => {
    if (currentPage === 'weekly') return 'Odaberite molitvu za svaki dan u tjednu.';
    return 'Pronađite devetnicu i započnite devetodnevni hod.';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onHomeClick={handleHomeClick}
      />

      <main className="flex-grow container mx-auto px-4 py-8 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">Učitavanje...</p>
          </div>
        ) : currentPrayer ? (
          <PrayerCard 
            prayer={currentPrayer} 
            commonOpening={currentLibraryItem?.commonOpening || []}
            commonPrayers={data?.commonPrayers || {}}
            litanies={data?.litanies || {}}
          />
        ) : !currentLibraryItemId ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-gray-900">
                {getPageTitle()}
              </h2>
              <p className="text-gray-500">
                {getPageDescription()}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLibrary.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleLibraryItemChange(item.id)}
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
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Molitva nije pronađena.</p>
            <button 
              onClick={() => {
                if (currentLibraryItem?.type === 'novena') {
                  setCurrentDayIndex(1);
                } else {
                  setCurrentDayIndex(new Date().getDay());
                }
              }}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Povratak na početak
            </button>
          </div>
        )}
      </main>

      {currentLibraryItem && (
        <Footer 
          currentDay={currentDayIndex} 
          onDayChange={setCurrentDayIndex}
          type={currentLibraryItem?.type || 'weekly'}
          totalDays={currentLibraryItem?.prayers.length || 7}
        />
      )}
    </div>
  );
}

export default App;
