import React, {use, useEffect} from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrayerCard from './components/prayer/PrayerCard';
import LibraryList from './components/library/LibraryList';
import PrayerNotFound from './components/ui/PrayerNotFound';
import {getPrayerData} from './hooks/getPrayerData';
import {useViewportHeight} from './hooks/useViewportHeight';
import {useStore} from './store/useStore';

function App() {
  const data = use(getPrayerData());
  const { 
    currentPage, 
    currentLibraryItemId, 
    setCurrentLibraryItemId, 
    currentDayIndex, 
  } = useStore();

  useViewportHeight();

  useEffect(() => {
    if (data && !currentLibraryItemId) {
      const initialItems = data.library.filter(item => item.type === 'weekly');
      if (initialItems.length > 0) {
        setCurrentLibraryItemId(initialItems[0].id, data);
      }
    }
  }, [data]);

  const currentLibraryItem = data.library.find(c => c.id === currentLibraryItemId);
  const currentPrayer = currentLibraryItem?.prayers.find(p => p.dayIndex === currentDayIndex);
  const filteredLibrary = data.library.filter(item => item.type === currentPage) || [];

  const getPageTitle = () => {
    return currentPage === 'weekly' ? 'Tjedne molitve' : 'Devetnice';
  };

  const getPageDescription = () => {
    return currentPage === 'weekly' 
      ? 'Odaberite molitvu za svaki dan u tjednu.' 
      : 'Pronađite devetnicu i započnite devetodnevni hod.';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 pb-32">
        {currentPrayer ? (
          <PrayerCard 
            prayer={currentPrayer} 
            commonOpening={currentLibraryItem?.commonOpening || []}
            commonPrayers={data.commonPrayers || {}}
            litanies={data.litanies || {}}
          />
        ) : !currentLibraryItemId ? (
          <LibraryList 
            data={data}
            items={filteredLibrary}
            title={getPageTitle()}
            description={getPageDescription()}
          />
        ) : (
          <PrayerNotFound currentLibraryItemType={currentLibraryItem?.type} />
        )}
      </main>

      {currentLibraryItem && (
        <Footer 
          type={currentLibraryItem?.type || 'weekly'}
          totalDays={currentLibraryItem?.prayers.length || 7}
        />
      )}
    </div>
  );
}

export default App;
