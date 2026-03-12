import React, { useState, useEffect } from 'react';
import { DataStructure, PrayerCycle } from './types/prayer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrayerCard from './components/prayer/PrayerCard';

function App() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCycleId, setCurrentCycleId] = useState<string>('weekly-rosaries');
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
        
        // Default to first cycle if available
        if (jsonData.cycles.length > 0) {
          setCurrentCycleId(jsonData.cycles[0].id);
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

  const currentCycle = data?.cycles.find(c => c.id === currentCycleId);
  
  // Adjusted logic for Sunday (0) in weekly cycles
  const adjustedDayIndex = (currentCycle?.type === 'weekly' && currentDayIndex === 0) ? 0 : currentDayIndex;
  const currentPrayer = currentCycle?.prayers.find(p => p.dayIndex === adjustedDayIndex);

  const handleCycleChange = (cycleId: string) => {
    setCurrentCycleId(cycleId);
    const cycle = data?.cycles.find(c => c.id === cycleId);
    if (cycle?.type === 'novena') {
      setCurrentDayIndex(1);
    } else {
      setCurrentDayIndex(new Date().getDay());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header 
        title={currentCycle?.title || data?.title || 'Krunice'} 
        cycles={data?.cycles || []}
        currentCycleId={currentCycleId}
        onCycleChange={handleCycleChange}
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
            commonOpening={currentCycle?.commonOpening || []} 
            commonPrayers={data?.commonPrayers || {}}
          />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">Molitva nije pronađena.</p>
            <button 
              onClick={() => setCurrentDayIndex(currentCycle?.type === 'novena' ? 1 : 1)}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Povratak na početak
            </button>
          </div>
        )}
      </main>

      <Footer 
        currentDay={currentDayIndex} 
        onDayChange={setCurrentDayIndex}
        type={currentCycle?.type || 'weekly'}
        totalDays={currentCycle?.prayers.length || 7}
      />
    </div>
  );
}

export default App;
