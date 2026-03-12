import {DataStructure} from '../types/prayer';

let cachedPromise: Promise<DataStructure> | null = null;

export const getPrayerData = (): Promise<DataStructure> => {
    if (!cachedPromise) {
        cachedPromise = fetch('data.json')
            .catch(() => fetch('./data.json'))
            .then(async (response): Promise<DataStructure> => {
                if (!response.ok) throw new Error('Failed to fetch data');
                return response.json() as Promise<DataStructure>;
            })
            .catch((err) => {
                cachedPromise = null;
                console.error('Error loading prayers:', err);
                throw err instanceof Error ? err : new Error('Unknown error loading prayers');
            });
    }
    return cachedPromise;
};