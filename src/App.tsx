import React, { useState, useEffect } from 'react';
import { DataStructure } from './types/prayer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrayerCard from './components/prayer/PrayerCard';

function App() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          const altResponse = await fetch('./data.json');
          if (!altResponse.ok) throw new Error('Failed to fetch data');
          const jsonData = await altResponse.json();
          setData(jsonData);
        } else {
          const jsonData = await response.json();
          setData(jsonData);
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

  const currentPrayer = data?.prayers.find(p => p.dayIndex === currentDayIndex);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header title={data?.title || 'Krunice'} />

      <main className="flex-grow container mx-auto px-4 py-8 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">Učitavanje...</p>
          </div>
        ) : currentPrayer ? (
          <PrayerCard 
            prayer={currentPrayer} 
            commonOpening={data?.commonOpening || []} 
          />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Molitva za ovaj dan nije pronađena.</p>
            <button 
              onClick={() => setCurrentDayIndex(1)}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Povratak na Ponedjeljak
            </button>
          </div>
        )}
      </main>

      <Footer 
        currentDay={currentDayIndex} 
        onDayChange={setCurrentDayIndex} 
      />
    </div>
  );
}

export default App;
