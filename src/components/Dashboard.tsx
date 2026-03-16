import React, {useMemo} from 'react';
import type {Data} from '../schemas/data';
import {usePersistence} from '../hooks/usePersistence';
import {Link} from "@/components/Link.tsx";

interface Props {
    data: Data;
}

export const Dashboard: React.FC<Props> = ({data}) => {
    const [completedDays, setCompletedDays] = usePersistence<Record<string, string[]>>('novena-tracker-completed', {});
    const [startDates, setStartDates] = usePersistence<Record<string, string>>('novena-tracker-start-dates', {});

    const dismissNovena = (id: string, title: string) => {
        if (window.confirm(`Jeste li sigurni da želite prekinuti devetnicu "${title}"? Napredak će biti obrisan.`)) {
            setCompletedDays(prev => {
                const next = {...prev};
                delete next[id];
                return next;
            });
            setStartDates(prev => {
                const next = {...prev};
                delete next[id];
                return next;
            });
        }
    };

    const todayIndex = new Date().getDay();

    const weeklyItem = data.library.find(item => item.type === 'weekly');
    const todayWeeklyPrayer = weeklyItem?.type === 'weekly'
        ? weeklyItem.prayers.find(p => p.dayIndex === todayIndex)
        : null;

    const activeNovenas = useMemo(() => {
        return data.library.filter(item => {
            if (item.type !== 'novena') return false;
            const completed = completedDays[item.id] || [];
            return completed.length > 0 && completed.length < 9;
        });
    }, [data.library, completedDays]);

    const otherNovenas = data.library.filter(item =>
        item.type === 'novena' && !activeNovenas.find(a => a.id === item.id)
    );

    return (
        <div className="space-y-10 py-6">
            {/* Today's Weekly Rosary */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
                    Današnja krunica
                </h2>
                {todayWeeklyPrayer ? (
                    <Link
                        href={`/library/${weeklyItem?.id}/day/${todayIndex}`}
                        className="block group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">{todayWeeklyPrayer.day}</p>
                                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{todayWeeklyPrayer.title}</h3>
                                <p className="text-gray-500 mt-1">Tema: {todayWeeklyPrayer.theme}</p>
                            </div>
                            <div
                                className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <p className="text-gray-500 italic">Nema krunice za danas.</p>
                )}
            </section>

            {/* Active Novenas */}
            {activeNovenas.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                        Devetnice u tijeku
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {activeNovenas.map(novena => {
                            const completed = completedDays[novena.id] || [];

                            // Find first uncompleted day
                            let firstUncompleted = 1;
                            for (let i = 1; i <= 9; i++) {
                                if (!completed.includes(i.toString())) {
                                    firstUncompleted = i;
                                    break;
                                }
                            }

                            const currentDayData = novena.type === 'novena' ? novena.days.find(d => d.dayIndex === firstUncompleted) : null;
                            const startDateStr = startDates[novena.id];
                            let dateInfo = null;

                            if (startDateStr) {
                                const startDate = new Date(startDateStr);
                                startDate.setHours(0, 0, 0, 0);

                                const endDate = new Date(startDate);
                                endDate.setDate(startDate.getDate() + 8);

                                dateInfo = {
                                    start: startDate.toLocaleDateString('hr-HR'),
                                    end: endDate.toLocaleDateString('hr-HR')
                                };
                            }

                            return (
                                <div key={novena.id} className="relative group">
                                    <Link
                                        href={`/library/${novena.id}/day/${firstUncompleted}`}
                                        className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full"
                                    >
                                        <h3 className="font-bold text-gray-800 mb-2 pr-10">{novena.title}</h3>

                                        {dateInfo ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-blue-600 font-bold text-lg">{firstUncompleted}. dan</span>
                                                </div>
                                                <div
                                                    className="flex justify-between text-xs text-gray-400 border-t pt-2">
                                                    <span>Početak: {dateInfo.start}</span>
                                                    <span>Kraj: {dateInfo.end}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-blue-600 font-bold text-lg">{firstUncompleted}. dan</span>
                                                        {currentDayData?.theme && <span
                                                            className="text-xs text-gray-400 line-clamp-1">{currentDayData.theme}</span>}
                                                    </div>
                                                    <span className="text-gray-500 text-sm">{completed.length}/9 molitvi dovršeno</span>
                                                </div>
                                            </div>
                                        )}
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            dismissNovena(novena.id, novena.title);
                                        }}
                                        className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Prekini devetnicu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Choose a Novena */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                    Izaberi devetnicu
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {otherNovenas.map(novena => (
                        <Link
                            key={novena.id}
                            href={`/library/${novena.id}/day/1`}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-300 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">{novena.title}</h3>
                                {novena.type === 'novena' && novena.description && (
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{novena.description}</p>
                                )}
                            </div>
                            <span className="text-sm font-medium text-purple-600 flex items-center">
                Započni molitvu
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};
