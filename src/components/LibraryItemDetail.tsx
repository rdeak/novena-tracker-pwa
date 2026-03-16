import React, {useEffect, useState} from 'react';
import type {LibraryItem} from '../schemas/data';
import {PrayerItemDisplay, SectionDisplay} from './PrayerDisplay';
import {usePersistence} from '../hooks/usePersistence';
import {Link} from "@/components/Link.tsx";

interface Props {
  item: LibraryItem;
  initialDay?: number;
}

export const LibraryItemDetail: React.FC<Props> = ({ item, initialDay }) => {
  const [selectedDay, setSelectedDay] = useState(initialDay !== undefined ? initialDay : 1);
  const [completedDays, setCompletedDays] = usePersistence<Record<string, string[]>>('novena-tracker-completed', {});
  const [startDates, setStartDates] = usePersistence<Record<string, string>>('novena-tracker-start-dates', {});

  useEffect(() => {
    if (initialDay !== undefined) {
      setSelectedDay(initialDay);
    }
  }, [initialDay]);

  useEffect(() => {
    if (initialDay === undefined) {
      let targetDay = 1;
      if (item.type === 'weekly') {
        targetDay = new Date().getDay();
      } else if (item.type === 'novena') {
        const completed = completedDays[item.id] || [];
        // Default to the first uncompleted day
        for (let i = 1; i <= 9; i++) {
          if (!completed.includes(i.toString())) {
            targetDay = i;
            break;
          }
        }
      }
      
      // Client-side redirect to the specific day route
      window.location.replace(`/library/${item.id}/day/${targetDay}`);
    }
  }, [initialDay, item.id, item.type, completedDays]);

  const currentItemCompleted = completedDays[item.id] || [];

  const toggleDayCompletion = (dayIndex: number) => {
    setCompletedDays(prev => {
      const current = prev[item.id] || [];
      const dayStr = dayIndex.toString();
      if (current.includes(dayStr)) {
        return { ...prev, [item.id]: current.filter(d => d !== dayStr) };
      } else {
        return { ...prev, [item.id]: [...current, dayStr] };
      }
    });

    if (!startDates[item.id]) {
       const today = new Date();
       today.setHours(0, 0, 0, 0);
       setStartDates(prev => ({ ...prev, [item.id]: today.toISOString() }));
    }
  };

  const resetProgress = () => {
    if (window.confirm('Jeste li sigurni da želite resetirati sav napredak za ovu devetnicu?')) {
      setCompletedDays(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
      setStartDates(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    }
  };

  if (item.type === 'weekly') {
    const prayer = item.prayers.find(p => p.dayIndex === selectedDay) || item.prayers[0];
    
    if (!prayer) return null;

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {item.prayers.map(p => (
              <Link
                key={p.dayIndex}
                href={`/library/${item.id}/day/${p.dayIndex}`}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedDay === p.dayIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {p.day}
              </Link>
            ))}
          </div>
        </header>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
           <div className="mb-6">
             <h2 className="text-2xl font-bold text-gray-800">{prayer.title}</h2>
             <p className="text-blue-600 font-medium">Tema: {prayer.theme}</p>
           </div>
           
           <div className="space-y-4">
             {prayer.sections.map((section, idx) => (
               <SectionDisplay key={idx} section={section} />
             ))}
           </div>
        </article>
      </div>
    );
  }

  // Novena
  const day = item.days.find(d => d.dayIndex === selectedDay) || item.days[0];
  
  if (!day) return null;

  const isCompleted = currentItemCompleted.includes(selectedDay.toString());

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
          {currentItemCompleted.length > 0 && (
            <button 
              onClick={resetProgress}
              className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors mt-2"
            >
              Resetiraj
            </button>
          )}
        </div>
        {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
        
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 mt-4">
          {item.days.map(d => (
            <Link
              key={d.dayIndex}
              href={`/library/${item.id}/day/${d.dayIndex}`}
              className={`h-10 w-10 rounded-lg text-sm font-medium flex items-center justify-center transition-all ${
                selectedDay === d.dayIndex
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                  : currentItemCompleted.includes(d.dayIndex.toString())
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {d.dayIndex}
            </Link>
          ))}
        </div>
      </header>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{day.title}</h2>
            {day.theme && <p className="text-blue-600 font-medium">Tema: {day.theme}</p>}
          </div>
          <button
            onClick={() => toggleDayCompletion(selectedDay)}
            className={`p-2 rounded-full transition-colors ${
              isCompleted ? 'text-green-600 bg-green-50' : 'text-gray-300 hover:text-green-500 bg-gray-50'
            }`}
            title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Render Uvod if exists */}
          {item.template.uvod && item.template.uvod.map((p, i) => (
             <PrayerItemDisplay key={`uvod-${i}`} item={p} />
          ))}

          {/* Dnevna molitva */}
          <div className="py-4 border-y border-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Dnevna molitva</h3>
            {day.dnevna_molitva.map((p, i) => (
              <PrayerItemDisplay key={`day-${i}`} item={p} />
            ))}
          </div>

          {/* Render others from template */}
          {Object.entries(item.template).map(([key, prayers]) => {
            if (key === 'uvod') return null;
            return (
              <div key={key}>
                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 mt-6">{key.replace('_', ' ')}</h3>
                {prayers.map((p, i) => (
                  <PrayerItemDisplay key={`${key}-${i}`} item={p} />
                ))}
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 flex justify-center">
             <button
                onClick={() => toggleDayCompletion(selectedDay)}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  isCompleted 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700' 
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
                }`}
             >
               {isCompleted ? 'Dovršeno!' : 'Označi kao dovršeno'}
             </button>
        </div>
      </article>
    </div>
  );
};
